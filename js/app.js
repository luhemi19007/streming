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

let currentFilter = "all";

function renderChannels(){

const grid =
document.getElementById("channelsGrid");

const search =
document.getElementById("search")
.value
.toLowerCase();

grid.innerHTML = "";

CHANNELS
.filter(channel => {

const filterOk =
currentFilter === "all" ||
channel.continent === currentFilter;

const searchOk =
channel.name.toLowerCase().includes(search) ||
channel.country.toLowerCase().includes(search);

return filterOk && searchOk;

})
.forEach(channel => {

const card =
document.createElement("div");

card.className = "card";

card.innerHTML = `
<h3>${channel.name}</h3>
<p>${channel.country}</p>
`;

card.onclick = () => {
playChannel(channel);
};

grid.appendChild(card);

});

}

function playChannel(channel){

const video =
document.getElementById("videoPlayer");

if(Hls.isSupported()){

const hls = new Hls();

hls.loadSource(channel.stream);

hls.attachMedia(video);

hls.on(
Hls.Events.MANIFEST_PARSED,
() => {
video.play();
}
);

}else{

video.src = channel.stream;

video.play();

}

}

document.addEventListener(
"DOMContentLoaded",
() => {

renderChannels();

document
.getElementById("search")
.addEventListener(
"input",
renderChannels
);

document
.querySelectorAll(".filter")
.forEach(btn => {

btn.addEventListener(
"click",
() => {

document
.querySelectorAll(".filter")
.forEach(b =>
b.classList.remove("active")
);

btn.classList.add("active");

currentFilter =
btn.dataset.filter;

renderChannels();

}
);

});

}
);
