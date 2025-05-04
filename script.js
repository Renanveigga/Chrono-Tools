let timer;
let totalSeconds = 0;
let isRunning = false;

const botao = document.querySelector('.button-edit');
const inputs = document.querySelector('.inputs');

botao.addEventListener('click', () => {
  inputs.classList.toggle('ativo');
  botao.classList.toggle('ativo');
});

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
