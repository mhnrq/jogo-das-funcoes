const functions = [
  { type: "afim", text: "f(x) = x - 9" },
    { type: "afim", text: "f(x) = 2x" },
    { type: "afim", text: "f(x) = -9x" },
    { type: "afim", text: "f(x) = 6x - 14" },
    { type: "afim", text: "f(x) = -√x" },
    { type: "afim", text: "f(x) = 5x - 6" },
    { type: "afim", text: "f(x) = 2x + 1" },
    { type: "afim", text: "f(x) = 3x - 1" },
    { type: "afim", text: "f(x) = x - 3" },
    { type: "afim", text: "f(x) = -x + 5" },
    { type: "afim", text: "f(x) = 0,5x" },
    { type: "afim", text: "f(x) = 4x" },
    { type: "afim", text: "f(x) = √x - 1" },
    { type: "afim", text: "f(x) = 2x" },

    { type: "quadratica", text: "f(x) = x²" },
    { type: "quadratica", text: "f(x) = x² + 1" },
    { type: "quadratica", text: "f(x) = x² - 4" },
    { type: "quadratica", text: "f(x) = x² - 5x + 6" },
    { type: "quadratica", text: "f(x) = -3x²" },
    { type: "quadratica", text: "f(x) = 2x² - 3" },
    { type: "quadratica", text: "f(x) = -2x² + 3" },
    { type: "quadratica", text: "f(x) = 3x²" },
    { type: "quadratica", text: "f(x) = x² - 3" },
    { type: "quadratica", text: "f(x) = 2x² + 4" },
    { type: "quadratica", text: "f(x) = x² - 3x + 9" },
    { type: "quadratica", text: "f(x) = -9x²" },
    { type: "quadratica", text: "f(x) = 10x² + 4" },
    { type: "quadratica", text: "f(x) = -3x² - 8" },

    { type: "exponencial", text: "f(x) = eˣ" },
    { type: "exponencial", text: "f(x) = 2eˣ" },
    { type: "exponencial", text: "f(x) = e⁻ˣ + 2" },
    { type: "exponencial", text: "f(x) = eˣ - 3" },
    { type: "exponencial", text: "f(x) = 10ˣ" },
    { type: "exponencial", text: "f(x) = 0,5ˣ" },
    { type: "exponencial", text: "f(x) = 3ˣ + 1" },
    { type: "exponencial", text: "f(x) = 5ˣ - 1" },
    { type: "exponencial", text: "f(x) = -5ˣ" },
    { type: "exponencial", text: "f(x) = e⁻ˣ" },
    { type: "exponencial", text: "f(x) = 2⁻ˣ" },

    { type: "logaritmica", text: "f(x) = log₁₀(x)" },
    { type: "logaritmica", text: "f(x) = ln(x)" },
    { type: "logaritmica", text: "f(x) = log₂(x)" },
    { type: "logaritmica", text: "f(x) = ln(x + 1)" },
    { type: "logaritmica", text: "f(x) = ln(2x)" },
    { type: "logaritmica", text: "f(x) = log₁₀(x - 2)" },
    { type: "logaritmica", text: "f(x) = log₁₀(x + 4)" },
    { type: "logaritmica", text: "f(x) = log₃(3x + 1)" },
    { type: "logaritmica", text: "f(x) = log₂(x)" },
    { type: "logaritmica", text: "f(x) = log₃(x + 5)" },
    { type: "logaritmica", text: "f(x) = log₂(5x)" },
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
