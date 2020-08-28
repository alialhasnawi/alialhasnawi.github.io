var ws;

var me;

var shouldSend = true;

var vid = document.querySelector('#player');
var enterURL = document.querySelector('#enter-url');

var joinStates = {
  create: document.querySelector('#j-create'),
  failed: document.querySelector('#j-failed'),
  loading: document.querySelector('#j-loading'),
  name: document.querySelector('#j-name')
};

var roomC = document.querySelector('#room-container');
var joinC = document.querySelector('#join-container');

var enterName = document.querySelector('#enter-name');

var welcomeTo = document.querySelector('#welcome-room');

var chatIn = document.querySelector('#chat-in');
var chatOut = document.querySelector('#chat-out');

var banner = document.querySelector('#banner-text');

var windowC = document.querySelector('#window-container');

cycleStates('create');

function cycleStates(next) {
  for (var state in joinStates) {
    if (state == next) {
      joinStates[state].style.display = 'flex';
    } else {
      joinStates[state].style.display = 'none';
    }
  }
}

function connect() {
  cycleStates('loading');

  ws = new WebSocket('wss://watchitwithme.herokuapp.com/');

  ws.addEventListener('error', () => {
    cycleStates('failed');
    window.setTimeout(() => {
      window.location.href = '/watch';
    }, 2000);
  })

  ws.addEventListener('open', () => {

    if (meeting) {
      ws.send(JSON.stringify({
        ask: 'exists',
        room: meeting
      }));
    } else {
      // create meeting code
      ws.send(JSON.stringify({
        ask: 'create',
        vLink: enterURL.value
      }));
    }

  });

  ws.addEventListener('message', ({
    data
  }) => {
    m = JSON.parse(data);

    switch (m.ask) {
      case 'ERROR':
        // error notification
        break;
      case 'inform':
        // message notification

        if (m.t !== '_IGNORE_') {
          let sender = '';

          if (m.h) {
            sender = (m.h === me ? 'You' : m.h);
          } else {
            sender = someone;
          }

          chatOut.innerHTML += `<div class="chat-item"><strong>${sender}</strong>${m.t}</div>`;
          chatOut.scrollTop = chatOut.scrollHeight;
        } else if (m.h == 'p') {
          ws.send(JSON.stringify({
            ask: 'p'
          }));
          console.log('ping!');
        }

        break;
      case 'created':
        // DISPLAY: REDIRECT TO ROOM
        window.location.href = `/watch/#${m.room}`;
        window.location.reload(false);

        break;
      case 'failed':
        // DISPLAY: FAILURE TO CREATE ROOM
        cycleStates('failed');
        window.setTimeout(() => {
          window.location.href = '/watch';
        }, 2000);

        break;
      case 'roomReal':
        cycleStates('name');
        welcomeTo.innerHTML = `<strong>Room #${meeting}</strong><br>` + welcomeTo.innerHTML;
        banner.innerHTML += '&nbsp;&nbsp;&nbsp; share this link:&nbsp;' + `<span id="share">${window.location.href}</span>`;

        // display enter name
        vid.onloadedmetadata = () => {
          windowC.style.height = `${75*(vid.videoHeight/vid.videoWidth)}vw`;
        }

        vid.src = m.src;
        vid.volume = 0.3;



        break;
      case 'roomFake':
        cycleStates('failed');
        window.setTimeout(() => {
          window.location.href = '/watch';
        }, 2000);

        break;
      case 'joined':
        joinC.style.display = 'none';
        roomC.style.display = 'flex';

        vid.currentTime = m.time;
        if (m.paused) {
          vid.pause();
        } else {
          vid.play();
        }

        break;
      case 'vid':

        if (m.paused && !vid.paused) {
          shouldSend = false;
          vid.pause();

        } else if (!m.paused && vid.paused) {
          shouldSend = false;
          vid.play();

        }

        if (Math.abs(vid.currentTime - m.time) > 1) {
          vid.currentTime = m.time;
        }

        break;
      default:
        console.log('---???');
    }
  });
}

vid.onseeked = () => {
  if (shouldSend) {
    ws.send(JSON.stringify({
      ask: 'roomE',
      r: meeting,
      e: 'vid',
      s: 'seek',
      name: me,
      time: vid.currentTime,
      paused: vid.paused
    }));
  }

  shouldSend = true;
}

vid.onplay = () => {
  if (shouldSend) {
    ws.send(JSON.stringify({
      ask: 'roomE',
      r: meeting,
      e: 'vid',
      s: 'play',
      name: me,
      time: vid.currentTime,
      paused: vid.paused
    }));
  }

  shouldSend = true;
}

vid.onpause = () => {
  if (shouldSend) {
    ws.send(JSON.stringify({
      ask: 'roomE',
      r: meeting,
      e: 'vid',
      s: 'pause',
      name: me,
      time: vid.currentTime,
      paused: vid.paused
    }));
  }

  shouldSend = true;
}

function say() {
  let msg = chatIn.value;

  // https://stackoverflow.com/questions/1981349/regex-to-replace-multiple-spaces-with-a-single-space
  msg = msg.replace(/\s\s+/g, ' ');

  if (msg && msg !== ' ') {
    ws.send(JSON.stringify({
      ask: 'roomE',
      r: meeting,
      e: 'chat',
      name: me,
      say: msg
    }));
  }

  chatIn.value = '';
}

function join() {
  cycleStates('loading');
  me = enterName.value.replace(/\s/g, '');

  ws.send(JSON.stringify({
    ask: 'roomE',
    r: meeting,
    e: 'join',
    name: me
  }));
}

if (meeting) {
  connect();
}