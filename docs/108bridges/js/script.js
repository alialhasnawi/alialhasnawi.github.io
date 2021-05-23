import {b} from './bridges.js';
import {Sidebar} from './sidebar.js'


const PATH = 'https://bridges108.herokuapp.com/'
const bridgeCount = b.length;
const B_NAME = 0;
const B_LAT = 1;
const B_LON = 2;

let areaVisible = false;
let pathActive = false;
let controlsInitted = false;

const defaultParams = {
    lat: 46.6, 
    lon: -82.2,
    radius: 25,
    maxb: 10
};

const searchParams = {...defaultParams};
const inputElements = {};

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// Row helpers
const getScoreColour = c => {
    if (c == -1) {
        return '';
    } else if (c >= 70) {
        return 'sb-t-good';
    } else if (c >= 60) {
        return 'sb-t-mid';
    }
    return 'sb-t-bad';
}

const generateRows = d => {
    let years = d[0].map((e)=>`<td class="sb-t-year">${e}</td>`);
    let scores = d[1].map((e)=>`<td class="sb-t-score ${getScoreColour(e)}">${e == -1 ? '—' : e }</td>`);

    let htm = '';
    for (let i = 0; i < d[0].length; i++) {
        htm += `<tr>${years[i]}${scores[i]}</tr>`;
    }
    return htm;
}


// Sidebar instant
const sb = new Sidebar('#map-controls');
sb.addStatic('loading', `<div class="sb" id="sb-loading">
<div class="loading">Finding bridge...</div>
</div>`);

sb.addStatic('instructions', `<div class="sb" id="sb-instructions">
<div class="sb-title">108bridges Visual Tool</div>
<div class="sb-text">A simple map UI for A2* of CSC108!</div>
<div class="sb-text">*this is not a school project, but a tool for visualizing data used in the project</div>
<div class="sb-header">How to Use</div>
<div class="sb-text">View details about a bridge by clicking on it's location on the map.</div>
<div class="sb-text">To plan an inspection route of the worst BCI bridges, click on the orange marker and use the sidebar controls.</div>
</div>`);

sb.addStatic('connecting', `<div class="sb" id="sb-connecting">
<div>
<div class="loading">Connecting to server...</div>
<div class="sb-text">(might take up to 30 seconds)</div>
</div>
</div>`);

sb.addStatic('controls', `<div class="sb" id="sb-controls">
    <div class="sb-header">Inspection Route</div>
    <div class="sb-text">Plot a route between bridges in need of inspection and repair.</div>
    <form class="sb-form" autocomplete="off">
        <div class="sb-f-layer">
            <input checked type="checkbox" name="show" id="sb-f-toggle" class="">    
            <label class="sb-label" for="show">Show Area on Map</label>
        </div>

        <div class="sb-f-layer">
            <label class="sb-label" for="radius">Search Radius: <span id="sb-f-radius-text">${defaultParams.radius}km</span></label>
        </div>

        <div class="sb-f-layer">
            <input required type="range" name="radius" id="sb-f-radius" class="" min="1" max="150" step="1" value="${defaultParams.radius}">
        </div>

        <div class="sb-f-layer">
            <label class="sb-label" for="count">Max Bridges to Inspect</label>
            <input required type="number" name="count" id="sb-f-counter" class="" min="1" max="50" step="1" value="${defaultParams.maxb}">
        </div>

        <div class="sb-f-layer">
            <label class="sb-label" for="submit"></label>
            <input type="button" name="submit" id="sb-f-submit" class="" value="Plot Path">
        </div>
    </form>
    <div id="sb-f-results">
    </div>
<div>`);

sb.addTemplate('error', d=>`<div class="sb" id="sb-error">
ERROR: ${d}<br>Please check your connection and try again.
<div>`);

