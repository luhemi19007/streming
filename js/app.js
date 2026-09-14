const CHANNELS = [

{
name: "NASA TV",
country: "Estados Unidos",
continent: "americas",
category: "Ciencia",
stream: "https://ntv1.nasa.gov/hls/live/511640/NASA-NTV1-HLS/master.m3u8"
},

{
name: "France 24 Español",
country: "Francia",
continent: "europe",
category: "Noticias",
stream: "https://static.france24.com/live/F24_ES_HI_HLS/live_web.m3u8"
},

{
name: "DW Español",
country: "Alemania",
continent: "europe",
category: "Noticias",
stream: "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8"
}

];

let currentFilter = "all";
let currentHls = null;

function renderChannels() {

const grid =
document.getElementById("channelsGrid");

const search =
document.getElementById("search")
.value
.toLowerCase();

grid.innerHTML = "";

const filtered =
CHANNELS.filter(channel => {

const filterMatch =
currentFilter === "all" ||
channel.continent === currentFilter;

const searchMatch =
channel.name.toLowerCase().includes(search) ||
channel.country.toLowerCase().includes(search);

return filterMatch && searchMatch;

});

document.getElementById(
"channelCount"
).textContent =
filtered.length + " canales";

filtered.forEach(channel => {

const card =
document.createElement("div");

card.className = "card";

card.innerHTML = `
<div class="badge">
${channel.category}
</div>

<h3>${channel.name}</h3>

<p>${channel.country}</p>

<button class="play-btn">
▶ Ver Canal
</button>
`;

card.addEventListener(
"click",
() => playChannel(channel)
);

grid.appendChild(card);

});

}

function playChannel(channel) {

const video =
document.getElementById("videoPlayer");

if(currentHls){

currentHls.destroy();

}

if(Hls.isSupported()){

currentHls = new Hls();

currentHls.loadSource(
channel.stream
);

currentHls.attachMedia(video);

currentHls.on(
Hls.Events.MANIFEST_PARSED,
() => {

video.play();

}
);

}else{

video.src = channel.stream;

video.play();

}

window.scrollTo({
top:200,
behavior:"smooth"
});

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
.forEach(button => {

button.addEventListener(
"click",
() => {

document
.querySelectorAll(".filter")
.forEach(btn =>
btn.classList.remove(
"active"
)
);

button.classList.add(
"active"
);

currentFilter =
button.dataset.filter;

renderChannels();

}
);

});

}
);
