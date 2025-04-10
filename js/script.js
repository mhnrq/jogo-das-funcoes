const functions = [
  { type: "afim", text: "f(x) = x - 9" },
  { type: "afim", text: "f(x) = 2x" },
  { type: "afim", text: "f(x) = -9x" },
  { type: "afim", text: "f(x) = 6x - 14" },
  { type: "afim", text: "f(x) = 5x - 6" },
  { type: "afim", text: "f(x) = 2x + 1" },
  { type: "afim", text: "f(x) = 3x - 1" },
  { type: "afim", text: "f(x) = x - 3" },
  { type: "afim", text: "f(x) = -x + 5" },
  { type: "afim", text: "f(x) = 0,5x" },
  { type: "afim", text: "f(x) = 4x" },
  { type: "afim", text: "f(x) = 2x" },
  { type: "afim", text: "f(x) = √x - 1" },
  { type: "afim", text: "f(x) = -√x" },

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

let cardContainer = document.getElementById("cardContainer");

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderCards() {
  cardContainer.innerHTML = "";
  let embaralhadas = embaralhar(functions);
  embaralhadas.forEach((funcao, index) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.textContent = funcao.text;
    div.setAttribute("data-tipo", funcao.type);
    div.setAttribute("id", `card-${index}`);
    cardContainer.appendChild(div);
  });
}

function configurarDropAreas() {
  const dropAreas = document.querySelectorAll(".drop-area");
  dropAreas.forEach(area => {
    new Sortable(area, {
      group: "funcoes",
      animation: 150,
      onAdd: function (evt) {
        const card = evt.item;
        const tipoCorreto = area.dataset.area;
        const tipoCard = card.dataset.tipo;
        if (tipoCard === tipoCorreto) {
          card.style.backgroundColor = "#c8e6c9";
        } else {
          card.style.backgroundColor = "#ffcdd2";
        }
        atualizarContador();
      }
    });
  });

  new Sortable(cardContainer, {
    group: "funcoes",
    animation: 150
  });
}

function atualizarContador() {
  const tipos = ["afim", "quadratica", "exponencial", "logaritmica"];
  tipos.forEach(tipo => {
    const area = document.querySelector(`.drop-area.${tipo}`);
    const count = area.querySelectorAll(`.card[data-tipo="${tipo}"]`).length;
    document.getElementById(`${tipo}Count`).textContent = `${count}/${
      tipo === "afim" || tipo === "quadratica" ? 14 : 11
    }`;
  });
}

function resetGame() {
  renderCards();
  configurarDropAreas();
  atualizarContador();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  configurarDropAreas();
});
