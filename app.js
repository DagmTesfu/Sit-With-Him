var s={tab:"today",step:"arrive",mood:null,t:null,more:false,pass:0,mins:5,left:0,timer:null,pa:null,ip:null},mem=[];
var PREV={spirit:"arrive",read:"spirit",pray:"read",still:"pray",write:"still",kept:"arrive"};
var PASS=["Read it once, slowly, as if hearing it for the first time.","Read it again. Which word or phrase stays with you?","Read it a third time. What might He be saying to you through it?"];
var DPRAY="Tell Him plainly how you feel and why. Then be quiet and listen for what He says.";
function $(i){return document.getElementById(i)}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function fmt(n){var m=Math.floor(n/60),x=n%60;return m+":"+(x<10?"0":"")+x}
function greet(){var h=new Date().getHours();return h<12?"Good morning.":h<18?"Good afternoon.":"Good evening."}
function load(){try{var r=localStorage.getItem("sit-entries");return r?JSON.parse(r):mem}catch(e){return mem}}
function save(a){mem=a;try{localStorage.setItem("sit-entries",JSON.stringify(a))}catch(e){}}
function stop(){if(s.timer){clearInterval(s.timer);s.timer=null}s.left=0}
function tab(t,keep){var same=s.tab===t;if(t!=="today")stop();s.tab=t;B.sel=[];B.pinref=null;
if(same&&!keep){if(t==="bible"){B.b=B.c=null;B.q=null;B.from=null;B.hv=false}if(t==="tempt")s.t=null}
document.querySelectorAll("#nav button").forEach(function(b){b.className=b.dataset.v===t?"on":""});
window.scrollTo(0,0);view()}
function go(st){s.step=st;view();window.scrollTo(0,0)}
function view(){var e=load(),h;
if(s.tab==="bible")h=bibleHTML();else if(s.tab==="tempt")h=temptHTML();else if(s.tab==="prayers")h=prayersHTML();else if(s.tab==="journal")h=journalHTML(e);else h=todayHTML(e);
$("app").innerHTML=h;var x=$("hv");if(x&&B.jump){B.jump=false;x.scrollIntoView({block:"center"})}}
// grouped, searchable list of feelings or struggles
function pick(o,a,ph,star){var gs=[],pn=star?loadPins():{},h="<input id='fe' type='search' placeholder='"+ph+"'>";
Object.keys(o).forEach(function(k){if(gs.indexOf(o[k].g)<0)gs.push(o[k].g)});
gs.forEach(function(g){h+="<div class='grp'><h3>"+g+"</h3><div class='moods'>";
Object.keys(o).forEach(function(k){if(o[k].g===g)h+="<button class='m' data-a='"+a+"' data-v='"+k+"' data-n='"+esc((o[k].l+" "+(o[k].kw||"")).toLowerCase())+"'>"+o[k].l+(pn[k]&&pn[k].length?" ★":"")+"</button>"});h+="</div></div>"});
return h+"<p class='mute' id='nof' style='display:none'>Nothing matches. Try a simpler word.</p>"}
function ago(t){var d=Math.floor((Date.now()-t)/864e5);if(d<14)return "";if(d<60)return Math.round(d/7)+" weeks ago";if(d<365){var m=Math.round(d/30);return m<=1?"a month ago":m+" months ago"}var y=Math.round(d/365);return y<=1?"a year ago":y+" years ago"}
function lookback(e,always){var now=Math.floor(Date.now()/864e5),pool=e.filter(function(x){return x.note&&x.note!=="(sat with Him)"&&Date.now()-x.t>=14*864e5});
if(!pool.length||(!always&&now%3!==0))return "";var x=pool[now%pool.length];
return "<div class='note'><p class='ref'>"+ago(x.t)+" you wrote"+(x.ref?" ("+esc(x.ref)+")":"")+"</p><p style='margin:.4rem 0 0;white-space:pre-wrap'>"+esc(x.note)+"</p></div>"}
function installHTML(){if((window.matchMedia&&matchMedia("(display-mode: standalone)").matches)||navigator.standalone)return "";
if(s.ip)return "<p style='margin-top:1rem'><button class='go' data-a='install'>Install this app</button></p>";
if(/iphone|ipad/i.test(navigator.userAgent)&&location.protocol==="https:")return "<p class='mute' style='margin-top:1rem'>To install on iPhone: tap Share, then Add to Home Screen.</p>";return ""}
var memPins={};
function loadPins(){try{var r=localStorage.getItem("sit-pins");return r?JSON.parse(r):memPins}catch(e){return memPins}}
function savePins(o){memPins=o;try{localStorage.setItem("sit-pins",JSON.stringify(o))}catch(e){}}
function warn(m){return m&&m.warn?"<div class='note'><b>If you might act on this:</b> please contact your local emergency number or a crisis line right now, or go to someone near you. You don't have to carry this alone.</div>":""}
function journalHTML(e){var h="<h1>Journal</h1>"+lookback(e,true)+"<textarea id='jn' placeholder='Write anything: a prayer, what He showed you, what is on your mind…'></textarea><button class='go' data-a='jadd'>Save entry</button>";
if(!e.length)return h+"<p class='mute' style='margin-top:1.5rem'>Nothing here yet.</p>";
h+="<p class='mute' style='margin-top:1.5rem'>"+e.length+(e.length===1?" entry.":" entries.")+"</p>";
for(var i=e.length-1;i>=0;i--)h+="<div class='entry'><p class='ref'>"+esc(e[i].date)+" · "+esc(e[i].ref||"My note")+"</p><p>"+esc(e[i].note)+"</p><button class='link' style='margin:0' data-a='del' data-v='"+i+"'>Delete</button></div>";
return h}
function temptHTML(){var h;
if(s.t===null)return "<h1>When you're tempted</h1><p>Stop for a moment. Ask the Holy Spirit to help you right now, then read what God's word says.</p>"+pick(T,"tem","Search a struggle (anger, gossip, lust…)",true);
var n=need();if(n)return n;
h="<button class='back' data-a='tback'>‹ Back</button><h2>"+T[s.t].l+"</h2><p class='mute'>Pray first: Holy Spirit, help me. I can't do this in my own strength. Show me what Your word says.</p>";
var pins=loadPins()[s.t]||[];
if(pins.length){h+="<p class='ref' style='margin-top:.5rem'>Your verses for this</p>";pins.forEach(function(r){h+=vcard(r,"<button class='link' style='margin:-.75rem 0 1.25rem 1rem' data-a='unpin' data-v='"+esc(r)+"'>Unpin</button>")});h+="<p class='ref'>More from His word</p>"}
T[s.t].refs.forEach(function(r){if(pins.indexOf(r)<0)h+=vcard(r,"<button class='link' style='margin:-.75rem 0 1.25rem 1rem' data-a='pinhere' data-v='"+esc(r)+"'>Pin as mine</button>")});
return h+"<p>Read slowly. Ask Him which verse is for you right now, then do what He shows you.</p><button class='go' data-a='tback'>Back</button>"}
function todayHTML(e){var h,st=s.step,m=M[s.mood],bk="<button class='back' data-a='back'>‹ Back</button>",wn=warn(m);
if(st==="arrive"){var gap="";if(e.length){var d=Math.floor((Date.now()-e[e.length-1].t)/864e5);if(d>=2)gap="<p class='mute'>Glad you're back. No catching up needed.</p>"}
h="<h1>"+greet()+"</h1>"+gap+carryHTML()+lookback(e,false)+"<p>How are you coming to Him today?</p>"+pick(M,"mood","Search a feeling (sad, alone, anxious…)");
var nk=loadK().length;return h+installHTML()+(nk?"<p style='margin-top:1rem'><button class='link' style='margin:0' data-a='kept'>Your kept verses ("+nk+")</button></p>":"")}
if(st==="kept"){var nb=need();if(nb)return bk+nb;var kl=loadK(),cr=getCarry();h=bk+"<h2>Kept verses</h2>";
if(!kl.length)return h+"<p class='mute'>Tap “Keep this verse” under any verse to save it here.</p>";
kl.slice().reverse().forEach(function(x){h+=vcard(x.ref)+"<p style='margin:-.5rem 0 1.25rem'><button class='link' style='margin:0' data-a='carry' data-v='"+esc(x.ref)+"'>"+(cr===x.ref?"Carrying today ✓":"Carry this today")+"</button></p>"});
return h}
if(st==="spirit")return bk+wn+"<h2>Before you read</h2><p>Ask the Holy Spirit to open your eyes. Understanding His word isn't something you can do in your own strength.</p><p class='mute'>Pray in your own words, or start with: Holy Spirit, teach me. Speak to me through Your word.</p><button class='go' data-a='toread'>I've asked. Show me the passage</button>";
if(st==="read"){var n=need();if(n)return bk+n;
h=bk+wn+"<p class='mute'>"+m.lead+"</p>"+vcard(m.refs[0])+"<p class='mute'>Let the Holy Spirit lead you here. Ask Him to speak instead of trying to figure it out yourself.</p><p>"+PASS[s.pass]+"</p>"+(s.pass<2?"<button class='go' data-a='again'>Read it again</button>":"<button class='go' data-a='topray'>Continue to prayer</button>");
h+="<p><button class='link' style='margin:.5rem 0' data-a='more'>"+(s.more?"Hide more verses":"More verses on this")+"</button></p>";
if(s.more)m.refs.slice(1).forEach(function(r){h+=vcard(r)});return h}
if(st==="pray"){var op=loadP().filter(function(x){return !x.done}).slice(0,5),lst="";
if(op.length){lst="<p class='ref'>On your prayer list</p><ul style='margin:.4rem 0 1rem;padding-left:1.2rem'>";op.forEach(function(x){lst+="<li>"+esc(x.text)+"</li>"});lst+="</ul>"}
return bk+wn+"<h2>Talk with Him</h2><p>"+(m.pray||DPRAY)+"</p>"+lst+"<p class='mute'>Speaking out loud can help. Take as long as you like.</p><button class='go' data-a='tostill'>Be still with Him</button>"}
if(st==="still"){
if(!s.timer&&s.left===0){h=bk+"<h2>Be still</h2><p>No words needed. Just be with Him for a few minutes.</p><div class='times'>";
[3,5,10].forEach(function(k){h+="<button class='t"+(s.mins===k?" on":"")+"' data-a='min' data-v='"+k+"'>"+k+" min</button>"});
return h+"</div><button class='go' data-a='start'>Begin</button><button class='link' data-a='skipstill'>Skip</button>"}
return bk+"<h2>Be still</h2><div class='clock' id='clock'>"+fmt(s.left)+"</div><p class='mute' style='text-align:center'>You are with Him.</p><div style='text-align:center'><button class='go' data-a='endstill'>Finish early</button></div>"}
if(st==="write")return bk+"<h2>Before you go</h2><p>What stood out, or what's on your heart?</p><textarea id='note' placeholder='A word, a prayer, a question for Him…'></textarea><button class='go' data-a='savenote'>Save</button>";
return "<h1>Thank you for taking time with Him.</h1><p class='mute'>Come back whenever you're ready. He's not keeping score.</p><button class='go' data-a='closeit'>Done</button>"}
var memP=[];
function loadP(){try{var r=localStorage.getItem("sit-prayers");return r?JSON.parse(r):memP}catch(e){return memP}}
function saveP(a){memP=a;try{localStorage.setItem("sit-prayers",JSON.stringify(a))}catch(e){}}
function dstr(t){return new Date(t).toLocaleDateString(undefined,{month:"short",day:"numeric"})}
function prayersHTML(){
var p=loadP(),open=p.filter(function(x){return !x.done}),done=p.filter(function(x){return x.done});
var h="<h1>Prayers</h1><p class='mute'>What you're asking Him for. Come back and mark it when He answers.</p><div class='sr'><input id='pr' placeholder='What are you praying for?'><button class='go' data-a='padd'>Add</button></div>";
if(!p.length)return h+"<p class='mute'>Nothing here yet. Add something you're asking Him for.</p>";
if(open.length){h+="<h2>Praying</h2>";
open.forEach(function(x){h+="<div class='entry'><p style='margin:0'>"+esc(x.text)+"</p><p class='ref'>Since "+dstr(x.t)+"</p>"+
(s.pa===x.t?"<textarea id='pn' placeholder='How did He answer? (optional)'></textarea><button class='go' data-a='psave' data-v='"+x.t+"'>Save</button><button class='link' data-a='pcancel'>Cancel</button>":
"<button class='link' style='margin:0' data-a='pans' data-v='"+x.t+"'>Mark answered</button><button class='link' data-a='pdel' data-v='"+x.t+"'>Delete</button>")+"</div>"})}
if(done.length){h+="<h2 style='margin-top:1.5rem'>Answered</h2>";
done.sort(function(a,b){return b.done-a.done}).forEach(function(x){var d=Math.round((x.done-x.t)/864e5);
h+="<div class='entry'><p style='margin:0'>"+esc(x.text)+"</p><p class='ref'>Answered "+dstr(x.done)+" · "+(d<1?"the same day":"after "+d+(d===1?" day":" days"))+"</p>"+(x.note?"<p>"+esc(x.note)+"</p>":"")+"<button class='link' style='margin:0' data-a='pdel' data-v='"+x.t+"'>Delete</button></div>"})}
return h}
var memK=[],memC="";
function loadK(){try{var r=localStorage.getItem("sit-kept");return r?JSON.parse(r):memK}catch(e){return memK}}
function saveK(a){memK=a;try{localStorage.setItem("sit-kept",JSON.stringify(a))}catch(e){}}
function getCarry(){try{return localStorage.getItem("sit-carry")||memC}catch(e){return memC}}
function setCarry(r){memC=r;try{localStorage.setItem("sit-carry",r)}catch(e){}}
function isKept(r){return loadK().some(function(x){return x.ref===r})}
function carryHTML(){var r=getCarry();if(!r||!B.data)return "";var x=lookup(r);if(!x)return "";
return "<p class='ref'>Carrying with you today</p><div class='verse'>"+x.html+"</div><p class='ref' style='margin:-.75rem 0 1.25rem'>"+esc(r)+" ("+VNAME()+")</p>"}
function act(a,v){if(bibleAct(a,v))return;
switch(a){
case "tab":tab(v);break;
case "mood":s.mood=v;s.pass=0;s.more=false;go("spirit");break;
case "back":stop();go(PREV[s.step]);break;
case "toread":go("read");break;
case "again":s.pass++;view();break;
case "more":s.more=!s.more;view();break;
case "topray":go("pray");break;
case "tostill":go("still");break;
case "skipstill":go("write");break;
case "min":s.mins=+v;view();break;
case "start":s.left=s.mins*60;s.timer=setInterval(function(){s.left--;if(s.left<=0){stop();go("write")}else{var c=$("clock");if(c)c.textContent=fmt(s.left)}},1000);view();break;
case "endstill":stop();go("write");break;
case "savenote":var e=load();e.push({t:Date.now(),date:dstr(Date.now()),ref:M[s.mood].refs[0],note:($("note").value||"").trim()||"(sat with Him)"});save(e);go("done");break;
case "closeit":s.mood=null;s.step="arrive";view();break;
case "tem":s.t=v;view();window.scrollTo(0,0);break;
case "tback":s.t=null;view();window.scrollTo(0,0);break;
case "jadd":var jt=($("jn").value||"").trim();if(jt){var je=load();je.push({t:Date.now(),date:dstr(Date.now()),ref:"",note:jt});save(je);toast("Saved")}view();break;
case "pinto":var pq=loadPins();pq[v]=pq[v]||[];if(pq[v].indexOf(B.pinref)<0)pq[v].push(B.pinref);savePins(pq);toast("Pinned to "+T[v].l);B.pinref=null;B.sel=[];view();break;
case "pinhere":var ph=loadPins();ph[s.t]=ph[s.t]||[];if(ph[s.t].indexOf(v)<0)ph[s.t].push(v);savePins(ph);toast("Pinned");view();break;
case "unpin":var pu=loadPins();pu[s.t]=(pu[s.t]||[]).filter(function(r){return r!==v});savePins(pu);view();break;
case "install":if(s.ip){s.ip.prompt();s.ip=null}view();break;
case "padd":var pi=$("pr"),pt=(pi.value||"").trim();if(pt){var pl=loadP();pl.push({t:Date.now(),text:pt});saveP(pl)}view();break;
case "pans":s.pa=+v;view();break;
case "pcancel":s.pa=null;view();break;
case "psave":var ps=loadP(),pn=($("pn").value||"").trim();ps.forEach(function(x){if(x.t===+v){x.done=Date.now();x.note=pn}});saveP(ps);s.pa=null;view();break;
case "pdel":saveP(loadP().filter(function(x){return x.t!==+v}));view();break;
case "keep":var kk=loadK(),at=-1;kk.forEach(function(x,i){if(x.ref===v)at=i});
if(at>-1)kk.splice(at,1);else{kk.push({ref:v,t:Date.now()});setCarry(v)}
saveK(kk);if(at>-1&&getCarry()===v)setCarry(kk.length?kk[kk.length-1].ref:"");view();break;
case "kept":go("kept");break;
case "carry":setCarry(v);view();break;
case "del":var l=load();l.splice(+v,1);save(l);view();break}}
document.addEventListener("click",function(e){var b=e.target.closest("[data-a]");if(b)act(b.dataset.a,b.dataset.v)});
document.addEventListener("keydown",function(e){if(e.key!=="Enter")return;if(e.target.id==="q")act("search");if(e.target.id==="pr")act("padd")});
document.addEventListener("input",function(e){if(e.target.id!=="fe")return;var q=e.target.value.toLowerCase().trim(),any=false;
document.querySelectorAll(".grp").forEach(function(g){var n=0;g.querySelectorAll("button").forEach(function(b){var ok=!q||b.dataset.n.indexOf(q)>-1;b.style.display=ok?"":"none";if(ok)n++});g.style.display=n?"":"none";if(n)any=true});
var nf=$("nof");if(nf)nf.style.display=any?"none":""});
document.addEventListener("change",function(e){if(e.target.id==="ver")act("ver",e.target.value)});
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();s.ip=e;if(s.tab==="today"&&s.step==="arrive")view()});
if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost"))navigator.serviceWorker.register("sw.js").catch(function(){});
try{B.fs=+localStorage.getItem("sit-fs")||19;var sv=localStorage.getItem("sit-ver");if(sv&&VERSIONS.some(function(x){return x.id===sv}))B.ver=sv}catch(e){}
loadBible();view();