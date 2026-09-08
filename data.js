import {channelDetails,templateFailure} from './delivery.js';
export const channels=['Email','SMS','Mobile Push','WhatsApp'];
export const statuses=['Accepted','Processing','Success','PartialSuccess','Retry','Failed','Rejected'];
export const DAY=86400000;
export function dateKey(d){const v=new Date(d);return [v.getFullYear(),String(v.getMonth()+1).padStart(2,'0'),String(v.getDate()).padStart(2,'0')].join('-')}
export function eligibility(n){return n.status!=='Failed'?'Only failed notifications can be reprocessed.':templateFailure(n)?'Template errors must be corrected before reprocessing.':''}
export function validRange(start,end){return /^\d{4}-\d{2}-\d{2}$/.test(start)&&/^\d{4}-\d{2}-\d{2}$/.test(end)&&dateKey(start+'T12:00:00')===start&&dateKey(end+'T12:00:00')===end&&start<=end&&(new Date(end)-new Date(start))/DAY<=179}
export function generate(){const templates=['payment.confirmation','shipment.dispatched','otp.verification','invoice.reminder','account.welcome','inventory.low_stock','promotion.weekly','approval.request'];return Array.from({length:1264},(_,i)=>{const status=i<15?'Failed':i%43===0?'Failed':i%79===0?'Rejected':i%31===0?'Retry':i%61===0?'PartialSuccess':i%113===0?'Processing':i%127===0?'Accepted':'Success';const created=new Date(Date.now()-(i<20?i*29*60000:(i*7919%179)*DAY+(i%24)*3600000)).toISOString();return {id:`ntf_${(921840+i).toString(16)}-${String(i+1).padStart(5,'0')}`,correlation:`cor_${780123+i}`,tenant:i%3===0?'acme':i%3===1?'ramco':'northstar',template:templates[i%8],category:i%8===6?'Promotional':i%8===5?'Alert':'Transactional',priority:i%8===2?'High':i%8===5?'Critical':'Normal',channels:i%5===0?['Email','SMS']:[channels[i%4]],status,created,modified:created,sender:['billing-service','logistics-service','identity-service','finance-service'][i%4],recipient:i%4===1?'+91 •••••• 4821':'a••••@example.com',errorType:i%5===0?'TemplateError':'ProviderError',error:i%5===0?'TemplateError: Missing required template parameter "customer_name". Rendering failed before delivery.':'ProviderError: Upstream provider returned HTTP 503 (Service Unavailable). Delivery could not be completed within the retry limit.',retryCount:status==='Failed'?3:status==='Retry'?1:0}}).map(channelDetails)}
export function filterRecords(records,{tenant,start,end,status=[],channel=[],category='',sender=''}){return records.filter(n=>n.tenant===tenant&&dateKey(n.created)>=start&&dateKey(n.created)<=end&&(!status.length||status.includes(n.status))&&(!channel.length||n.channels.some(c=>channel.includes(c)))&&(!category||n.category===category)&&n.sender.toLowerCase().includes(sender.toLowerCase())).sort((a,b)=>b.created.localeCompare(a.created))}



export function volumeSeries(records,start,end){
  const count=Math.round((new Date(end)-new Date(start))/DAY)+1;
  const bins=Array.from({length:count},(_,i)=>{const date=new Date(start+'T12:00:00');date.setDate(date.getDate()+i);return {date:dateKey(date),values:channels.map(()=>0)}});
  const byDate=new Map(bins.map(b=>[b.date,b]));
  for(const n of records){const bin=byDate.get(dateKey(n.created));if(bin)for(const c of n.channels){const index=channels.indexOf(c);if(index>=0)bin.values[index]++}}
  return bins;
}

export function groupVolume(daily,period='daily'){
 if(period==='daily')return daily.map(b=>({...b,end:b.date,values:[...b.values]}));
 const groups=[];let previousWeek='';
 for(const bin of daily){const monday=new Date(bin.date+'T12:00:00');monday.setDate(monday.getDate()-(monday.getDay()+6)%7);const week=dateKey(monday);
  if(week!==previousWeek){groups.push({date:bin.date,end:bin.date,values:[0,0,0,0]});previousWeek=week}
  const group=groups.at(-1);group.end=bin.date;bin.values.forEach((v,i)=>group.values[i]+=v);
 }
 return groups;
}
export function volumeAxis(peak){
 const target=Math.max(1,peak/4),power=10**Math.floor(Math.log10(target));
 const step=[1,2,5,10].map(n=>n*power).find(n=>n>=target);
 const max=Math.max(step*2,Math.ceil(peak/step)*step);
 return {max,ticks:Array.from({length:Math.round(max/step)+1},(_,i)=>i*step)};
}
