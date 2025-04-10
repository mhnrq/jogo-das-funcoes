const functions = [/* mesma lista de funções que você já tem */];

let afimCount = 0, quadraticaCount = 0, exponencialCount = 0, logaritmicaCount = 0;
let startTime = null;
let interval = null;
let gameStarted = false;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderCards() {
  const container = document.getElementById('cardContainer');
  container.innerHTML = '';
  shuffle(functions).forEach((func, i) => {
    const card = document.createElement('div');
    card.className = 'carta';
    card.draggable = true;
    card.textContent = func.text;
    card.dataset.type = func.type;
    card.id = 'card-' + i;

    card.addEventListener('dragstart', e => {
      if (!gameStarted) startTimer();
      e.dataTransfer.setData('text/plain', card.id);
    });

    card.addEventListener('click', () => {
      if (!gameStarted) startTimer();
      handleTouch(card);
    });

    container.appendChild(card);
  });
}

function handleTouch(card) {
  const selectedArea = prompt("Qual o tipo da função?\nDigite: afim, quadratica, exponencial, logaritmica");
  if (selectedArea === card.dataset.type) {
    card.remove();
    updateCount(card.dataset.type);
    checkWin();
  } else {
    alert("Classificação incorreta!");
  }
}

document.querySelectorAll('.drop-area').forEach(area => {
  area.addEventListener('dragover', e => e.preventDefault());
  area.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(id);
    if (!card) return;

    const draggedType = card.dataset.type;
    const dropType = area.dataset.area;

    if (draggedType === dropType) {
      card.remove();
      updateCount(dropType);
      checkWin();
    }
  });
});

function updateCount(type) {
  switch (type) {
    case "afim": afimCount++; break;
    case "quadratica": quadraticaCount++; break;
    case "exponencial": exponencialCount++; break;
    case "logaritmica": logaritmicaCount++; break;
  }
  updateCounts();
}

function updateCounts() {
  document.getElementById('afimCount').textContent = `${afimCount}/14`;
  document.getElementById('quadraticaCount').textContent = `${quadraticaCount}/14`;
  document.getElementById('exponencialCount').textContent = `${exponencialCount}/11`;
  document.getElementById('logaritmicaCount').textContent = `${logaritmicaCount}/11`;
}

function checkWin() {
  if (afimCount + quadraticaCount + exponencialCount + logaritmicaCount === 50) {
    stopTimer();
    setTimeout(() => {
      alert("Parabéns! Você finalizou o jogo em " + document.getElementById("timer").textContent.replace("Tempo: ", "") + "!");
    }, 100);
  }
}

function startTimer() {
  gameStarted = true;
  startTime = Date.now();
  interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").textContent = `Tempo: ${elapsed}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  gameStarted = false;
}

function resetGame() {
  stopTimer();
  document.getElementById("timer").textContent = "Tempo: 0s";
  afimCount = quadraticaCount = exponencialCount = logaritmicaCount = 0;
  updateCounts();
  renderCards();
}

renderCards();

