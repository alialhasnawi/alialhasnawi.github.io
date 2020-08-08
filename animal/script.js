//constants of accepted sound files and filepath main directory
const phonemes = ['a', 'e', 'i', 'o', 'u', 'b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 'C', 'S', 'T', 'U'];
const voicePath = 'res/voice/';

const animalRegX = /wh|ph|ch|sh|th|ss|oo|./gi;

const replacements = {
  '.': 4,
  ',': 4,
  '!': 4,
  '?': 4,
  '0': 4,
  '1': 3,
  '2': 2,
  '3': 3,
  '4': 3,
  '5': 4,
  '6': 3,
  '7': 5,
  '8': 3,
  '9': 4,
};

// web audio api
var audioContext;
var sounds = [];

// html DOM variables
var outTag;
var pitchSliderTag;
var speedSliderTag;
var inTag;

// init variables for speak()
var speaking = false;
var speakingInterval = 'CLEARED';
var pitchRate = 1.8;
var speedRate = 70;

document.addEventListener('DOMContentLoaded', function(e) {
  outTag = document.getElementById('dialogue-text');
  pitchSliderTag = document.getElementById('rateRange');
  speedSliderTag = document.getElementById('speedRange');
  inTag = document.getElementById('inText');

  pitchSliderTag.oninput = function() {
    pitchRate = 0.4 * Math.pow(4, Number(this.value)) + 0.2;
  }

  /*speedSliderTag.oninput = function() {
    speedRate = (250 / (Number(this.value) + 0.7)) - 80;
  }*/

  document.addEventListener('click', init);
});

// inits context
function init() {
  // inits context on click
  audioContext = new AudioContext();

  // loads sounds
  loadInventory();

  // prevents duplicate inits
  document.removeEventListener('click', init);
}

function playClip() {
  shut();

  if (inTag.value !== '') {
    if (inTag.value.length > 90) {
      outTag.style.fontSize = (2.5 * Math.pow(0.997, inTag.value.length - 90)).toFixed(1).toString() + 'vw';
    } else {
      outTag.style.fontSize = '2.5vw';
    }

    speakingInterval = speak(inTag.value, speedRate, pitchRate);
    //speakingInterval = speak(inTag.value, 20, pitchRate);
  }
}

// closes speaking intervals and refreshes dialogue box
function shut() {
  if (speakingInterval !== 'CLEARED') {
    clearInterval(speakingInterval);
  }

  outTag.innerHTML = '';
  speaking = false;
  speakingInterval = 'CLEARED';
}

function speak(text, time, rate, ignore = false) {
  if (!speaking || ignore) {
    speaking = true;

    var animalTxt = toAnimal(text);
    var arrayTxt = transcribe(text);

    var length = animalTxt.length;
    var originalLength = text.length;

    var speakingID = setLimitedInterval(function(i) {
      if (phonemes.includes(animalTxt[i])) {
        play(sounds[animalTxt[i]], pitchRate);
      } else if (animalTxt[i] == ' ') {
        // nothing lol
      } else {
        play(sounds['b'], pitchRate);
      }

      outTag.innerHTML += arrayTxt[i];

    }, time, length, null, function() {
      speaking = false
    });

    return speakingID;
  }
}

function setLimitedInterval(func, time, iterations, beginning = null, ending = null) {
  var i = 0;

  if (beginning !== null) {
    beginning();
  }

  var id = setInterval(function() {
    func(i);
    i++;

    if (i === iterations) {
      if (ending !== null) {
        ending();
      }
      clearInterval(id);
    }
  }, time);

  return id;
}

function toAnimal(str) {
  var animal = str.toLowerCase()
    .replace(/wh/g, 'w')
    .replace(/ph/g, 'f')
    .replace(/ch/g, 'C')
    .replace(/sh/g, 'S')
    .replace(/th/g, 'T')
    .replace(/ss/g, 's')
    .replace(/oo/g, 'U')
    .replace(/c/g, 'k')
    .replace(/q/g, 'k')
    .replace(/\./g, '    ')
    .replace(/,/g, '    ')
    .replace(/!/g, '    ')
    .replace(/\?/g, '    ')
    .replace(/0/g, 'zero')
    .replace(/1/g, 'wan')
    .replace(/2/g, 'tU')
    .replace(/3/g, 'Tri')
    .replace(/4/g, 'for')
    .replace(/5/g, 'fayv')
    .replace(/6/g, 'six')
    .replace(/7/g, 'seven')
    .replace(/8/g, 'eyt')
    .replace(/9/g, 'nayn');

  return animal;
}

function transcribe(str) {
  var array = str.match(animalRegX);

  var length = array.length;

  for (var i = length - 1; i >= 0; i--) {
    if (replacements[array[i]] !== undefined) {
      for (var j = 0; j < replacements[array[i]] - 1; j++) {
        array.splice(i + 1, 0, '');
      }
    }
  }

  return array;
}

// loads .ogg files
function loadInventory() {
  phonemes.forEach((item, index) => {
    var file;

    switch (item) {
      case 'C':
        file = 'ch.ogg';
        break;
      case 'S':
        file = 'sh.ogg';
        break;
      case 'T':
        file = 'th.ogg';
        break;
      case 'U':
        file = 'oo.ogg';
        break;
      default:
        file = item + '.ogg';
    }

    addSound(voicePath + file, item);
  });
}

function play(buffer, rate) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.value = rate;
  source.connect(audioContext.destination);
  source.start();
}

// loads sound buffer from path
async function load(path) {
  const response = await fetch('./' + path);
  const arrayBuffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
}

// adds sound to array
function addSound(path, index) {
  load(path).then(response => {
    sounds[index] = response;
  });
  return index;
}