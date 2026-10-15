var B={data:null,err:null,loading:false,map:{},idx:[],b:null,c:null,v1:0,v2:0,q:null,from:null,fs:19,sel:[],hv:false,jump:false,pinref:null,ver:VERSIONS[0].id};
var NORM={};function norm(x){return String(x).toLowerCase().replace(/[^a-z0-9]/g,"")}
CANON.forEach(function(n,i){NORM[norm(n)]=i});OSIS.forEach(function(n,i){NORM[norm(n)]=i});NORM.psalm=18;
function cidx(n){var i=NORM[norm(n)];return i===undefined?-1:i}
function arr(x){if(Array.isArray(x))return x;if(x&&typeof x==="object")return Object.keys(x).sort(function(a,b){return a-b}).map(function(k){return x[k]});return[]}
function vtext(v){return typeof v==="string"?v:(v&&(v.text||v.t||v.content))||""}
function normalize(raw){
var bs=raw&&raw.books?raw.books:raw,out=[];
if(Array.isArray(bs))bs.forEach(function(b){out.push([b.name||b.book||b.title||b.osis||b.id,b.chapters])});
else if(bs&&typeof bs==="object")Object.keys(bs).forEach(function(k){var b=bs[k];out.push([(b&&b.name)||k,(b&&b.chapters)||b])});
var books=out.map(function(p){return{name:String(p[0]),ch:arr(p[1]).map(function(c){return arr(c&&c.verses?c.verses:c).map(vtext)})}}).filter(function(b){return b.ch.length&&b.ch[0].length});
if(!books.length)throw new Error("Unrecognized file shape. Top-level keys: "+Object.keys(raw||{}).slice(0,8).join(", "));
return books}
function buildMap(bks){B.map={};
if(bks.length===66)bks.forEach(function(b,i){B.map[i]=b});
else bks.forEach(function(b){var i=cidx(b.name);if(i>=0)B.map[i]=b});
B.idx=Object.keys(B.map).map(Number).sort(function(a,b){return a-b});
if(!B.idx.length)throw new Error("Could not match book names in the file.")}
function verObj(){for(var i=0;i<VERSIONS.length;i++)if(VERSIONS[i].id===B.ver)return VERSIONS[i];return VERSIONS[0]}
function VNAME(){return verObj().name}
function setVer(id){B.ver=id;try{localStorage.setItem("sit-ver",id)}catch(e){}B.data=null;B.err=null;B.loading=false;B.map={};B.idx=[];loadBible();view()}
function verSelect(){if(VERSIONS.length<2)return "";return "<select id='ver' aria-label='Translation'>"+VERSIONS.map(function(v){return "<option value='"+esc(v.id)+"'"+(v.id===B.ver?" selected":"")+">"+esc(v.name)+"</option>"}).join("")+"</select>"}
function loadBible(){if(B.data||B.loading)return;B.loading=true;
fetch(verObj().file).then(function(r){if(!r.ok)throw new Error("Could not load "+verObj().file+" (HTTP "+r.status+")");return r.json()})
.then(function(j){B.data=normalize(j);buildMap(B.data);B.loading=false;view()})
.catch(function(e){B.err=e.message;B.loading=false;view()})}
function need(){if(B.err)return "<h2>Bible file not loaded</h2><p class='mute'>"+esc(B.err)+"</p><p>Put the Bible file at <b>"+verObj().file+"</b> and refresh.</p>"+(B.ver!==VERSIONS[0].id?"<button class='go' data-a='ver' data-v='"+VERSIONS[0].id+"'>Go back to "+esc(VERSIONS[0].name)+"</button>":"");return B.data?"":"<p class='mute'>Loading…</p>"}
function lookup(r){var m=/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/.exec(r);if(!m)return null;
var i=cidx(m[1]),d=B.map[i];if(!d)return null;
var c=+m[2],v1=+m[3],v2=+(m[4]||m[3]),ch=d.ch[c-1];if(!ch||!ch[v1-1])return null;
var h=[];for(var v=v1;v<=Math.min(v2,ch.length);v++)h.push((v2>v1?"<sup>"+v+"</sup> ":"")+esc(ch[v-1]));
return{idx:i,c:c,v1:v1,v2:Math.min(v2,ch.length),html:h.join(" ")}}
function vcard(r,extra){var x=lookup(r);
if(!x)return "<p class='ref'>"+esc(r)+"</p><p class='mute'>Not found in this Bible file.</p>";
return "<p class='ref'>"+esc(r)+" ("+VNAME()+")</p><div class='verse'>"+x.html+"</div><button class='link' style='margin:-.75rem 0 1.25rem' data-a='open' data-v='"+[x.idx,x.c,x.v1,x.v2].join("|")+"'>Read the full chapter</button><button class='link' style='margin:-.75rem 0 1.25rem 1rem' data-a='keep' data-v='"+esc(r)+"'>"+(isKept(r)?"Kept ✓":"Keep this verse")+"</button>"+(extra||"")}
function getPos(){try{return JSON.parse(localStorage.getItem("sit-pos"))}catch(e){return null}}
function pos(){try{localStorage.setItem("sit-pos",JSON.stringify({b:B.b,c:B.c}))}catch(e){}}
// ---- highlights: stored as {"book:chapter:verse": colorNumber}
var memH={};
function loadH(){try{var r=localStorage.getItem("sit-hl");return r?JSON.parse(r):memH}catch(e){return memH}}
function saveH(o){memH=o;try{localStorage.setItem("sit-hl",JSON.stringify(o))}catch(e){}}
var HCOL=["#facc15","#4ade80","#60a5fa","#f472b6"];
function toast(m){var t=$("toast");if(!t)return;t.textContent=m;t.className="toast on";clearTimeout(toast.id);toast.id=setTimeout(function(){t.className="toast"},1900)}
function copyText(t,msg){
function fb(){var a=document.createElement("textarea");a.value=t;a.style.position="fixed";a.style.opacity="0";document.body.appendChild(a);a.select();try{document.execCommand("copy");toast(msg)}catch(e){toast("Couldn't copy")}document.body.removeChild(a)}
if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(t).then(function(){toast(msg)},fb);else fb()}
function selInfo(){var v=B.sel.slice().sort(function(a,b){return a-b}),ch=B.map[B.b].ch[B.c-1],r=[],i=0;
while(i<v.length){var j=i;while(j+1<v.length&&v[j+1]===v[j]+1)j++;r.push(j>i?v[i]+"-"+v[j]:""+v[i]);i=j+1}
return v.map(function(k){return ch[k-1]}).join(" ")+"\n— "+CANON[B.b]+" "+B.c+":"+r.join(", ")+" ("+VNAME()+")"}
function keepY(){var y=window.scrollY;view();window.scrollTo(0,y)}
function hlHTML(){var H=loadH(),h="<button class='back' data-a='bback'>‹ Bible</button><h1>My highlights</h1>";
var ks=Object.keys(H).map(function(k){var p=k.split(":").map(Number);return{b:p[0],c:p[1],v:p[2],col:H[k]}}).sort(function(a,b){return a.b-b.b||a.c-b.c||a.v-b.v});
if(!ks.length)return h+"<p class='mute'>While reading, tap a verse, then pick a color. Your highlights are saved here, grouped by book.</p>";
var runs=[];ks.forEach(function(x){var l=runs[runs.length-1];if(l&&l.b===x.b&&l.c===x.c&&l.v2+1===x.v&&l.col===x.col)l.v2=x.v;else runs.push({b:x.b,c:x.c,v1:x.v,v2:x.v,col:x.col})});
var cb=-1;
runs.forEach(function(r){var ch=B.map[r.b]&&B.map[r.b].ch[r.c-1];if(!ch)return;
if(r.b!==cb){cb=r.b;h+="<h2 style='margin-top:1.5rem'>"+CANON[cb]+"</h2>"}
var t=[];for(var v=r.v1;v<=r.v2;v++)t.push((r.v2>r.v1?"<sup>"+v+"</sup> ":"")+esc(ch[v-1]||""));
var d=[r.b,r.c,r.v1,r.v2].join("|");
h+="<p class='ref'>"+CANON[r.b]+" "+r.c+":"+(r.v2>r.v1?r.v1+"-"+r.v2:r.v1)+"</p><div class='read h"+r.col+"' style='padding:.6rem .8rem;border-radius:10px;margin:.3rem 0 .2rem;font-size:"+B.fs+"px'>"+t.join(" ")+"</div><p><button class='link' style='margin:0' data-a='open' data-v='"+d+"'>Read the chapter</button><button class='link' data-a='hrm' data-v='"+d+"'>Remove</button></p>"});
return h}
function bibleHTML(){var n=need();if(n)return n;var h="",bk=B.map[B.b];
if(B.pinref)return "<button class='back' data-a='pincancel'>‹ Back</button><h2>Pin "+esc(B.pinref)+"</h2><p class='mute'>Which struggle is this verse for? It will show first when you open that struggle under Tempted?.</p>"+pick(T,"pinto","Search a struggle…");
if(B.b!==null&&B.c!==null){var H=loadH();
h="<button class='back' data-a='bback'>‹ Back</button><p class='ref'>"+CANON[B.b]+" "+B.c+"</p><p class='mute'>Holy Spirit, speak to me through Your word. Tap a verse to highlight, copy or share.</p><p style='display:flex;align-items:center;gap:.5rem;flex-wrap:wrap'>"+verSelect()+"<button class='link' style='margin:0' data-a='fs' data-v='-2'>A−</button><button class='link' style='margin:0' data-a='fs' data-v='2'>A+</button></p><div class='read' style='font-size:"+B.fs+"px'>";
bk.ch[B.c-1].forEach(function(t,i){var k=i+1,col=H[B.b+":"+B.c+":"+k];
var cls="vs"+(col!==undefined?" h"+col:"")+(B.sel.indexOf(k)>-1?" sel":"")+(B.v1&&k>=B.v1&&k<=B.v2?" hl":"");
h+="<span class='"+cls+"' data-a='vsel' data-v='"+k+"'"+(k===B.v1?" id='hv'":"")+"><sup>"+k+"</sup> "+esc(t)+"</span> "});
h+="</div><p style='margin-top:1.5rem'><button class='go' data-a='prev'>‹ Previous</button> <button class='go' data-a='next'>Next ›</button></p>";
if(B.sel.length){h+="<div style='height:4.5rem'></div><div class='bar'><span class='ref' style='margin:0 .2rem'>"+B.sel.length+" selected</span>";
HCOL.forEach(function(c,i){h+="<button class='dot' style='background:"+c+"' data-a='hl' data-v='"+i+"' aria-label='Highlight'></button>"});
h+="<button data-a='hl' data-v='-1' aria-label='Remove highlight'>✕</button><button data-a='copy'>Copy</button><button data-a='pin'>Pin</button><button data-a='share'>Share</button><button data-a='selclear'>Done</button></div>"}
return h}
if(B.b!==null){h="<button class='back' data-a='bback'>‹ Books</button><h2>"+CANON[B.b]+"</h2><div class='moods g5'>";for(var i=1;i<=bk.ch.length;i++)h+="<button class='m' data-a='chap' data-v='"+i+"'>"+i+"</button>";return h+"</div>"}
if(B.q){var w=B.q.toLowerCase().split(/\s+/).filter(Boolean),hits=[],tot=0;
B.idx.forEach(function(i){B.map[i].ch.forEach(function(ch,ci){ch.forEach(function(t,vi){var l=t.toLowerCase();if(w.every(function(x){return l.indexOf(x)>-1})){tot++;if(hits.length<50)hits.push([i,ci+1,vi+1,t])}})})});
h="<button class='back' data-a='clearq'>‹ Bible</button><h2>Search: "+esc(B.q)+"</h2><p class='mute'>"+tot+(tot===1?" verse":" verses")+(tot>50?" (showing the first 50)":"")+"</p>";
hits.forEach(function(x){h+="<button class='res' data-a='open' data-v='"+[x[0],x[1],x[2],x[2]].join("|")+"'><span class='ref'>"+CANON[x[0]]+" "+x[1]+":"+x[2]+"</span><br>"+esc(x[3])+"</button>"});return h}
if(B.hv)return hlHTML();
var p=getPos(),nh=Object.keys(loadH()).length;
h="<h1>Bible</h1><p class='mute'>Ask the Holy Spirit to lead you before you open His word.</p>"+(VERSIONS.length>1?"<p>"+verSelect()+"</p>":"")+"<div class='sr'><input id='q' type='search' placeholder='Search a word, like peace or fear'><button class='go' data-a='search'>Search</button></div>";
if(p&&B.map[p.b])h+="<p style='margin:0 0 .5rem'><button class='go' style='margin:0' data-a='cont'>Continue: "+CANON[p.b]+" "+p.c+"</button></p>";
h+="<p><button class='go' style='margin:0' data-a='hls'>My highlights ("+nh+")</button></p>";
h+="<h2>Old Testament</h2><div class='moods'>";B.idx.forEach(function(i){if(i===39)h+="</div><h2 style='margin-top:1.5rem'>New Testament</h2><div class='moods'>";h+="<button class='m' data-a='book' data-v='"+i+"'>"+CANON[i]+"</button>"});
return h+"</div>"}
function step(n){var k=B.idx.indexOf(B.b),c=B.c+n;
if(c<1){if(k===0)return;B.b=B.idx[k-1];c=B.map[B.b].ch.length}
else if(c>B.map[B.b].ch.length){if(k===B.idx.length-1)return;B.b=B.idx[k+1];c=1}
B.c=c;B.v1=0;B.sel=[];pos();view();window.scrollTo(0,0)}
function bback(){var f=B.from;B.from=null;B.v1=0;B.sel=[];
if(B.c!==null){if(f&&f!=="bible"){B.b=B.c=null;tab(f,true);return}B.c=null;if(f==="bible")B.b=null}
else if(B.b!==null)B.b=null;else if(B.hv)B.hv=false;
view();window.scrollTo(0,0)}
function bibleAct(a,v){switch(a){
case "book":B.b=+v;B.c=null;B.from=null;B.sel=[];view();window.scrollTo(0,0);return true;
case "chap":
  B.c=+v;B.v1=0;B.sel=[];pos();
  trackEvent("chapter_read", {
    book_name: CANON[B.b],
    chapter_number: B.c
  });
  view();window.scrollTo(0,0);return true;
case "prev":step(-1);return true;case "next":step(1);return true;
case "bback":bback();return true;
case "open":var p=v.split("|").map(Number);B.from=s.tab;B.b=p[0];B.c=p[1];B.v1=p[2];B.v2=p[3];B.sel=[];B.jump=true;pos();tab("bible",true);return true;
case "cont":var o=getPos();B.b=o.b;B.c=o.c;B.from=null;B.v1=0;B.sel=[];view();window.scrollTo(0,0);return true;
case "search":
  B.q=($("q").value||"").trim()||null;
  if(B.q) trackEvent("bible_search");
  B.b=B.c=null;view();return true;
case "clearq":B.q=null;view();return true;
case "fs":B.fs=Math.max(15,Math.min(30,B.fs+ +v));try{localStorage.setItem("sit-fs",B.fs)}catch(e){}keepY();return true;
case "vsel":var k=+v,i=B.sel.indexOf(k);if(i>-1)B.sel.splice(i,1);else B.sel.push(k);keepY();return true;
case "hl":var H=loadH(),col=+v;B.sel.forEach(function(k){var key=B.b+":"+B.c+":"+k;if(col<0)delete H[key];else H[key]=col});saveH(H);B.sel=[];toast(col<0?"Highlight removed":"Highlighted");keepY();return true;
case "copy":if(B.sel.length)copyText(selInfo(),"Copied");return true;
case "share":if(B.sel.length){var t=selInfo();if(navigator.share)navigator.share({text:t}).catch(function(){});else copyText(t,"Copied. Sharing isn't available on this connection")}return true;
case "selclear":B.sel=[];keepY();return true;
case "ver":setVer(v);return true;
case "pin":if(!B.sel.length)return true;var ss=B.sel.slice().sort(function(a,b){return a-b});for(var z=1;z<ss.length;z++)if(ss[z]!==ss[z-1]+1){toast("Select one verse or a connected passage to pin");return true}
B.pinref=CANON[B.b]+" "+B.c+":"+ss[0]+(ss.length>1?"-"+ss[ss.length-1]:"");view();window.scrollTo(0,0);return true;
case "pincancel":B.pinref=null;view();return true;
case "hls":B.hv=true;view();window.scrollTo(0,0);return true;
case "hrm":var q=v.split("|").map(Number),H2=loadH();for(var x=q[2];x<=q[3];x++)delete H2[q[0]+":"+q[1]+":"+x];saveH(H2);view();return true}
return false}