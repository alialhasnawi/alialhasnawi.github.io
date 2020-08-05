document.addEventListener('DOMContentLoaded', function(e) {

  const phonemes = ['a', 'e', 'i', 'o', 'u', 'b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 'C', 'S', 'T', 'U'];
  const voicePath = 'res/voice/';
  const srctxt = "THE FUCK YOU SAY TO ME, YOU LITTLE SHIT? AHAHAHAHAHA! HOW ARE YOU- HOW ARE YOU NOT IN FUCKING SCHOOL? YOU KISS YOUR MOTHER WITH THAT MOUTH? IT'S CALLED \" YOU KISS - \" IT'S CALLED \" YOU KISS YOUR MOTHER WITH THAT FUCKING MOUTH ? \" HUH? Huh? AHAHAHA- HE'S SO- AGAHAHAHAH BECAUSE THE FUCKING YOUTH OF SOCI- AAAAAAAAAAHAHAAAAAAAAAAAAAAHAAHAHAAAAAAA AAA- YOU SHUT UP WHEN I'M TALKING TO YOU! YOU SHUT YOUR MOUTH!";

  var audioContext;
  var sounds = [];

  var pTag = document.getElementsByTagName('p')[0];


  function init() {
    // inits context on click
    audioContext = new AudioContext();

    // loads sounds
    loadInventory();

    // prevents duplicate inits
    document.removeEventListener('click', init);

    console.log(toAnimal(srctxt));
    console.log(sounds);

    speak(srctxt, 70, 2.2);
  }

  function speak(text, time, rate) {
    str = toAnimal(text);
    length = str.length;
    originalLength = text.length;

    setLimitedInterval(function(i) {
      if (phonemes.includes(str[i])) {
        play(sounds[str[i]], rate);
      } else if (str[i] == ' ') {
        // nothing
      } else {
        // wait
      }
      i++;
    }, time, length);



    setLimitedInterval(function(i) {
      pTag.innerHTML += text[i];
    }, Math.round((length / originalLength) * time), originalLength);
  }

  function play(buffer, rate) {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = rate;
    source.connect(audioContext.destination);
    source.start();
  }

  function setLimitedInterval(func, time, iterations) {
    var i = 0;

    var id = setInterval(function() {
      func(i);
      i++;

      if (i === iterations) {
        clearInterval(id);
      }
    }, time);
  }

  function toAnimal(str) {
    temp = str.toLowerCase();

    temp = temp.replace('c', 'k');
    temp = temp.replace('q', 'k');
    temp = temp.replace('wh', 'w');
    temp = temp.replace('ph', 'f');
    temp = temp.replace('ch', 'C');
    temp = temp.replace('sh', 'S');
    temp = temp.replace('th', 'T');
    temp = temp.replace('oo', 'U');

    temp = temp.replace('.', '    ');
    temp = temp.replace(',', '    ');
    temp = temp.replace('!', '    ');
    temp = temp.replace('?', '    ');

    return temp;
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

  document.addEventListener('click', init);

});