sb.addTemplate('data', d=>`<div class="sb" id="sb-data">
    <div class="sb-title">${b[d[0]][B_NAME]}</div>
    <div class="sb-header">General Info</div>
    <div class="sb-text">Built in ${d[5]}</div>
    <div class="sb-text">On Highway ${d[2]} at ${d[3]}, ${d[4]}</div>
    <table class="sb-bci-table">
        <caption class="sb-header"><a class="helper" href="http://www.mto.gov.on.ca/english/highway-bridges/ontario-bridges.shtml" target="_blank">BCI History</a></caption>
        ${generateRows(d[12])}
    </table>
    <div class="sb-header">Construction Details</div>
    <div class="sb-text">Deck Length: ${d[10]}m</div>
    <div class="sb-text">Spans:</div>
    <div class="sb-sp">
    ${d[9].map(e=>`<div class="sb-sp-ruler"></div><div class="sb-sp-length">${e}m</div>`).reduce((a,b)=>(a+b))}
    </div>
    <div class="sb-header">Recent Rehabilitations & Inspections</div>
    <div class="sb-text">Last major rehabilitation: ${d[6] || '—'}</div>
    <div class="sb-text">Last minor rehabilitation: ${d[7] || '—'}</div>
    <div class="sb-text">Last inspected: ${d[11] || '—'}</div>
</div>`);

sb.swapStatic('connecting');

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// Init map
const _map = L.map('map-box').setView([46.6, -82.2], 5);
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 4,
	maxZoom: 20,
	ext: 'png'
}).addTo(_map);

