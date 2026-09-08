async function request(path,options={}){
 const response=await fetch(path,{...options,headers:{Accept:'application/json',...options.headers}});
 const body=await response.json();if(!response.ok)throw Error(body.error||'The operation failed. Please retry.');return body;
}
export async function searchNotifications(scope,signal){
 const from=new Date(scope.start+'T00:00:00'),to=new Date(scope.end+'T00:00:00');to.setDate(to.getDate()+1);
 const query=new URLSearchParams({tenant:scope.tenant,start:scope.start,end:scope.end,from:from.toISOString(),to:to.toISOString()});
 return (await request('/api/notifications?'+query,{signal})).notifications;
}
export async function reprocessNotification(id,tenant){return (await request(`/api/notifications/${encodeURIComponent(id)}/reprocess?tenant=${encodeURIComponent(tenant)}`,{method:'POST'})).notification}
