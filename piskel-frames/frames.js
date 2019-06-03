const curColor = document.querySelector('.color-icon.current');
const prevColor = document.querySelector('.color-icon.prev');
let curCopyBtn;
let curDelBtn;
let curFrame;
const frameList = document.querySelector('.frame-list');
const addFrameBtn = document.querySelector('.add-frame');
const mainCanvas = document.getElementById('main-canvas');
const ctx = mainCanvas.getContext('2d');
let activeFrameCtx;
const dataUrls = [mainCanvas.toDataURL()];

function visibleBtns(e) {
  const i = e.target.dataset.curFrameNum;
  curCopyBtn = document.querySelector(`.frame-copy[data-cur-frame-num="${i}"]`);
  curDelBtn = document.querySelector(`.frame-del[data-cur-frame-num="${i}"]`);
  curFrame = document.querySelector(`.frame[data-cur-frame-num="${i}"]`);
  curCopyBtn.style.visibility = 'visible';
  curCopyBtn.style.cursor = 'pointer';
  curDelBtn.style.visibility = 'visible';
  curDelBtn.style.cursor = 'pointer';

  function invisibleBtns() {
    curCopyBtn.style.visibility = 'hidden';
    curCopyBtn.style.cursor = 'default';
    curDelBtn.style.visibility = 'hidden';
    curDelBtn.style.cursor = 'default';
  }

  curFrame.addEventListener('mouseleave', invisibleBtns);
}

function delFrame(e) {
  const i = e.target.dataset.curFrameNum;
  curFrame = document.querySelector(`.frame[data-cur-frame-num="${+i}"]`);
  if (+i === frameList.children.length - 1 && +i === 1) return;
  if (e.target === document.querySelector(`.frame-del[data-cur-frame-num="${i}"]`)) {
    if (curFrame.dataset.isActive === '1' && +i !== frameList.children.length - 1) {
      document.querySelector(`.frame[data-cur-frame-num="${+i + 1}"]`).dataset.isActive = '1';
      ctx.clearRect(0, 0, 384, 384);
      const img = new Image();
      img.onload = function render() {
        ctx.drawImage(img, 0, 0);
      };
      img.src = dataUrls[+i];
    }

    if (curFrame.dataset.isActive === '1' && +i === frameList.children.length - 1) {
      document.querySelector(`.frame[data-cur-frame-num="${+i - 1}"]`).dataset.isActive = '1';
      ctx.clearRect(0, 0, 384, 384);
      const img = new Image();
      img.onload = function go() {
        ctx.drawImage(img, 0, 0);
      };
      img.src = dataUrls[+i - 2];
    }

    frameList.removeChild(curFrame);
    dataUrls.splice(+i - 1, 1);
    for (let j = 0; j < frameList.children.length - 1; j += 1) {
      frameList.children[j].dataset.curFrameNum = `${j + 1}`;
      const temp = [].slice.call(frameList.children[j].children);
      temp.forEach((child) => {
        // eslint-disable-next-line no-param-reassign
        child.dataset.curFrameNum = `${j + 1}`;
      });
      document.querySelector(`.frame-number[data-cur-frame-num="${j + 1}"]`).innerHTML = `${j + 1}`;
    }
  }
}

function copyFrame(e) {
  const i = e.target.dataset.curFrameNum;
  const sourceFrame = document.querySelector(`.frame[data-cur-frame-num="${i}"]`);
  const sourceFrameCanvas = document.querySelector(`.frame[data-cur-frame-num="${i}"] #frame-canvas`);
  if (e.target === document.querySelector(`.frame-copy[data-cur-frame-num="${i}"]`)) {
    const sourceFrameCopy = sourceFrame.cloneNode(true);
    frameList.insertBefore(sourceFrameCopy, sourceFrame);
    for (let j = 0; j < frameList.children.length - 1; j += 1) {
      frameList.children[j].dataset.curFrameNum = `${j + 1}`;
      const temp = [].slice.call(frameList.children[j].children);
      temp.forEach((child) => {
        // eslint-disable-next-line no-param-reassign
        child.dataset.curFrameNum = `${j + 1}`;
      });
      document.querySelector(`.frame-number[data-cur-frame-num="${j + 1}"]`).innerHTML = `${j + 1}`;
    }
    document.querySelector('.frame[data-is-active="1"]').dataset.isActive = '0';
    document.querySelector(`.frame[data-cur-frame-num="${i}"]`).dataset.isActive = '0';
    document.querySelector(`.frame[data-cur-frame-num="${+i + 1}"]`).dataset.isActive = '1';

    const newFrameCanvas = document.querySelector(`.frame[data-cur-frame-num="${i}"] #frame-canvas`);
    const newFrameCtx = newFrameCanvas.getContext('2d');
    newFrameCtx.drawImage(sourceFrameCanvas, 0, 0);
    dataUrls.splice(+i - 1, 0, dataUrls[+i - 1]);
    ctx.clearRect(0, 0, 384, 384);
    const img = new Image();
    img.onload = function render() {
      ctx.drawImage(img, 0, 0);
    };
    img.src = dataUrls[+i - 1];
  }
}

