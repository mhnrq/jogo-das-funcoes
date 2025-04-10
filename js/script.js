function configurarDropAreas() {
  const dropAreas = document.querySelectorAll(".drop-area");
  dropAreas.forEach(area => {
    new Sortable(area, {
      group: "funcoes",
      animation: 150,
      filter: ".count", // <- NÃO permite arrastar os contadores
      preventOnFilter: false, // <- Permite clicar no contador normalmente
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
