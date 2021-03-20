import * as E from './esrc.js';
import * as V from './v.js';

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
        
        let outs = `${Number.parseFloat(value).toPrecision(3)}
        ${vTool.id}
        ${Math.round(vTool.capacity * 100)}%
        ${Number.parseFloat(vTool.height).toPrecision(4)}`;

        outtest.innerText = outs;
    });
}