// Trocar seções
const toggleButtons = document.querySelectorAll('.toggleBtn');
const timerSection = document.getElementById('timerSection');
const stopwatchSection = document.getElementById('stopwatchSection');

let modoAtual = 'timer';

function toggleModo() {
  if (modoAtual === 'timer') {
    timerSection.style.display = 'none';
    stopwatchSection.style.display = 'block';
    modoAtual = 'stopwatch';
  } else {
    timerSection.style.display = 'block';
    stopwatchSection.style.display = 'none';
    modoAtual = 'timer';
  }
}

toggleButtons.forEach(btn => btn.addEventListener('click', toggleModo));

/* ===== TIMER ===== */

let timer;
let totalSeconds = 0;
let isRunning = false;

function startTimer() {
  if (isRunning) return;

  const hours = parseInt(document.getElementById('hoursInput').value) || 0;
  const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
  const seconds = parseInt(document.getElementById('secondsInput').value) || 0;

  if (totalSeconds === 0) {
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
  }

  if (totalSeconds <= 0) return;

  isRunning = true;
  timer = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timer);
      isRunning = false;
      document.body.classList.remove('piscar'); 
      alert("Tempo esgotado!");
    } else {
      totalSeconds--;
      updateDisplay();

       
      if (totalSeconds <= 10) {
        document.body.classList.add('piscar');
      }
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  totalSeconds = 0;
  isRunning = false;
  updateDisplay();
  document.body.classList.remove('piscar'); 
}

function updateDisplay() {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${hrs}:${mins}:${secs}`;
}

/* ===== STOPWATCH ===== */
let stopwatch = 0;
let stopwatchRunning = false;
let stopwatchInterval;
let stopwatchHistory = [];

function startStopwatch() {
  if (stopwatchRunning) return;

  stopwatchRunning = true;
  stopwatchInterval = setInterval(() => {
    stopwatch++;
    updateStopwatchDisplay();
  }, 1000);
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  if (stopwatch > 0) {
    const time = formatTime(stopwatch);
    stopwatchHistory.push(time);
    updateList(stopwatchHistory, 'stopwatchHistory');
  }
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatch = 0;
  updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
  document.getElementById('stopwatchDisplay').textContent = formatTime(stopwatch);
}

document.getElementById('mostrarHistorico').addEventListener('click', () => {
  const todosTempos = [...stopwatchHistory]; // ou timerHistory se quiser o do timer
  if (todosTempos.length === 0) {
    alert("Nenhum histórico disponível.");
    return;
  }

  const listaFormatada = todosTempos.map((t, i) => `#${i + 1}: ${t}`).join("\n");
  alert("Histórico:\n" + listaFormatada);
});


/* ===== UTILS ===== */
function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateList(array, elementId) {
  const ul = document.getElementById(elementId);
  ul.innerHTML = '';
  array.forEach((time, i) => {
    const li = document.createElement('li');
    li.textContent = `#${i + 1}: ${time}`;
    ul.appendChild(li);
  });
}

function clearHistory(type) {
  if (type === 'timer') {
    timerHistory = [];
    updateList(timerHistory, 'timerHistory');
  } else if (type === 'stopwatch') {
    stopwatchHistory = [];
    updateList(stopwatchHistory, 'stopwatchHistory');
  }
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;

  if (stopwatch > 0) {
    const time = formatTime(stopwatch);

    if (stopwatchHistory.length >= 15) {
      stopwatchHistory.shift(); // remove o mais antigo
    }

    stopwatchHistory.push(time);
    updateList(stopwatchHistory, 'stopwatchHistory');
  }
}


/* ===== OTHERS ===== */

const botao = document.querySelector('.botao-menu')
const menuLateral = document.querySelector('.menu-lateral')
const background = document.querySelector('.background')

botao.addEventListener('click', () => {
    menuLateral.classList.toggle('ativo')
    botao.classList.toggle('ativo')
    background.classList.toggle('ativo')
     
})

const btn = document.querySelector('.button-aside')
const menuaside = document.querySelector('.historic-aside')
const trashbtn = document.querySelector('.clear-history')

btn.addEventListener('click', () => {
    menuaside.classList.toggle('ativo')
    btn.classList.toggle('ativo')
    trashbtn.classList.toggle('ativo')
})



 
 
const button = document.querySelector('.button-edit');
const inputs = document.querySelector('.inputs');

button.addEventListener('click', () => {
  inputs.classList.toggle('ativo');
  button.classList.toggle('ativo');
});