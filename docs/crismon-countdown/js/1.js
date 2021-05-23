var fingyCount = 0;

window.addEventListener('pointerup', (e) => {
  if (fingyCount < 7) {
    console.log(`${e.clientX}, ${e.clientY}, ${e.twist}`);

    const chicken = document.createElement('div');
    chicken.className = 'chicken';
    const thumb = document.createElement('img');
    thumb.className = 'thumb';
    thumb.src = `res/fingy${fingyCount}.png`;

    fingyCount++;

    chicken.appendChild(thumb);

    chicken.style.transform = `translate(${e.clientX}px, ${e.clientY}px) rotate(${e.twist}deg)`;

    document.body.appendChild(chicken);

    if (fingyCount === 7) {
      document.querySelector('#crackheads').style.display = 'flex';
    }
  }
});