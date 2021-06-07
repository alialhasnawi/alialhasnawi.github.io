// Get data from js module.
import dataset from './full_data.js'
import boundaries from './garbage.js'
import vaughan_bounds from './vaughan.js'

// Dataset items and key.
let key_index = dataset.key
let data = dataset.items.filter((e)=>{
    return e[8] != 'NULL' && e[9] != 'NULL';
});

// Init leaflet map.
const map = L.map('map', {center: [43.836963, -79.561138], zoom: 12, zoomControl: false});

// OSM Baselayer.
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

// Interface.

/**
 * Return a filtered array.
 * @param {Set} filters 
 */
function filter_data(filters)
{
    let points = [];

    for (let i = 0; i < data.length; i++) {
        let entry = data[i]
        let passed = true;
    
        for (const key in filters) {
            if (!filters[key].has(entry[key_index[key]])) {
                passed = false;
                break;
            }
        }
    
        if (!passed) {
            continue;
        }
    
        points.push([
            entry[key_index["LAT"]],
            entry[key_index["LNG"]]
        ])
    }

    return points;
}


/**
 * Return and add heatmap based on filter to map.
 * @param {Object} filter in format filterable-key to requirements set-value dictionary
 * @param {Object} options
 */
function heatmap_filter(filter, options = {})
{
    let points = filter_data(filter);
    let default_options = {radius:10, blur:22, maxZoom:11};
    
    for (const key in options) {
        default_options[key] = options[key];
    }

    return L.heatLayer(points, default_options).addTo(map);
}

/**
 * Draw points on map.
 * @param {Object} filter in format filterable-key to requirements set-value dictionary
 * @param {Object} options
 */
function pointmap_filter(filter, options = {})
{
    let points = filter_data(filter);
    let default_options = {
        color: 'red',
        fillOpacity: 0.2,
        radius: 10,
        weight: 7
    };
    
    for (const key in options) {
        default_options[key] = options[key];
    }

    for (let i = 0; i < points.length; i++) {
        L.circle(points[i], default_options).addTo(map);
    }
}

/**
 * Return and draw polygon boundary from geoJSON objecy.
 * @param {*} json
 * @param {*} options
 */
function draw_garbage_boundary(json, options = {})
{
    let default_options = {
        color: '#4b7cd6',
        fillOpacity: 0.0,
        weight: 3
    };
    
    for (const key in options) {
        default_options[key] = options[key];
    }

    return L.polygon(json.geometry.coordinates, default_options).addTo(map);
}

/**
 * Return boundary object and draw boundaries.
 * An init function.
 */
function draw_boundaries()
{
    let d = {};

    for (let i = 0; i < boundaries.features.length; i++) {
        const feature = boundaries.features[i];
        d[feature.properties.day] = draw_garbage_boundary(feature);
    }

    return d;
}

/**
 * Draw a white blanket covering areas outside the city bounds.
 */
function remove_outer_limits()
{
    L.polygon([
            [[90, -180],
            [90, 180],
            [-90, 180],
            [-90, -180]],

            vaughan_bounds.geometry.coordinates
        ],
        {
            color: 'white',
            fillOpacity: 1.0,
            weight: 0.0
        }
    ).addTo(map);
}

/**
 * Draw a heatmap and highlight a boundary area for a weekday.
 * @param {*} day 
 * @param {*} boundary_options 
 * @param {*} map_options 
 */
function weekday_map(day, is_heat = true, boundary_options = {}, map_options = {}) {
    let default_boundary_ops = {color: '#e6324d'};
    let default_map_ops = {};

    for (const key in boundary_options) {
        default_boundary_ops[key] = boundary_options[key];
    }

    for (const key in map_options) {
        default_map_ops[key] = map_options[key];
    }

    boundary_obj[day].setStyle(default_boundary_ops);
    boundary_obj[day].bringToFront();

    if (is_heat){
        heatmap_filter({"WEEK_DAY": new Set([day])}, default_map_ops);
    } else {
        pointmap_filter({"WEEK_DAY": new Set([day])}, default_map_ops);
    }
}

remove_outer_limits();

let boundary_obj = draw_boundaries();

// WED TUES FRI THURS
weekday_map("THURS", true, {fillOpacity: 0.05}, {color: '#e6841c'});




// === IGNORE ===

// heatmap_filter({"WEEK_DAY": new Set(["MON"])},
//            {gradient: {1: 'rgba(246, 28, 28, 0.2)'}});
// heatmap_filter({"WEEK_DAY": new Set(["TUES"])},
//            {gradient: {1: 'rgba(246, 159, 28, 0.2)'}});
// heatmap_filter({"WEEK_DAY": new Set(["WED"])},
//            {gradient: {1: 'rgba(246, 232, 28, 0.2)'}});
// heatmap_filter({"WEEK_DAY": new Set(["THURS"])},
//            {gradient: {1: 'rgba(28, 246, 39, 0.2)'}});
// heatmap_filter({"WEEK_DAY": new Set(["FRI"])},
//            {gradient: {1: 'rgba(28, 243, 246, 0.2)'}});
// heatmap_filter({"WEEK_DAY": new Set(["SAT"])},
//            {gradient: {1: 'rgba(24, 43, 245, 0.2)'}});
// heatmap_filter({"WEEK_DAY": new Set(["SUN"])},
//            {gradient: {1: 'rgba(234, 24, 245, 0.2)'}});


// pointmap_filter({"WEEK_DAY": new Set(["MON"])}, {color: 'red'});
// pointmap_filter({"WEEK_DAY": new Set(["TUES"])}, {color: 'orange'});
// pointmap_filter({"WEEK_DAY": new Set(["WED"])}, {color: 'yellow'});
// pointmap_filter({"WEEK_DAY": new Set(["THURS"])}, {color: 'green'});
// pointmap_filter({"WEEK_DAY": new Set(["FRI"])}, {color: 'cyan'});
// pointmap_filter({"WEEK_DAY": new Set(["SAT"])}, {color: 'blue'});
// pointmap_filter({"WEEK_DAY": new Set(["SUN"])}, {color: 'purple'});

// let week_gradient = {
//     0.125: 'red',
//     0.25: 'orange',
//     0.375: 'yellow',
//     0.5: 'green',
//     0.675: 'cyan',
//     0.75: 'blue',
//     0.875: 'purple',
// };