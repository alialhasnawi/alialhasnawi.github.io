const staff = ['D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'C5', 'C5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'B4', 'B4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'A#4', 'A#4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'C5', 'C5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'B4', 'B4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'A#4', 'A#4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D6', 'D6', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'C6', 'C6', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'B5', 'B5', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'A#5', 'A#5', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'D6', 'D6', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'C6', 'C6', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'B5', 'B5', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'A#5', 'A#5', 'D7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'F6', 'F6', 'F6', 'F6', 'F6', 'D6', 'D6', 'F6', 'F6', 'F6', 'G6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'F6', 'F6', 'F6', 'G6', 'G#6', 'A6', 'C7', 'A6', 'D7', 'D7', 'D7', 'A6', 'D7', 'C7', 'F6', 'F6', 'A6', 'A6', 'F6', 'A6', 'F6', 'A6', 'F6', 'A6', 'D6', 'G6', 'D6', 'G6', 'A6', 'F6', 'A6', 'A6', 'F6', 'A6', 'F6', 'A6', 'D6', 'G6', 'F6', 'A6', 'A6', 'D7', 'F6', 'A6', 'G6', 'G6', 'D7', 'F6', 'A6', 'F6', 'G6', 'D6', 'F6', 'D6', 'F6', 'C7', 'F6', 'F6', 'D6', 'D6', 'D6', 'E6', 'A#5', 'C6', 'D6', 'F6', 'A#5', 'C6', 'C7', 'E6', 'F6', 'D6', 'F6', 'G6', 'G#6', 'G6', 'F6', 'D6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'C6', 'G#6', 'A6', 'C7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'E6', 'F6', 'G6', 'A6', 'C7', 'C#7', 'C#7', 'G#6', 'G#6', 'G6', 'F6', 'G6', 'D#6', 'F5', 'G5', 'F5', 'A5', 'F6', 'C6', 'E6', 'A5', 'A5', 'E6', 'G5', 'A5', 'F6', 'C6', 'G6', 'A5', 'A5', 'A6', 'D6', 'A6', 'G#6', 'G6', 'F#6', 'F6', 'E6', 'D#6', 'D6', 'C#6', 'C#6', 'A#5', 'D#6', 'F6', 'D6', 'F6', 'G6', 'G#6', 'G6', 'F6', 'D6', 'G#6', 'G6', 'F6', 'D6', 'F6', 'G6', 'G6', 'G#6', 'A6', 'C7', 'A6', 'G#6', 'G6', 'F6', 'D6', 'E6', 'F6', 'G6', 'A6', 'C7', 'C#7', 'C#6', 'G#6', 'G#6', 'G6', 'F6', 'G6', 'D#6', 'F5', 'G5', 'F5', 'A5', 'F6', 'C6', 'E6', 'A5', 'A5', 'E6', 'G5', 'A5', 'F6', 'C6', 'G6', 'A5', 'A5', 'A6', 'D6', 'A6', 'G#6', 'G6', 'F#6', 'F6', 'E6', 'D#6', 'D6', 'C#6', 'G#5', 'A#5', 'A#5', 'A#4', 'F5', 'E5', 'D5', 'F5', 'A#4', 'F5', 'E5', 'D5', 'D5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'C5', 'C5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'B4', 'B4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'B4', 'B4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'C5', 'C5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D6', 'D6', 'A5', 'E6', 'G#5', 'G#5', 'G5', 'E6', 'F5', 'F5', 'C5', 'A5', 'E5', 'C6', 'D6', 'F5', 'D6', 'D6', 'E6', 'A5', 'G#5', 'G#5', 'E6', 'G5', 'F5', 'F5', 'A5', 'C5', 'E5', 'C6', 'F5', 'D6', 'A#5', 'A#5', 'F5', 'A#5', 'A#5', 'F5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'F5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'G5', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'D6', 'A5', 'G#5', 'C#6', 'C#6', 'G#5', 'G#5', 'C#6', 'C#6', 'G#5', 'G#5', 'G#5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'C6', 'G5', 'G5', 'B5', 'B5', 'G5', 'G5', 'B5', 'B5', 'G5', 'G5', 'G5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'F5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'G5', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'A5', 'A5', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'A5', 'A5', 'A#5', 'A#5', 'F5', 'A#5', 'A#5', 'F5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'F5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'G5', 'D6', 'A5', 'A5', 'D6', 'D6', 'A5', 'D6', 'A5', 'G#5', 'C#6', 'C#6', 'G#5', 'G#5', 'C#6', 'C#6', 'G#5', 'G#5', 'G#5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'C6', 'G5', 'G5', 'B5', 'B5', 'G5', 'G5', 'B5', 'B5', 'G5', 'G5', 'G5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'A#5', 'A#5', 'F5', 'F5', 'F5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'C6', 'C6', 'G5', 'G5', 'G5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'A#4', 'A#4', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'C5', 'C5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5', 'D5', 'D5', 'D6', 'A5', 'G#5', 'G5', 'F5', 'D5', 'F5', 'G5'];

const naturals = [5, 6, 7, 8, 9, 10, 11, 17, 18, 19, 20, 21, 22, 23, 29, 30, 31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 46, 47];
const sharps = [0, 1, 2, 3, 4, 12, 13, 14, 15, 16, 24, 25, 26, 27, 28, 36, 37, 38, 39, 40];
const keyKeys = [0, 0, 1, 1, 2, 3, 2, 4, 3, 5, 4, 6];

const message = 'OMG GUISE IT S SANS GAMING H E S GO N N A H A V E A B A D T I M E Heya. You\'ve been busy, huh? So, i\'ve got a question for ya. Do you think even the worst person can change. . . ? That everybody can be a good person, if they just try? Heh heh heh he. . . All right. Well here\'s a better question. Do you wanna have a bad time? \'Cause if you take another step forward. . . You are REALLY not going to like what happens next. Welp. Sorry, old lady This is why i never make promises. It\'s a beautiful day outside. Birds are singing, flowers are blooming. . . On days like these, kids like you. . . Should be burning in hell. Huh. Always wondered why people never use their strongest attack first. What? You think im just gonna stand there and take it? Our reports showed a massive anomaly in the timespace continuum. Timelines jumping left and right, stopping and starting. . . Until suddenly, everything ends. Heh heh heh. . . That\'s your fault, isn\'t it? You can\'t understand how this feels. Knowing that one day, without any warning. . . It\'s all going to be reset. Look. I gave up trying to go back a long time ago. And getting to the surface doesn\'t really appeal anymore, either. Cause even if we do. . . We\'ll just end up right back here, without any memory of it, right? To be blunt. . . It makes it kind of hard to give it my all. . . . Or is that just a poor excuse for being lazy. . . ? Hell if i know. All i know is. . . Seeing what comes next. . . I can\'t afford not to care anymore. Ugh. . . That being said. . . You, uh, really like swinging that thing around, huh? Listen. I know you didn\'t answer me before, but. . . Somewhere in there. I can feel it. There\'s a glimmer of a good person inside of you. The memory of someone who once wanted to do the right thing. Someone who, in anothee time, might have even been. . . A friend? C\'mon, buddy. Do you remember me? Please, of you\'re listening. . . Let\'s forget all this, ok? Just lay down your weapon, and . . . Well, my job will be alot easier. Welp, it was worth a shot. Guess you like doing things the hard way, huh? Sounds strange, but before all this i was secretly hoping we could be friends. I always thought the anomaly was doing all this cause they were unhappy. And when they got what they wanted, they would stop all this. And maybe all they needed was. . . I dunno. Some good food, some bad laughs, some nice friends. But that\'s rediculous, right? Yeah, you\'re the type or person who won\'t EVER be happy. You\'ll keep cosuming timelines over and over, until. . . Well. Hey. Take it from me, kid. Someday. . . You gotta learn when to QUIT. And that day\'s TODAY. Cause. . . Y\'see. . All this fighting is really tiring me out. And if you keep pushing me. . . Then i\'ll be forced to use my special attack. Yeah. My special attack. Sound familiar? Well. Get ready. Cause after the next move, i\'m going to use it. So if you don\'t wanna see it, now would be a good time to die. Well. Here goes nothing. . . Are you ready? Survive this, and i\'ll show you my special attack! Huff. . . Puff. . . All right. That\'s it. It\'s time for m POG the text ran out of room Are you ready? Here goes nothing. Yep. That\'s right. It\'s literally nothing. And its not gonna be anything, either. Heh heh heh. . . Ya get it? I know i can\'t beat you. One of your turns. . . You\'re just gonna kill me. So, uh. I\'ve decided. . . It\'s not going to BE your turn, ever. I\'m just gonna keep having MY turn until you give up. Evan if it means we have to stand here until the end of time. Capiche? You\'ll get bored here. If you haven\'t gotten bored already, i mean. And then you\'ll finally quit. I know your type. You\'re, uh, vety determined, aren\'t you? You\'ll never give up, evan if there\'s, uh. . . Absolutely NO benefit to perservering whatsoever. If i can make that clear. No matter what, you\'ll just keep going. Not out of any desire for good or evil. . . But just because you think you can. And bwcause you "can". . . . . . You "have to." But now, you\'ve reached the end. There is nothing left for you now. So, uh, in my personal opinion. . . The most "determind" thing you can do here? Is to, uh, completely give up. And. . . (Yawn) do literally anything else. Heh, didja really think you would be able- So. . . Guess thats it, huh? Just. . . Don\'t say i diddn\'t warn you. Well. I\'m going to grillby\'s. Papyrus, do you want anything?';

const endText = ["congrats on wasting", "seconds of your life :)"]

var gaming = 0;
var heartV = [0, 0];

var mouseX;
var mouseY;

var timeCounter = Date.now();

var tempInterval;

function pp() {
  gaming = 130;
}

function game(param) {
  gaming = param;
}

document.addEventListener('DOMContentLoaded', function(e) {
  const synth = new Tone.Sampler({
    urls: {
      "D5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/guitar-electric/C4.mp3",
    },
    baseUrl: ""
  }).toDestination();

  var voice = new Audio('voice.wav');
  voice.volume = 0.4;

  var whiteKeys = document.getElementsByClassName('white-key');
  var blackKeys = document.getElementsByClassName('black-key');
  var ness = document.getElementsByClassName('sans-gaming');
  var allKeys = [];
  var heart = document.getElementsByClassName('heart')[0];

  var textBG = document.getElementsByClassName('text-background')[0];

  document.onmousemove = function(e) {
    if (gaming < 795) {

      mouseX = e.pageX;
      mouseY = e.pageY;

      if (mouseX < (0.03 * window.innerWidth + 16)) {
        mouseX = 0.03 * window.innerWidth + 16;
      } else if (mouseX > (0.97 * window.innerWidth - 16)) {
        mouseX = 0.97 * window.innerWidth - 16;
      }

      if (mouseY < (0.5 * window.innerHeight + 21)) {
        mouseY = 0.5 * window.innerHeight + 21;
      } else if (mouseY > (0.5 * window.innerHeight + 300 - 25)) {
        mouseY = 0.85 * window.innerHeight - 14;
      }

      heart.style.left = (mouseX - 16).toString() + 'px';
      heart.style.top = (mouseY - 16).toString() + 'px';
    }
  }

  for (var i = 0; i < 4; i++) {
    allKeys.push(whiteKeys[7 * i + keyKeys[0]]);
    allKeys.push(blackKeys[5 * i + keyKeys[1]]);
    allKeys.push(whiteKeys[7 * i + keyKeys[2]]);
    allKeys.push(blackKeys[5 * i + keyKeys[3]]);
    allKeys.push(whiteKeys[7 * i + keyKeys[4]]);
    allKeys.push(whiteKeys[7 * i + keyKeys[5]]);
    allKeys.push(blackKeys[5 * i + keyKeys[6]]);
    allKeys.push(whiteKeys[7 * i + keyKeys[7]]);
    allKeys.push(blackKeys[5 * i + keyKeys[8]]);
    allKeys.push(whiteKeys[7 * i + keyKeys[9]]);
    allKeys.push(blackKeys[5 * i + keyKeys[10]]);
    allKeys.push(whiteKeys[7 * i + keyKeys[11]]);
  }

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
    } else if (gaming > 79 && gaming < 108) {
      ness[naturals[gaming - 80]].src = "snens.png";
    } else if (gaming > 107 && gaming < 128) {
      ness[sharps[gaming - 108]].src = "snens.png";
    } else if (gaming === 130) {
      for (var i = 0; i < whiteKeys.length; i++) {
        whiteKeys[i].removeEventListener('mousedown', attack);
        whiteKeys[i].removeEventListener('mouseup', release);
      }

      for (var i = 0; i < blackKeys.length; i++) {
        blackKeys[i].removeEventListener('mousedown', attack);
        blackKeys[i].removeEventListener('mouseup', release);
      }

      sansInterval = window.setInterval(sansLoop, 110);

      return;
    }

    await Tone.start();

    synth.triggerAttack(staff[gaming], '+0', 0.1);
    gaming++;
  }

  function release() {
    synth.triggerRelease('4n');
  }

  function sansLoop() {
    synth.triggerRelease();
    if (gaming < staff.length) {
      synth.triggerAttack(staff[gaming], '+0', 0.110);
      gaming++;
    }

    if (gaming === 134) {
      document.body.style.animationPlayState = 'running';
    } else if (gaming === 140) {
      document.getElementsByClassName('board')[0].style.border = '5px solid #FFFFFF';
      document.getElementsByClassName('board')[0].style.borderRadius = '2px';

      heart.style.display = 'inline';
      document.body.style.cursor = 'none';

      for (var i = 0; i < allKeys.length; i++) {
        allKeys[i].style.boxShadow = 'none';
      }
    } else if (gaming > 140 && gaming < 165) {
      allKeys[2 * (gaming - 141)].style.backgroundColor = 'transparent';
      allKeys[2 * (gaming - 141)].style.borderStyle = 'none';

      allKeys[2 * (gaming - 141) + 1].style.backgroundColor = 'transparent';
      allKeys[2 * (gaming - 141) + 1].style.borderStyle = 'none';
    } else if (gaming === 165) {
      document.getElementsByClassName('menu')[0].style.animationPlayState = 'running';
      document.getElementsByClassName('gamer')[0].style.animationPlayState = 'running';
    } else if (gaming > 170 && gaming < 795) {
      textBG.innerHTML += (message[5 * (gaming - 171)] + message[5 * (gaming - 171) + 1] + message[5 * (gaming - 171) + 2] + message[5 * (gaming - 171) + 3] + message[5 * (gaming - 171) + 4]);
    } else if (gaming == 795) {
      heart.style.animationPlayState = 'running';
      document.getElementsByClassName('text-background')[0].style.display = 'none';
      document.getElementsByClassName('gamer')[0].style.display = 'none';
      document.getElementsByClassName('board')[0].style.display = 'none';
      document.getElementsByClassName('menu')[0].style.display = 'none';

      gaming++;

      setTimeout(function() {
        window.clearInterval(sansLoop);

        var determination = new Audio('ending.mp3');
        determination.volume = 0.2;
        determination.play();

        window.setTimeout(function() {
          document.getElementById('first-end').style.display = 'none';
          document.getElementById('timer').style.display = 'none';
          document.getElementById('second-end').style.display = 'none';
          document.getElementById('extra').style.display = 'none';
          heart.style.display = 'none';
          window.clearInterval(tempInterval);

          window.setTimeout(function() {
            new Audio('f.mp3').play();
          }, 1000);

          window.setTimeout(function() {
            document.getElementById('first-end').innerHTML = 'ok u can close me now...';
            document.getElementById('first-end').style.display = 'flex';
          }, 8000);

        }, 50000);

        gaming = 1000;

        window.setInterval(endLoop, 200);
      }, 4000);

    }
  }

  function endLoop() {
    if (gaming < (1000 + endText[0].length)) {
      document.getElementById('first-end').innerHTML += endText[0][gaming - 1000];
      voice.play();
      gaming++;
    } else if (gaming === 1000 + endText[0].length) {
      gaming++;
      timeCounter = Math.round((Date.now() - timeCounter) / 1000);
      document.getElementById('timer').innerHTML = timeCounter;
      tempInterval = window.setInterval(function() {
        timeCounter++;
        document.getElementById('timer').innerHTML = timeCounter.toString();
      }, 1000);

    } else if (gaming > (1000 + endText[0].length) && gaming <= (1000 + endText[0].length + endText[1].length)) {
      gaming++;
      document.getElementById('second-end').innerHTML += endText[1][gaming - (1000 + endText[0].length + 2)];
      voice.play();
    } else if (gaming === (1001 + endText[0].length + endText[1].length)) {
      window.setTimeout(function() {
        document.getElementById('extra').innerHTML = 'might as well wait until the song finishes uwu';
      }, 4000);

      gaming++;
      window.clearInterval(endLoop);
    }
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

});