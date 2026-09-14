const CHANNELS=[

{
name:"NASA TV",
country:"Estados Unidos",
continent:"americas",
stream:"https://ntv1.nasa.gov/hls/live/511640/NASA-NTV1-HLS/master.m3u8"
},

{
name:"France 24 Español",
country:"Francia",
continent:"europe",
stream:"https://static.france24.com/live/F24_ES_HI_HLS/live_web.m3u8"
},

{
name:"DW Español",
country:"Alemania",
continent:"europe",
stream:"https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8"
},

{
name:"NHK World",
country:"Japón",
continent:"asia",
stream:"https://nhkworld.live-s.cdn.bitgravity.com/cdn-live/live/_definst_/content/nhkworld_1_hls/index.m3u8"
}

];

let currentFilter="all";

const grid=document.getElementById("channelsGrid");

function getFavorites(){

return JSON.parse(
localStorage.getItem("favorites")||"[]"
);

}

function getHistory(){

return JSON.parse(
localStorage.getItem("history")||"[]"
);

}

function renderChannels(){

const search=
document.getElementById("search")
.value
.toLowerCase();

grid.innerHTML="";

CHANNELS
.filter(channel=>{

const continentMatch=
currentFilter==="all"||
channel.continent===currentFilter;

const searchMatch=
channel.name.toLowerCase().includes(search)||
channel.country.toLowerCase().includes(search);

return continentMatch&&searchMatch;

})
.forEach(channel=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<div class="favorite">
⭐
</div>

<div class="channel-name">
${channel.name}
</div>

<div class="country">
${channel.country}
</div>

<div class="badge">
Disponible
</div>

`;

card.onclick=()=>playChannel(channel);

grid.appendChild(card);

});

}

function playChannel(channel){

saveHistory(channel.name);

const video=
document.getElementById("videoPlayer");

if(Hls.isSupported()){

const hls=new Hls();

hls.loadSource(channel.stream);

hls.attachMedia(video);

hls.on(
Hls.Events.MANIFEST_PARSED,
()=>{
video.play();
}
);

}else{

video.src=channel.stream;

video.play();

}

window.scrollTo({
top:200,
behavior:"smooth"
});

}

function saveHistory(name){

let list=getHistory();

list.unshift(name);

list=[...new Set(list)];

localStorage.setItem(
"history",
JSON.stringify(list.slice(0,20))
);

renderHistory();

}

function renderHistory(){

const historyGrid=
document.getElementById("historyGrid");

historyGrid.innerHTML="";

getHistory().forEach(name=>{

historyGrid.innerHTML+=`
<div class="card">
${name}
</div>
`;

});

}

document
.querySelectorAll(".filter")
.forEach(btn=>{

btn.addEventListener("click",()=>{

document
.querySelectorAll(".filter")
.forEach(b=>
b.classList.remove("active")
);

btn.classList.add("active");

currentFilter=
btn.dataset.filter;

renderChannels();

});

});

document
.getElementById("search")
.addEventListener(
"input",
renderChannels
);

renderChannels();
renderHistory();

if("serviceWorker" in navigator){

navigator.serviceWorker
.register("sw.js");

}
