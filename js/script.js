const functions = [
  { type: "afim", text: "f(x) = x - 9" },
  // ... [o resto das funções aqui igual ao original]
];

let afimCount = 0, quadraticaCount = 0, exponencialCount = 0, logaritmicaCount = 0;
let selectedCard = null;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderCards() {
  const container = document.getElementById('cardContainer');
  container.innerHTML = '';
  shuffle(functions).forEach((func, i) => {
    const card = document.createElement('div');
    card.className = 'carta';
    card.textContent = func.text;
    card.dataset.type = func.type;
    card.id = 'card-' + i;

    // DRAG & DROP
    card.draggable = true;
    card.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', card.id);
    });

    // TOUCH/CELL
    card.addEventListener('click', () => {
      if (selectedCard) selectedCard.classList.remove('selecionada');
      selectedCard = card;
      card.classList.add('selecionada');
    });

    container.appendChild(card);
  });
}

document.querySelectorAll('.drop-area').forEach(area => {
  // DRAG & DROP
  area.addEventListener('dragover', e => e.preventDefault());
  area.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(id);
    processDrop(card, area);
  });

  // TOUCH/CELL
  area.addEventListener('click', () => {
    if (selectedCard) {
      processDrop(selectedCard, area);
      selectedCard.classList.remove('selecionada');
      selectedCard = null;
    }
  });
});

function processDrop(card, area) {
  const draggedType = card.dataset.type;
  const dropType = area.dataset.area;

  if (draggedType === dropType) {
    card.remove();
    switch (dropType) {
      case "afim": afimCount++; break;
      case "quadratica": quadraticaCount++; break;
      case "exponencial": exponencialCount++; break;
      case "logaritmica": logaritmicaCount++; break;
    }
    updateCounts();
    checkWin();
  }
}

function updateCounts() {
  document.getElementById('afimCount').textContent = `${afimCount}/14`;
  document.getElementById('quadraticaCount').textContent = `${quadraticaCount}/14`;
  document.getElementById('exponencialCount').textContent = `${exponencialCount}/11`;
  document.getElementById('logaritmicaCount').textContent = `${logaritmicaCount}/11`;
}

function checkWin() {
  if (afimCount + quadraticaCount + exponencialCount + logaritmicaCount === 50) {
    setTimeout(() => {
      alert("Parabéns, você finalizou o jogo! Caso queira jogar novamente, clique no botão RESET.");
    }, 100);
  }
}

function resetGame() {
  afimCount = quadraticaCount = exponencialCount = logaritmicaCount = 0;
  updateCounts();
  renderCards();
}

// Adiciona classe visual para toque
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.innerHTML = `.selecionada { outline: 3px dashed #007bff; }`;
  document.head.appendChild(style);
  renderCards();
});
