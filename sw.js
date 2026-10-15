// Offline support. Bump V when you change any app file so phones pick up the new version.
var V="sit-v2";
importScripts("data.js");
var ASSETS=["./","index.html","app.js","bible.js","data.js","manifest.json","icon-192.png","icon-512.png"].concat(VERSIONS.map(function(v){return v.file}));
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(ASSETS.map(function(a){return c.add(a).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(function(hit){
var net=fetch(r).then(function(res){if(res&&(res.ok||res.type==="opaque")){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp)})}return res}).catch(function(){return hit});
return hit||net}))});