const cardContainer = document.getElementById("cardContainer");
const dropAreas = document.querySelectorAll(".drop-area");

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

let timerInterval;
let seconds = 0;
let gameStarted = false;

function startTimer() {
  if (gameStarted) return;
  gameStarted = true;
  timerInterval = setInterval(() => {
    seconds++;
    document.getElementById("timer").textContent = formatTime(seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  gameStarted = false;
  document.getElementById("timer").textContent = "00:00";
}

function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function criarCartas() {
  cardContainer.innerHTML = "";
  embaralhar(funcoes).forEach((funcao, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = funcao.texto;
    card.dataset.tipo = funcao.tipo;
    card.id = `card-${index}`;
    card.addEventListener("click", () => startTimer());
    cardContainer.appendChild(card);
  });
}

function configurarDragAndDrop() {
  dropAreas.forEach(area => {
    new Sortable(area, {
      group: "cartas",
      animation: 150,
      onAdd: function (evt) {
        const tipoCorreto = evt.to.dataset.area;
        const tipoCard = evt.item.dataset.tipo;

        if (tipoCorreto !== tipoCard) {
          alert("Função incorreta! Tente novamente.");
          cardContainer.appendChild(evt.item);
        } else {
          atualizarContadores();
          verificarFimDoJogo();
        }
      }
    });
  });

  new Sortable(cardContainer, {
    group: "cartas",
    animation: 150
  });
}

function atualizarContadores() {
  const tipos = ["afim", "quadratica", "exponencial", "logaritmica"];
  tipos.forEach(tipo => {
    const count = document.querySelector(`.drop-area.${tipo}`).children.length - 1;
    document.getElementById(`${tipo}Count`).textContent = `${count}/${tipo === "afim" || tipo === "quadratica" ? 14 : 11}`;
  });
}

function verificarFimDoJogo() {
  const totalCartas = document.querySelectorAll(".card").length;
  if (totalCartas === 0) {
    stopTimer();
    alert("Parabéns! Você completou o jogo.");
  }
}

function resetGame() {
  dropAreas.forEach(area => {
    const filhos = Array.from(area.querySelectorAll(".card"));
    filhos.forEach(card => cardContainer.appendChild(card));
  });
  criarCartas();
  configurarDragAndDrop();
  resetTimer();
}

// Iniciar
criarCartas();
configurarDragAndDrop();

