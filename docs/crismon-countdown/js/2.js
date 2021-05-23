const grassTemplate = '<div onpointerenter="grassEnter(this);" onpointerleave="grassLeave(this);" class="grass-container"><img class="grass" src="res/grass.png" alt="grass"></div>';

document.querySelector('.grass-grid').innerHTML = grassTemplate.repeat(25);

grassReady = false;
firstTouch = true;

const before = document.querySelector('#before');
const after = document.querySelector('#after');

const scrolling = document.querySelector('.scrolling');

function grassEnter(element) {
  //console.log('entered!');
  //element.style.transform = 'scaleY(0.8)';
  element.childNodes[0].style.height = '15vw';

  if (firstTouch) {
    window.setTimeout(() => {
      grassReady = true;
    }, 6500);

    firstTouch = false;
  }

  if (grassReady) {
    console.log('cool shit');
    grassReady = false;

    document.querySelector('#music').play();

    //do next anim
    document.body.style.backgroundColor = '#000';
    before.style.opacity = '0';

    setTimeout(() => {
      before.style.display = 'none';
    }, 1000);

    setTimeout(() => {
      after.style.display = 'flex';
      document.body.style.backgroundColor = '#d5e7e8';
      after.style.opacity = '1';

      setTimeout(() => {
        scrolling.style.width = '100%';

        setTimeout(() => {
          scrolling.style.width = '0%';

          setTimeout(() => {
            scrolling.innerHTML = 'mery cristamAS!! hehe,ᶦ ˡᵒᵛᵉ ʸᵒᵘ!!';
            scrolling.style.width = '100%';

            //christmas delay
          }, 3000);

          //song end delete text delay
        }, 10000);

        //text appear delay
      }, 1000);

      //after appear delay
    }, 4000);
  }
}

function grassLeave(element) {
  //element.style.transform = '';
  element.childNodes[0].style.height = '20vw';
}

function jumpPokemon(pokemon) {
  pokemon.style.transform = 'translateY(-10px)';
}

function idlePokemon(pokemon) {
  pokemon.style.transform = 'translateY(0px)';
}