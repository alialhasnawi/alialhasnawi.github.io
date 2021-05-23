const a1 = document.querySelector('#a1');
const a2 = document.querySelector('#a2');
const a3 = document.querySelector('#a3');

const i1 = document.querySelector('#i1');
const i2 = document.querySelector('#i2');
const i3 = document.querySelector('#i3');

const goal1 = new Date(2020, 11, 24, 20, 0, 0, 0).getTime();
const goal2 = new Date(2020, 11, 24, 20, 30, 0, 0).getTime();
const goal3 = new Date(2020, 11, 24, 21, 0, 0, 0).getTime();

let interval = setInterval(() => {

  var now = new Date().getTime();

  var d1 = goal1 - now;

  var d2 = goal2 - now;
  var d3 = goal3 - now;

  var hr1 = Math.floor(d1 / (1000 * 60 * 60));
  var min1 = Math.floor((d1 % (1000 * 60 * 60)) / (1000 * 60));
  var sec1 = Math.floor((d1 % (1000 * 60)) / 1000);

  var hr2 = Math.floor(d2 / (1000 * 60 * 60));
  var min2 = Math.floor((d2 % (1000 * 60 * 60)) / (1000 * 60));
  var sec2 = Math.floor((d2 % (1000 * 60)) / 1000);

  var hr3 = Math.floor(d3 / (1000 * 60 * 60));
  var min3 = Math.floor((d3 % (1000 * 60 * 60)) / (1000 * 60));
  var sec3 = Math.floor((d3 % (1000 * 60)) / 1000);

  if (d1 < 0) {
    i1.innerHTML = 'ready!!';
    a1.href = 'qwedsazxcvfr.html';
  } else {
    i1.innerHTML = `${hr1}:${min1<10 ? '0': ''}${min1}:${sec1<10 ? '0': ''}${sec1}`;
  }

  if (d2 < 0) {
    i2.innerHTML = 'ready!!';
    a2.href = 'asdkjhskajdiuhue.html';
  } else {
    i2.innerHTML = `${hr2}:${min2<10 ? '0': ''}${min2}:${sec2<10 ? '0': ''}${sec2}`;
  }

  if (d3 < 0) {
    i3.innerHTML = 'ready!!';
    a3.href = 'iijijijiijiijaiia.html';
  } else {
    i3.innerHTML = `${hr3}:${min3<10 ? '0': ''}${min3}:${sec3<10 ? '0': ''}${sec3}`;
  }

  if ((d1 < 0) && (d2 < 0) && (d3 < 0)) {
    clearInterval(interval);
  }


}, 1000);