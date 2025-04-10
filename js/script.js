const functions = [
  { text: "f(x) = 2x + 3", type: "afim" },
  { text: "f(x) = -x + 5", type: "afim" },
  { text: "f(x) = x² + 2x + 1", type: "quadratica" },
  { text: "f(x) = -3x²", type: "quadratica" },
  { text: "f(x) = 2^x", type: "exponencial" },
  { text: "f(x) = 5 * 3^x", type: "exponencial" },
  { text: "f(x) = log(x)", type: "logaritmica" },
  { text: "f(x) = log₂(x - 1)", type: "logaritmica" },
  // Adicione mais funções conforme quiser
];

let startTime = null;
let timerInterval = null;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCards() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";
  shuffle(functions).forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = item.text;
    card.setAttribute("data-type", item.type);
    container.appendChild(card);
  });
}

function resetGame() {
  stopTimer();
  startTime = null;
  document.getElementById("timer").textContent = "Tempo: 00:00";
  createCards();
  updateCounts();
}

function updateCounts() {
  const types = ["afim", "quadratica", "exponencial", "logaritmica"];
  types.forEach(type => {
    const area = document.querySelector(`.drop-area.${type}`);
    const count = area.querySelectorAll(`.card[data-type="${type}"]`).length;
    document.getElementById(`${type}Count`).textContent = `${count}/` +
      functions.filter(f => f.type === type).length;
  });
}

function startTimer() {
  if (startTime !== null) return;
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const diff = Math.floor((Date.now() - startTime) / 1000);
    const minutes = String(Math.floor(diff / 60)).padStart(2, '0');
    const seconds = String(diff % 60).padStart(2, '0');
    document.getElementById("timer").textContent = `Tempo: ${minutes}:${seconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

document.body.addEventListener("click", () => {
  startTimer();
});

document.querySelectorAll(".drop-area").forEach(area => {
  new Sortable(area, {
    group: "shared",
    animation: 150,
    onAdd: function () {
      updateCounts();
      checkWin();
    }
  });
});

new Sortable(document.getElementById("cardContainer"), {
  group: "shared",
  animation: 150
});

function checkWin() {
  const totalCards = document.querySelectorAll(".card").length;
  const areas = document.querySelectorAll(".drop-area");
  let correctCount = 0;

  areas.forEach(area => {
    const expected = area.dataset.area;
    const cards = area.querySelectorAll(".card");
    cards.forEach(card => {
      if (card.dataset.type === expected) correctCount++;
    });
  });

  if (correctCount === totalCards) {
    stopTimer();
    alert("Parabéns! Você completou o jogo.");
  }
}

createCards();
