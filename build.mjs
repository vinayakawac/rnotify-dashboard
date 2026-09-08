import {mkdir,copyFile,cp,rm} from 'node:fs/promises';
import {resolve,sep} from 'node:path';
const root=resolve('.'),output=resolve(root,'dist');
if(output!==root+sep+'dist')throw Error('Invalid build output path');
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
for(const file of ['index.html','api.js','app.js','data.js','delivery.js','style.css','refinement.css'])await copyFile(resolve(root,file),resolve(output,file));
await cp(resolve(root,'vendor'),resolve(output,'vendor'),{recursive:true});
console.log('Built frontend in dist. Vercel deploys api/notifications.js as a Node.js function.');
