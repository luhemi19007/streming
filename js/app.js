const CHANNELS = [

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
}

];

let currentFilter="all";

function renderChannels(){

const grid=document.getElementById("channelsGrid");

if(!grid) return;

const search=document
.getElementById("search")
.value
.toLowerCase();

grid.innerHTML="";

CHANNELS
.filter(channel=>{

const filterOk=
currentFilter==="all" ||
channel.continent===currentFilter;

const searchOk=
channel.name.toLowerCase().includes(search) ||
