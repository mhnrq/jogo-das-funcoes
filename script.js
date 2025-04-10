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

let counts = {
  afim: 0,
  quadratica: 0,
  exponencial: 0,
  logaritmica: 0
};

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function updateCounts() {
  document.getElementById("afimCount").textContent = `${counts.afim}/14`;
  document.getElementById("quadraticaCount").textContent = `${counts.quadratica}/14`;
  document.getElementById("exponencialCount").textContent = `${counts.exponencial}/11`;
  document.getElementById("logaritmicaCount").textContent = `${counts.logaritmica}/11`;
}

function checkWin() {
  const total = counts.afim + counts.quadratica + counts.exponencial + counts.logaritmica;
  if (total === 50) {
    setTimeout(() => {
      alert("Parabéns! Você finalizou o jogo!");
    }, 100);
  }
}

function resetGame() {
  counts = { afim: 0, quadratica: 0, exponencial: 0, logaritmica: 0 };
  updateCounts();
  renderCards();
}

function renderCards() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";
  shuffle(functions).forEach((func, i) => {
    const card = document.createElement("div");
    card.className = "carta";
    card.textContent = func.text;
    card.dataset.type = func.type;
    container.appendChild(card);
  });
}

renderCards();
updateCounts();

document.querySelectorAll(".drop-area").forEach(area => {
  new Sortable(area, {
    group: {
      name: "shared",
      pull: true,
      put: function (to) {
        return true;
      }
    },
    onAdd: function (evt) {
      const type = evt.item.dataset.type;
      const dropType = area.dataset.area;

      if (type === dropType) {
        evt.item.remove();
        counts[dropType]++;
        updateCounts();
        checkWin();
      } else {
        // volta ao container se for incorreto
        document.getElementById("cardContainer").appendChild(evt.item);
      }
    }
  });
});

new Sortable(document.getElementById("cardContainer"), {
  group: "shared"
});
