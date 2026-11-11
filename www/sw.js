const V='taccuino-v1.11.1',CORE=['./','index.html','shim.js','keys.js','config.js','manifest.webmanifest','icons/icon-180.png','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 if(/config\.js$/.test(e.request.url)){e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(h=>h||fetch(e.request).then(r=>{if(r.ok&&(r.type==='basic'||/cdnjs/.test(e.request.url))){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match('index.html'))))});
