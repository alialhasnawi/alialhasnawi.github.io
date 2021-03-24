import * as E from './esrc.js';
import * as V from './v.js';
import * as AniM from './animman.js';


const WATERCOLOUR = 0x34b1eb;
const volumes = [
    new V.Volume('tub', 0.9447, 0.38),
    new V.Volume('home', 113.97, 4.4),
    new V.Volume('pool', 1250.0, 2.9),
    new V.Volume('arena', 16084.95, 48),
    new V.Volume('park', 3200000.0, 800)
];

const vTool = new V.VTool(volumes);

// TESTING BLOCK
{
    const inslide = document.querySelector('#test-slide');
    const outtest = document.querySelector('#test-out');

    inslide.addEventListener('input', ()=>{
        let value = 37 ** inslide.value - 1;
        vTool.volume = value;
        
        let outs = `${Number.parseFloat(value).toPrecision(3)}gal
        Container:\t${vTool.id}
        Capacity:\t${Math.round(vTool.capacity * 100)}%
        Height:\t${Number.parseFloat(vTool.height).toPrecision(3)}m`;

        outtest.innerText = outs;
        animm.target('tub', {x: 1, y: inslide.value, z: 1});
    });
}

//-------------------------INIT-------------------------//
const errorFun = e => `Error: ${e}`;
const halfView = document.querySelector('#half-view');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10000.0);
const loader = new THREE.GLTFLoader();
const renderer = new THREE.WebGLRenderer();
const animm = new AniM.AnimMan();

renderer.setSize(window.innerHeight, window.innerHeight);
halfView.appendChild(renderer.domElement);

camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0)

let tub;

loader.load('models/tub.glb', (glb)=>{
    scene.add(glb.scene);
    tub = glb.scene;

    animm.origin('tub', tub.scale);
    // animm.target('tub', {x: 1, y: 2, z: 1});
}, undefined, errorFun);

function animate() {
	requestAnimationFrame(animate);
	
    renderer.render(scene, camera);
    animm.tick();
}

// setInterval(()=>{
//     animm.target('tub', {x: 1, y: Math.random() * 2, z: 1});
// }, 7000);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set(1, 1, 1);
scene.add( directionalLight );

const hlight = new THREE.AmbientLight(0xdddddd, 0.4);
scene.add(hlight);

// const hlight = new THREE.AmbientLight(0x404040, 100);
// scene.add(hlight);

animate();