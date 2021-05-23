// import bndvaughan from './bndvaughan.js'
import data from './geocoded.js'


const map = L.map('map', {center: [43.8, -79.5], zoom: 12});

// OSM Baselayer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

let points = [];

for (let i = 0; i < data.length; i++) {
    points.push(data[i].slice(-2))
}

const heat = L.heatLayer(points, {radius:12,blur:22,maxZoom:11}).addTo(map);
