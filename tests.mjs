import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DAY,dateKey,validRange,eligibility,generate,filterRecords} from './data.js';
test('date bounds, tenant isolation, filters and retry eligibility',()=>{assert.ok(validRange('2026-01-01','2026-06-29'));assert.equal(validRange('2026-01-01','2026-06-30'),false);assert.equal(validRange('2026-02-01','2026-01-01'),false);assert.equal(eligibility({status:'Failed',errorType:'ProviderError'}),'');assert.ok(eligibility({status:'Failed',errorType:'TemplateError'}));assert.ok(eligibility({status:'Rejected'}));const data=generate();const query={tenant:'acme',start:dateKey(Date.now()-179*DAY),end:dateKey(Date.now()),status:['Failed'],channel:['Email'],sender:''};const found=filterRecords(data,query);assert.ok(found.length);assert.ok(found.every(n=>n.tenant==='acme'&&n.status==='Failed'&&n.channels.includes('Email')));found[0].status='Retry';assert.ok(eligibility(found[0]));assert.ok(!filterRecords(data,query).includes(found[0]));});

test('daily volume includes empty days, local boundaries and all attempted channels',async()=>{
 const {volumeSeries}=await import('./data.js');
 const records=[{created:new Date(2026,8,1,23,30).toISOString(),channels:['Email','SMS']},{created:new Date(2026,8,3,0,1).toISOString(),channels:['Email']},{created:new Date(2026,8,4,12).toISOString(),channels:['WhatsApp']}];
 const bins=volumeSeries(records,'2026-09-01','2026-09-03');
 assert.deepEqual(bins,[{date:'2026-09-01',values:[1,1,0,0]},{date:'2026-09-02',values:[0,0,0,0]},{date:'2026-09-03',values:[1,0,0,0]}]);
 assert.equal(volumeSeries(records,'2026-09-01','2026-09-01').length,1);
});

test('local Lucide icon set includes every dashboard icon',async()=>{
 const {iconNodes}=await import('./vendor/lucide-icons.js');
 for(const key of ['grid','search','bell','refresh','arrow','chevron','calendar','mail','sms','push','whatsapp','close','check','info','send','clock','building','help']){
  assert.ok(iconNodes[key]?.match(/<(path|rect|circle|line|polyline|polygon|ellipse)\b/),key);
  assert.ok(!/<script|onload=|<foreignObject/i.test(iconNodes[key]),key);
 }
});

test('weekly volume preserves totals and clips partial weeks to selected dates',async()=>{
 const {groupVolume,volumeAxis}=await import('./data.js');
 const daily=['2026-09-06','2026-09-07','2026-09-08'].map((date,i)=>({date,values:[i+1,2,0,1]}));
 assert.deepEqual(groupVolume(daily,'weekly'),[{date:'2026-09-06',end:'2026-09-06',values:[1,2,0,1]},{date:'2026-09-07',end:'2026-09-08',values:[5,4,0,2]}]);
 assert.deepEqual(groupVolume(daily,'daily')[0],{date:'2026-09-06',end:'2026-09-06',values:[1,2,0,1]});
 for(const peak of [0,1,3,17,122,9999]){const axis=volumeAxis(peak);assert.ok(axis.max>=peak);assert.equal(axis.ticks[0],0);assert.equal(axis.ticks.at(-1),axis.max);assert.ok(axis.ticks.every(Number.isInteger));assert.ok(new Set(axis.ticks).size===axis.ticks.length)}
});

test('channel delivery distinguishes partial outcomes and template validation',async()=>{
 const {channelDetails}=await import('./delivery.js');
 const base={id:'test',template:'order.created',created:'2026-09-08T00:00:00.000Z',channels:['Email'],status:'PartialSuccess',retryCount:2,error:'Provider unavailable',errorType:'ProviderError'};
 assert.ok(generate().flatMap(n=>n.deliveries).filter(d=>d.status==='Success').every(d=>d.history.some(h=>h.kind==='Attempt'&&h.result==='Success')));
 const n=channelDetails(base);assert.equal(n.deliveries.length,2);assert.equal(n.deliveries[0].status,'Success');assert.equal(n.deliveries[1].status,'Failed');assert.notEqual(n.deliveries[0].recipient,n.deliveries[1].recipient);assert.equal(n.deliveries[1].history.filter(e=>e.kind==='Attempt').length,3);
 const invalid=channelDetails({...base,deliveries:undefined,status:'Failed',errorType:'TemplateError'});assert.equal(invalid.deliveries[0].provider,'Not contacted');assert.equal(invalid.deliveries[0].retryCount,0);assert.ok(!invalid.deliveries[0].history.some(e=>e.kind==='Attempt'));
});
test('reprocessing preserves attempts, changes pending state and rejects duplicates',async()=>{
 const {channelDetails,queueReprocess}=await import('./delivery.js');
 const n=channelDetails({id:'retry',template:'order.created',created:'2026-09-08T00:00:00.000Z',channels:['Email','SMS'],status:'Failed',retryCount:2,error:'Provider unavailable',errorType:'ProviderError'});
 n.deliveries[0].status='Success';const attempts=n.deliveries[1].history.length;
 const result=queueReprocess(n,'2026-09-08T02:00:00.000Z');assert.equal(result.status,'Retry');assert.equal(result.deliveries[0].status,'Success');assert.equal(result.deliveries[1].status,'Retry');assert.equal(result.deliveries[1].retryCount,2);assert.equal(result.deliveries[1].history.length,attempts+1);assert.equal(result.deliveries[1].nextRetryTime,result.modified);assert.equal(result.reprocessHistory.length,1);assert.throws(()=>queueReprocess(n));
 assert.ok(eligibility({status:'Failed',error:'TemplateError: invalid template'}));
});