// Draw bridges
// Everything has to be 1-indexed ; __ ;
const circleMarkers = [];
for (let i = 1; i < bridgeCount; i++){
    circleMarkers[i] = L.circle([b[i][B_LAT], b[i][B_LON]], {
        color: 'var(--bridge-marker-colour)',
        fillOpacity: 0.2,
        radius: 10,
        weight: 7
    }).addTo(_map);

    circleMarkers[i].on('click', ()=>{
        getBridge(i);
    }).on('');
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// Marker circle select and events
let activeMarker;
const pathMarkers = [];
let path;
const center = L.marker([defaultParams.lat, defaultParams.lon], {
    draggable: true,
    icon: L.icon({
        iconUrl: 'images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'images/marker-shadow.png',
        shadowSize: [41, 41]
    })
    }).addTo(_map);
const area = L.circle([defaultParams.lat, defaultParams.lon], {
    color: 'var(--area-selector-colour)',
    fillOpacity: 0.1,
    radius: defaultParams.radius * 1000,
    weight: 2,
    dashArray: 4,
    zIndex: 10
});
center.on('drag', ()=>{
    let latlng = center.getLatLng(); 
    area.setLatLng(latlng);
    searchParams.lat = latlng.lat;
    searchParams.lon = latlng.lng;
}).on('click', openControls);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// Get data
function getBridge(id) {
    sb.swapStatic('loading');
    fetch(`${PATH}bridge/${id}`)
        .then(rep=>rep.json())
        .then(d=>{
            highlightID(id);
            sb.swapTemplate('data', d);
        })
        .catch(error=>{
            console.log(error)
            sb.swapTemplate('error', `Could not find a bridge with ID ${id}!`)
        });
}

// Open sidebar
function openControls(){
    if (!sb.is('controls')) {
        if (!areaVisible) {
            toggleArea();
        }
        highlightID(undefined);
        sb.swapStatic('controls');

        if (!controlsInitted) {
            controlsInitted = true;
            inputElements.toggle = document.querySelector('#sb-f-toggle');
            inputElements.radius = document.querySelector('#sb-f-radius');
            inputElements.radiusDisplay = document.querySelector('#sb-f-radius-text');
            inputElements.counter = document.querySelector('#sb-f-counter');
            inputElements.submit = document.querySelector('#sb-f-submit');
            inputElements.results = document.querySelector('#sb-f-results');

            inputElements.toggle.addEventListener('input', e=>{
                toggleArea();
            });

            inputElements.radius.addEventListener('input', e=>{
                searchParams.radius = e.target.value;
                inputElements.radiusDisplay.innerText = searchParams.radius + 'km';
                area.setRadius(searchParams.radius * 1000);
            });

            inputElements.counter.addEventListener('input', e=>{
                searchParams.maxb = e.target.value;
            });

            inputElements.submit.addEventListener('click', e=>{
                getRoute();
            })
        } else {
            inputElements.toggle.checked = true;
        }
    }
}

// Get route
function getRoute() {
    inputElements.results.innerHTML = '<div class="loading">Searching for bridges...</div>';
    fetch(`${PATH}map/?lat=${searchParams.lat}&lon=${searchParams.lon}&maxb=${searchParams.maxb}&rad=${searchParams.radius}`)
        .then(rep=>rep.json())
        .then(d=>{
            if (path) {
                _map.removeLayer(path);
            }

            path = L.polyline([[searchParams.lat, searchParams.lon], ...d.map(e=>[b[e][B_LAT], b[e][B_LON]])], {
                color: 'var(--active-path-colour)'
            }).bringToBack().addTo(_map).on('click', openControls);

            pathMarkers.push(...d);
            highlightPath(d);
            

            /* // Displaying result
            let htm;

            if (d.length != 0) {
                htm = d.map(c=> `<div class="sb-path-point"></div><div class="sb-path-name">${b[c][B_NAME]}</div>`).reduce((c, d)=> c+d);
                htm = `<div class="sb-path-join"></div><div class="sb-path-grid">${htm}</div>`;
            } else {
                htm = `<div class="sb-text">No bridges found in that radius.</div>`;
            }
            inputElements.results.innerHTML = htm; */

            if (d.length != 0) {
                inputElements.results.innerHTML = '';

                let joiner = el('sb-path-join');
                let grid = el('sb-path-grid');

                for (let i = 0; i < d.length; i++) {
                    let wrap = el('sb-path-wrap');
                    let point = el('sb-path-point');
                    let name = el('sb-path-name');
                    name.append(b[d[i]][B_NAME]);

                    wrap.addEventListener('click', ()=>{
                        getBridge(d[i]);
                    });

                    wrap.addEventListener('mouseover', ()=>{
                        highlightID(d[i], 'var(--hover-marker-colour)');
                    });

                    wrap.addEventListener('mouseout', ()=>{
                        highlightID(0);
                    });

                    wrap.append(point, name)
                    grid.append(wrap);
                }

                inputElements.results.append(joiner, grid);

            } else {
                inputElements.results.innerHTML = '<div class="sb-text">No bridges found in that radius.</div>';
            }
            
        })
        .catch(error=>{
            console.log(error);
            sb.swapTemplate('error', 'Failed to create a path!');
        });
}

// Class quick create
function el(_class, tag='div') {
    let node = document.createElement(tag);
    node.className = _class;
    return node;
}

// Initial load
function connect() {
    fetch(PATH).then((d)=>{
        let blocker = document.querySelector('#blocker');
        blocker.style.opacity = '0.0';
        
        setTimeout(()=>{
            blocker.remove();
        }, 500);

        sb.swapStatic('instructions');

        document.querySelector('#help-button').addEventListener('click', ()=>{
            sb.swapStatic('instructions');
        });
    }).catch(error=>{
        console.log(error);
        sb.swapTemplate('error', 'Unable to reach server!');
    });
}

function highlightID(id, colour='var(--active-marker-colour)') {
    if (activeMarker){
        circleMarkers[activeMarker].setStyle({ color: pathMarkers.includes(activeMarker) ? 'var(--path-marker-colour)' : 'var(--bridge-marker-colour)'});
    }

    if (id) {
        activeMarker = id;
        circleMarkers[id].setStyle({ color: colour}).bringToFront();
    }
}

function highlightPath(ids) {
    for (let i = 0; i < pathMarkers.length; i++) {
        circleMarkers[pathMarkers[i]].setStyle({ color: 'var(--bridge-marker-colour)' });
    }

    for (let i = 0; i < ids.length; i++) {
        circleMarkers[ids[i]].setStyle({ color: 'var(--path-marker-colour)'}).bringToFront();
    }
}

// Togle circle visibility
function toggleArea() {
    if (areaVisible) {
        _map.removeLayer(area);
    } else {
        area.addTo(_map).bringToBack();
    }

    areaVisible = !areaVisible;
}

connect();