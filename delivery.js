const providers={'Email':'SendGrid','SMS':'Twilio','Mobile Push':'Firebase','WhatsApp':'Meta'};
export function channelDetails(record){
 if(record.deliveries)return record;
 if(record.status==='PartialSuccess'&&record.channels.length===1)record.channels=[record.channels[0],record.channels[0]==='Email'?'SMS':'Email'];
 record.activity=record.template.split('.').slice(1).join('.');
 record.deliveries=record.channels.map((channel,index)=>{
  const status=record.status==='PartialSuccess'?(index===0?'Success':'Failed'):record.status;
  const failed=['Failed','Retry'].includes(status),templateError=status==='Failed'&&templateFailure(record),retryCount=failed&&!templateError?record.retryCount:0;
  const created=new Date(record.created).getTime();
  const history=[{kind:'Accepted',timestamp:record.created,result:'Accepted for channel delivery'}];
  if(templateError&&status==='Failed')history.push({kind:'Template validation',timestamp:new Date(created+1000).toISOString(),result:'Failed before provider dispatch',error:record.error});
  if(!templateError&&!['Accepted','Processing','Rejected'].includes(status))for(let attempt=1;attempt<=retryCount+1;attempt++)history.push({kind:'Attempt',attempt,timestamp:new Date(created+attempt*1000).toISOString(),result:status==='Success'?'Success':attempt<=retryCount?'Provider unavailable; retry scheduled':status==='Retry'?'Provider unavailable; awaiting retry':'Failed',error:failed?record.error:null});
  if(status==='Rejected')history.push({kind:'Rejected',timestamp:new Date(created+1000).toISOString(),result:'Rejected before delivery',error:record.error});
  if(status==='Processing')history.push({kind:'Processing',timestamp:new Date(created+1000).toISOString(),result:'Provider request in progress'});
  const recipient=channel==='Email'?'a••••@example.com':channel==='Mobile Push'?'device_••••7a2f':'+91 •••••• 4821';
  return {channel,status,provider:templateError&&status==='Failed'?'Not contacted':providers[channel],retryCount,nextRetryTime:status==='Retry'?new Date(created+300000).toISOString():null,recipient,message:{subject:record.template,body:`Your ${record.template.split('.')[0].replaceAll('_',' ')} notification is ready. Sign in to view the details.`},history,error:failed||status==='Rejected'?record.error:null};
 });
 record.modified=record.deliveries.flatMap(d=>d.history).map(h=>h.timestamp).sort().at(-1)||record.created;
 record.recipient=record.deliveries[0]?.recipient||record.recipient;record.reprocessHistory=[];return record;
}
export function templateFailure(record){return record.errorType==='TemplateError'||/template(?:error|[ _-]error)|missing required template parameter/i.test(record.error||'')}
export function queueReprocess(record,now=new Date().toISOString()){
 if(record.status!=='Failed'||templateFailure(record))throw Error('Only failed notifications without template errors may be reprocessed.');
 channelDetails(record);
 for(const delivery of record.deliveries){if(!['Failed','Rejected'].includes(delivery.status))continue;delivery.status='Retry';delivery.nextRetryTime=now;delivery.history.push({kind:'Reprocess queued',timestamp:now,result:'Awaiting delivery worker'});}
 record.status='Retry';record.modified=now;record.reprocessHistory.push({timestamp:now,actor:'Local demo operator',action:'Reprocess queued'});return record;
}
