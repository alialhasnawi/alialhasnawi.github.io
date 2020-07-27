document.addEventListener('DOMContentLoaded', function(e) {
  const synth = new Tone.Sampler({
    urls: {
      "D5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/guitar-electric/C4.mp3",
    },
    baseUrl: ""
  }).toDestination();
  // synth = new Tone.Synth().toDestination();

  const staff = ['D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'C5', 'C5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'B4', 'B4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'A#4', 'A#4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'C5', 'C5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'B4', 'B4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'A#4', 'A#4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D6', 'D6', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'C6', 'C6', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'B5', 'B5', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'A#5', 'A#5', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'D6', 'D6', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'C6', 'C6', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'B5', 'B5', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'A#5', 'A#5', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'F6', 'F6', 'F6', 'F6', 'F6', 'D6', 'D6', 'F6', 'F6', 'F6', 'G6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'F6', 'F6', 'F6', 'G6', 'G#6', 'A6', 'C7', 'A6', 'D7', 'D7', 'D7', 'A6', 'D7', 'C7', 'F6', 'F6', 'A6', 'A6', 'F6', 'A6', 'F6', 'A6', 'F6', 'A6', 'D6', 'G6', 'D6', 'G6', 'A6', 'F6', 'A6', 'A6', 'F6', 'A6', 'F6', 'A6', 'D6', 'G6', 'F6', 'A6', 'A6', 'D7', 'F6', 'A6', 'G6', 'G6', 'D7', 'F6', 'A6', 'F6', 'G6', 'D6', 'F6', 'D6', 'F6', 'C7', 'F6', 'F6', 'D6', 'D6', 'D6', 'E6', 'A#5', 'C6', 'D6', 'F6', 'A#5', 'C6', 'C7', 'E6', 'F6', 'D6', 'F6', 'G6', 'G#6', 'G6', 'F6', 'D6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'C6', 'G#6', 'A6', 'C7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'E6', 'F6', 'G6', 'A6', 'C7', 'C#7', 'C#7', 'G#6', 'G#6', 'G6', 'F6', 'G6', 'D#6', 'F5', 'G5', 'F5', 'A5', 'F6', 'C6', 'E6', 'A5', 'A5', 'E6', 'G5', 'A5', 'F6', 'C6', 'G6', 'A5', 'A5', 'A6', 'D6', 'A6', 'G#6', 'G6', 'F#6', 'F6', 'E6', 'D#6', 'D6', 'C#6', 'C#6', 'A#5', 'D#6', 'F6', 'D6', 'F6', 'G6', 'G#6', 'G6', 'F6', 'D6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'G6', 'G#6', 'A6', 'C7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'E6', 'F6', 'G6', 'A6', 'C7', 'C#7', 'C#6', 'G#6', 'G#6', 'G6', 'F6', 'G6', 'D#6', 'F5', 'G5', 'F5', 'A5', 'F6', 'C6', 'E6', 'A5', 'A5', 'E6', 'G5', 'A5', 'F6', 'C6', 'G6', 'A5', 'A5', 'A6', 'D6', 'A6', 'G#6', 'G6', 'F#6', 'F6', 'E6', 'D#6', 'D6', 'C#6', 'G#5', 'A#5', 'A#5', 'A#4', 'F5', 'E5', 'D5', 'F5', 'A#4', 'F5', 'E5', 'D5', 'D5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'C5', 'C5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'B4', 'B4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'B4', 'B4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'C5', 'C5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D6', 'D6', 'A5', 'E6', 'G#5', 'G#5', 'G5', 'E6', 'F5', 'F5', 'C5', 'A5', 'E5', 'C6', 'D6', 'F5', 'D6', 'D6', 'E6', 'A5', 'G#5', 'G#5', 'E6', 'G5', 'F5', 'F5', 'A5', 'C5', 'E5', 'C6', 'F5', 'D6', 'A#5', 'A#5', 'F5', 'A#5', 'A#5', 'F5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'F5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'G5', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'D6', 'A5', 'G#5', 'C#6', 'C#6', 'G#5', 'G#5', 'C#6', 'C#6', 'G#5', 'G#5', 'G#5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'C6', 'G5', 'G5', 'B5', 'B5', 'G5', 'G5', 'B5', 'B5', 'G5', 'G5', 'G5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'F5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'G5', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'A5', 'A5', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'A5', 'A5', 'A#5', 'A#5', 'F5', 'A#5', 'A#5', 'F5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'F5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'G5', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'D6', 'A5', 'G#5', 'C#6', 'C#6', 'G#5', 'G#5', 'C#6', 'C#6', 'G#5', 'G#5', 'G#5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'C6', 'G5', 'G5', 'B5', 'B5', 'G5', 'G5', 'B5', 'B5', 'G5', 'G5', 'G5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'F5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'G5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'A#4', 'A#4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'C5', 'C5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5'];

  var whiteKeys = document.getElementsByClassName('white-key');
  var blackKeys = document.getElementsByClassName('black-key');
  var ness = document.getElementsByClassName('sans-gaming');

  var gaming = 0;

  async function attack() {
    if (gaming === 4) {
      for (var i = 0; i < ness.length; i++) {
        ness[i].style.animationPlayState = 'running';
      }
    } else if (gaming === 42) {
      for (var i = 0; i < whiteKeys.length; i++) {
        whiteKeys[i].style.animationPlayState = 'running';
      }

      for (var i = 0; i < blackKeys.length; i++) {
        blackKeys[i].style.animationPlayState = 'running';
      }
    }

    await Tone.start();

    console.log(gaming);
    synth.triggerAttack(staff[gaming], '+0', 0.1);
    gaming++;
  }

  function release() {
    synth.triggerRelease('4n');
  }

  for (var i = 0; i < whiteKeys.length; i++) {
    whiteKeys[i].addEventListener('mousedown', attack);
    whiteKeys[i].addEventListener('mouseup', release);
    whiteKeys[i].innerHTML += '<img class="sans-gaming" src="snans.png" draggable="false">';
  }

  for (var i = 0; i < blackKeys.length; i++) {
    blackKeys[i].addEventListener('mousedown', attack);
    blackKeys[i].addEventListener('mouseup', release);
    blackKeys[i].innerHTML += '<img class="sans-gaming" src="snans.png" draggable="false">';
  }

  console.log('HIYA');

});