function addNewFrame() {
  const newFrame = document.createElement('li');
  newFrame.className = 'frame';
  newFrame.dataset.curFrameNum = `${frameList.children.length}`;
  newFrame.dataset.isActive = '0';
  newFrame.innerHTML = `<button class="frame-del" data-cur-frame-num="${frameList.children.length}"></button>
  <button class="frame-copy" data-cur-frame-num="${frameList.children.length}"></button>
  <button class="frame-number" data-cur-frame-num="${frameList.children.length}">${frameList.children.length}</button>
  <button class="frame-swap" data-cur-frame-num="${frameList.children.length}">
  </button><div class="background" data-cur-frame-num="${frameList.children.length}"></div>
  <canvas id="frame-canvas" class="canvas-frame" width="96" height="96" data-cur-frame-num="${frameList.children.length}"></canvas>`;
  frameList.insertBefore(newFrame, addFrameBtn);
  ctx.clearRect(0, 0, 384, 384);
  dataUrls.push(mainCanvas.toDataURL());
}

function setActiveFrame(e) {
  const i = e.target.dataset.curFrameNum;
  if (e.target === document.querySelector(`.frame-del[data-cur-frame-num="${i}"]`)) {
    return;
  }
  if (+i >= 0 && e.target !== document.querySelector(`.frame-del[data-cur-frame-num="${i}"]`)) {
    document.querySelector('.frame[data-is-active="1"]').dataset.isActive = '0';
    document.querySelector(`.frame[data-cur-frame-num="${+i}"]`).dataset.isActive = '1';
    ctx.clearRect(0, 0, 384, 384);
    const img = new Image();
    img.onload = function go() {
      ctx.drawImage(img, 0, 0);
    };
    img.src = dataUrls[+i - 1];
  }
}

addFrameBtn.addEventListener('mouseup', addNewFrame);
frameList.addEventListener('mouseup', delFrame);
frameList.addEventListener('mouseup', copyFrame);
frameList.addEventListener('mouseover', visibleBtns);
frameList.addEventListener('click', setActiveFrame);


function drawOnCanvas() {
  if (document.getElementById('bucket').classList.contains('toggle')) {
    const activeFrameCanvas = document.querySelector('.frame[data-is-active="1"] #frame-canvas');
    activeFrameCtx = activeFrameCanvas.getContext('2d');

    ctx.fillStyle = getComputedStyle(curColor).backgroundColor;
    ctx.fillRect(80, 0, 50, 50);
    dataUrls[activeFrameCanvas.dataset.curFrameNum - 1] = mainCanvas.toDataURL();

    const img = new Image();
    img.onload = function render() {
      activeFrameCtx.drawImage(img, 0, 0, 96, 96);
    };
    img.src = dataUrls[activeFrameCanvas.dataset.curFrameNum - 1];
  }
}

function chooseColor(e) {
  let neededBackgroundColor;
  let tempCurColor;
  let bubble = e.target;
  do {
    if (getComputedStyle(bubble).backgroundColor !== 'rgba(0, 0, 0, 0)') {
      neededBackgroundColor = getComputedStyle(bubble).backgroundColor;
    } else {
      bubble = bubble.parentNode;
    }
  }
  while (!neededBackgroundColor);
  if (document.getElementById('eyedropper').classList.contains('toggle') && !e.target.classList.contains('eyedropper')) {
    tempCurColor = getComputedStyle(curColor).backgroundColor;
    curColor.style.backgroundColor = neededBackgroundColor;
    prevColor.style.backgroundColor = tempCurColor;
  }
}

document.addEventListener('click', chooseColor);
mainCanvas.addEventListener('click', drawOnCanvas);

let fps;
let q = 0;
let timer;

function movee() {
  const cadr = new Image();
  cadr.src = dataUrls[q];
  document.querySelector('.preview').style.backgroundColor = 'rgb(100, 100, 100, 0.6)';
  document.querySelector('.preview').style.backgroundImage = `url(${dataUrls[q]})`;
  document.querySelector('.preview').style.backgroundRepeat = 'no-repeat';
  document.querySelector('.preview').style.backgroundSize = 'contain';
  if (q === dataUrls.length - 1) {
    q = 0;
  } else {
    q += 1;
  }
}
const animationFps = document.querySelector('.choose-fps');

function animationSpeed() {
  fps = +document.querySelector('.choose-fps').value;
  document.querySelector('.fps').innerHTML = `${fps} FPS`;
  if (fps === 0) {
    timer = clearInterval(timer);
  } else {
    timer = clearInterval(timer);
    timer = setInterval(movee, 1000 / fps);
  }
}

animationFps.addEventListener('change', animationSpeed);

const fullScreenBtn = document.querySelector('.to-fs-mode-btn');
const animationPreview = document.querySelector('.preview-container');

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.querySelector('.preview').style.height = '384px';
    document.querySelector('.preview-container').style.padding = '400px auto 0 0 ';
    animationPreview.requestFullscreen();
  } else {
    document.querySelector('.preview').style.height = '192px';
    document.exitFullscreen();
  }
}

fullScreenBtn.addEventListener('mouseup', toggleFullScreen);
