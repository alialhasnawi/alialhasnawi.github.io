//constants of accepted sound files and filepath main directory
const phonemes = ['a', 'e', 'i', 'o', 'u', 'b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 'C', 'S', 'T', 'U'];
const voicePath = 'res/voice/';

// web audio api
var audioContext;
var sounds = [];

// html DOM variables
var dialogue;
var rateSlider;
var inText;

// init variables for speak()
var speaking = false;
var speakingIntervals = [];
var globalRate = 1.8;

document.addEventListener('DOMContentLoaded', function(e) {
  dialogue = document.getElementById('dialogue-text');
  slider = document.getElementById('rateRange');
  inText = document.getElementById('inText');

  slider.oninput = function() {
    globalRate = 0.4 * Math.pow(4, this.value) + 0.2;
  }

  document.addEventListener('click', init);
});

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
  if (inText.value !== '') {
    speak(inText.value, 70, globalRate);
  }
}

function shut() {
  speakingIntervals.forEach((item, i) => {
    clearInterval(item);
  });

  speaking = false;
  speakingIntervals = [];
}

function speak(text, time, rate, ignore = false) {
  if (!speaking || ignore) {
    speaking = true;
    var str = toAnimal(text);

    var length = str.length;
    var originalLength = text.length;

    var speakingID = setLimitedInterval(function(i) {
      if (phonemes.includes(str[i])) {
        play(sounds[str[i]], globalRate);
      } else if (str[i] == ' ') {
        // nothing
      } else {
        play(sounds['b'], globalRate);
      }
      i++;
    }, time, length, null, function() {
      speaking = false
    });

    var typingID = setLimitedInterval(function(i) {
      dialogue.innerHTML += text[i];
    }, Math.round((length / originalLength) * time), originalLength, function() {
      dialogue.innerHTML = '';
    });

    speakingIntervals.push(speakingID, typingID);
  }

  return {
    'text': text,
    'time': time,
    'rate': rate,
    'ignore': ignore
  };
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
  return str.toLowerCase()
    .replace(/wh/g, 'w')
    .replace(/ph/g, 'f')
    .replace(/ch/g, 'C')
    .replace(/sh/g, 'S')
    .replace(/th/g, 'T')
    .replace(/ss/g, 's')
    .replace(/oo/g, 'U')
    .replace(/c/g, 'k')
    .replace(/q/g, 'k')
    .replace(/\./g, '      ')
    .replace(/,/g, '      ')
    .replace(/!/g, '      ')
    .replace(/\?/g, '      ')
    .replace(/1/g, 'wan')
    .replace(/2/g, 'tU')
    .replace(/3/g, 'Tri')
    .replace(/4/g, 'for')
    .replace(/5/g, 'fayv')
    .replace(/6/g, 'six')
    .replace(/7/g, 'seven')
    .replace(/8/g, 'eyt')
    .replace(/9/g, 'nayn');
}


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