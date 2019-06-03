
const bucket = document.getElementById('bucket');
const eyedropper = document.getElementById('eyedropper');
const move = document.getElementById('move');
const transform = document.getElementById('transform');
const myCanvas = document.getElementById('canvas');
const save = document.getElementById('save');
const load = document.getElementById('load');

function toggleBucket() {
  bucket.classList.toggle('toggle');
  eyedropper.classList.remove('toggle');
  transform.classList.remove('toggle');
  move.classList.remove('toggle');
}

function toggleEyedropper() {
  eyedropper.classList.toggle('toggle');
  bucket.classList.remove('toggle');
  transform.classList.remove('toggle');
  move.classList.remove('toggle');
}

function toggleTransform() {
  transform.classList.toggle('toggle');
  bucket.classList.remove('toggle');
  eyedropper.classList.remove('toggle');
  move.classList.remove('toggle');
}

function toggleMove() {
  move.classList.toggle('toggle');
  bucket.classList.remove('toggle');
  eyedropper.classList.remove('toggle');
  transform.classList.remove('toggle');
}

function keyToggleBucket(e) {
  if (e.which === 66) {
    toggleBucket();
  }
}

function keyToggleMove(e) {
  if (e.which === 77) {
    toggleMove();
  }
}

function keyToggleTransform(e) {
  if (e.which === 84) {
    toggleTransform();
  }
}

function keyToggleEyedropper(e) {
  if (e.which === 67) {
    toggleEyedropper();
  }
}

bucket.addEventListener('click', toggleBucket);
eyedropper.addEventListener('click', toggleEyedropper);
transform.addEventListener('click', toggleTransform);
move.addEventListener('click', toggleMove);
document.addEventListener('keyup', keyToggleBucket);
document.addEventListener('keyup', keyToggleMove);
document.addEventListener('keyup', keyToggleEyedropper);
document.addEventListener('keyup', keyToggleTransform);

// function fillCanvas() {
//   // let curFrame = document.querySelector(`.frame[data-is-active="1"]`);
//   let curFrameCanvas = document.querySelector(`.frame[data-is-active="1"] #frame-canvas`)
//   let curCtx = curFrameCanvas.getContext('2d');
//   ctx.fillStyle = getComputedStyle(curColor).backgroundColor;
//   ctx.fillRect(300,0,50,50)
//   curCtx.drawImage(mainCanvas, 0, 0, 96,96);
//   // e.target.style.backgroundColor = getComputedStyle(curColor).backgroundColor;
// }

// function chooseColor(e) {
//   let neededBackgroundColor;
//   let tempCurColor;
//   let bubble = e.target;
//   do {
//     if (getComputedStyle(bubble).backgroundColor !== 'rgba(0, 0, 0, 0)') {
//       neededBackgroundColor = getComputedStyle(bubble).backgroundColor;
//     } else {
//       bubble = bubble.parentNode;
//     }
//   }
//   while (!neededBackgroundColor);
//   if (eyedropper.classList.contains('toggle') && !e.target.classList.contains('eyedropper')) {
//     tempCurColor = getComputedStyle(curColor).backgroundColor;
//     curColor.style.backgroundColor = neededBackgroundColor;
//     prevColor.style.backgroundColor = tempCurColor;
//   }
// }
// mainCanvas.addEventListener('click', fillCanvas);
// document.addEventListener('click', chooseColor);


function saveIt() {
  let canvElems = myCanvas.children;
  canvElems = Array.prototype.slice.call(canvElems);
  canvElems.forEach((item, i) => {
    ({
      // eslint-disable-next-line no-undef
      backgroundColor: bc,
      // eslint-disable-next-line no-undef
      top: tp,
      // eslint-disable-next-line no-undef
      left: lt,
      // eslint-disable-next-line no-undef
      borderRadius: br,
    } = getComputedStyle(canvElems[i]));

    // eslint-disable-next-line no-undef
    localStorage.setItem(`${canvElems[i].id}props`, `${bc}; ${tp}; ${lt}; ${br}`);
  });
}

function loadIt() {
  let i;
  let storedProps;
  for (i = 0; i < myCanvas.children.length; i += 1) {
    if (localStorage.getItem(`${myCanvas.children[i].id}props`)) {
      storedProps = localStorage.getItem(`${myCanvas.children[i].id}props`).split('; ');
      myCanvas.children[i].style.backgroundColor = `${storedProps[0]}`;
      myCanvas.children[i].style.top = `${storedProps[1]}`;
      myCanvas.children[i].style.left = `${storedProps[2]}`;
      myCanvas.children[i].style.borderRadius = `${storedProps[3]}`;
    }
  }
}

save.addEventListener('click', saveIt);
load.addEventListener('click', loadIt);
// eslint-disable-next-line import/prefer-default-export
// export default { eyedropper };
