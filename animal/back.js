document.addEventListener('DOMContentLoaded', function(e) {

  const phonemes = ['a', 'e', 'i', 'o', 'u', 'b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'q', 'v', 'w', 'x', 'y', 'z', 'C', 'S', 'T', 'U'];
  const voicePath = 'res/voice/';

  var audioContext;
  var sounds;


  function init() {
    // inits context on click
    audioContext = new AudioContext();

    // loads sounds
    //loadInventory();

    addSound('res/voice/a.ogg', 'a');

    // prevents duplicate inits
    document.removeEventListener('click', init);

    //test = addSound('res/voice/a.ogg', 'a');

    document.addEventListener('click', function() {
      play(randSound(sounds), 2);
    });
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
      console.log(voicePath + file + '  ' + item);
    });

  }

  function randSound(object) {
    var keys = Object.keys(object);
    return object[keys[Math.floor(keys.length * Math.random())]];
  }

  function play(buffer, rate) {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = rate;
    source.connect(audioContext.destination);
    source.start();
  }

  document.addEventListener('click', init);

});