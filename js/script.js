const functions = [/* ... sua lista completa de funções aqui ... */];

// Contadores
let afimCount = 0, quadraticaCount = 0, exponencialCount = 0, logaritmicaCount = 0;

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

    // Drag & Drop para desktop
    card.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', card.id);
    });

    // Toque para mobile
    card.addEventListener('click', () => {
      document.querySelectorAll('.carta').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });

    container.appendChild(card);
  });
}

// Áreas de drop
document.querySelectorAll('.drop-area').forEach(area => {
  area.addEventListener('dragover', e => e.preventDefault());

  area.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(id);
    processDrop(card, area);
  });

  // Suporte a toque/click (mobile)
  area.addEventListener('click', () => {
    const selected = document.querySelector('.carta.selected');
    if (selected) processDrop(selected, area);
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
      alert("Parabéns, você finalizou o jogo! Clique em RESET para jogar de novo.");
    }, 100);
  }
}

function resetGame() {
  afimCount = quadraticaCount = exponencialCount = logaritmicaCount = 0;
  updateCounts();
  renderCards();
}

// Iniciar jogo
renderCards();
