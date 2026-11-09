/* Sostituisce le funzioni di Electron (preload.js) con equivalenti per browser/iPad */
(()=>{
const DB='taccuino',ST='kv';
const db=new Promise((res,rej)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(ST);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
const tx=(m,f)=>db.then(d=>new Promise((res,rej)=>{const t=d.transaction(ST,m),q=f(t.objectStore(ST));t.oncomplete=()=>res(q&&q.result);t.onerror=()=>rej(t.error)}));
let lang=0;try{lang=+localStorage.getItem('taccuino.lang')||0}catch(e){}
const dl=(blob,name)=>{
  const f=new File([blob],name,{type:blob.type});
  if(navigator.canShare&&navigator.canShare({files:[f]}))return navigator.share({files:[f],title:name}).then(()=>true,e=>e&&e.name==='AbortError'?false:fallback());
  return fallback();
  function fallback(){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();setTimeout(()=>{a.remove();URL.revokeObjectURL(a.href)},4000);return true}
};
const b64=u=>{const s=atob(u.split(',')[1]),a=new Uint8Array(s.length);for(let i=0;i<s.length;i++)a[i]=s.charCodeAt(i);return a};
const img=u=>new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src=u});
/* PDF minimale: una immagine JPEG per pagina A4 */
async function makePdf(urls){
  const enc=new TextEncoder(),parts=[],off=[];let len=0;
  const add=x=>{const b=typeof x==='string'?enc.encode(x):x;parts.push(b);len+=b.length};
  const obj=(n,x)=>{off[n]=len;add(n+' 0 obj\n');add(x);add('\nendobj\n')};
  const N=urls.length,W=595.28,H=841.89;add('%PDF-1.4\n');
  obj(1,'<</Type/Catalog/Pages 2 0 R>>');
  obj(2,'<</Type/Pages/Count '+N+'/Kids['+urls.map((_,i)=>(3+i*3)+' 0 R').join(' ')+']>>');
  for(let i=0;i<N;i++){
    const im=await img(urls[i]),c=document.createElement('canvas');c.width=im.width;c.height=im.height;
    const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0);
    const j=b64(c.toDataURL('image/jpeg',.92)),p=3+i*3;
    obj(p,'<</Type/Page/Parent 2 0 R/MediaBox[0 0 '+W+' '+H+']/Resources<</XObject<</I '+(p+1)+' 0 R>>>>/Contents '+(p+2)+' 0 R>>');
    off[p+1]=len;add((p+1)+' 0 obj\n<</Type/XObject/Subtype/Image/Width '+c.width+'/Height '+c.height+'/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length '+j.length+'>>\nstream\n');add(j);add('\nendstream\nendobj\n');
    const cs='q '+W+' 0 0 '+H+' 0 0 cm /I Do Q';obj(p+2,'<</Length '+cs.length+'>>\nstream\n'+cs+'\nendstream');
  }
  const xr=len,T=3+N*3;add('xref\n0 '+T+'\n0000000000 65535 f \n');
  for(let i=1;i<T;i++)add(String(off[i]).padStart(10,'0')+' 00000 n \n');
  add('trailer\n<</Size '+T+'/Root 1 0 R>>\nstartxref\n'+xr+'\n%%EOF');
  return new Blob(parts,{type:'application/pdf'});
}
const safe=n=>(n||'Taccuino').replace(/[\\/:*?"<>|]+/g,'-');
window.api={
  get lang(){return lang},
  setLang:l=>{try{localStorage.setItem('taccuino.lang',l)}catch(e){}location.reload()},
  load:()=>tx('readonly',s=>s.get('data')).catch(()=>null),
  save:d=>tx('readwrite',s=>s.put(d,'data')).catch(e=>console.error('salvataggio',e)),
  exportPng:({name,url})=>dl(new Blob([b64(url)],{type:'image/png'}),safe(name)+'.png'),
  exportPdf:async({name,urls})=>dl(await makePdf(urls),safe(name)+'.pdf'),
  exportFile:({name,ext,text})=>dl(new Blob([text],{type:'application/json'}),safe(name)+'.'+ext)
};
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist();
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));
})();
