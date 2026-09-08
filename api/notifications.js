import {generate,eligibility,validRange} from '../data.js';
import {queueReprocess} from '../delivery.js';
// Demo state is ephemeral and shared only within one warm function instance.
let records;
const tenants=new Set(['acme','ramco','northstar']);
function json(res,status,body){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(body))}
export default function handler(req,res){
 try{
  const url=new URL(req.url,'https://demo.invalid');
  const q={...Object.fromEntries(url.searchParams),...req.query};
  const tenant=q.tenant;
  if(!tenants.has(tenant))return json(res,400,{error:'A valid tenant is required.'});
  const origin=req.headers?.origin;
  if(origin){let host;try{host=new URL(origin).host}catch{return json(res,403,{error:'Origin not allowed.'})}if(host!==req.headers.host)return json(res,403,{error:'Origin not allowed.'});}
  if(!['GET','POST'].includes(req.method))return json(res,405,{error:'Method not allowed.'});
  records??=generate();
  // Explicit rewrites pass IDs as query parameters; direct routes work in tests too.
  const match=url.pathname.match(/^\/api\/notifications\/([^/]+)(\/reprocess)?$/);
  const id=q.notificationId||(match?decodeURIComponent(match[1]):null);
  const reprocess=q.action==='reprocess'||!!match?.[2];
  if(!id){
   if(req.method!=='GET')return json(res,405,{error:'Method not allowed.'});
   const {start,end,from,to}=q;
   if(!validRange(start,end)||!Number.isFinite(Date.parse(from))||!Number.isFinite(Date.parse(to))||Date.parse(to)<=Date.parse(from)||Date.parse(to)-Date.parse(from)>180*86400000+7200000)return json(res,400,{error:'Select a valid date range of at most 180 days.'});
   return json(res,200,{notifications:records.filter(n=>n.tenant===tenant&&Date.parse(n.created)>=Date.parse(from)&&Date.parse(n.created)<Date.parse(to)),source:'serverless-demo',storage:'ephemeral'});
  }
  const index=records.findIndex(n=>n.id===id&&n.tenant===tenant);
  if(index<0)return json(res,404,{error:'Notification not found in this tenant.'});
  if(!reprocess&&req.method==='GET')return json(res,200,{notification:records[index]});
  if(reprocess&&req.method==='POST'){
   const reason=eligibility(records[index]);if(reason)return json(res,409,{error:reason});
   const updated=queueReprocess(structuredClone(records[index]));updated.reprocessHistory.at(-1).actor='Serverless demo operator';records[index]=updated;
   return json(res,200,{notification:updated,storage:'ephemeral'});
  }
  return json(res,405,{error:'Method not allowed.'});
 }catch{return json(res,500,{error:'Unable to complete the operation. Please retry.'})}
}
