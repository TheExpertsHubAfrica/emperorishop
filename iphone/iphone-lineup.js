(function () {
  function init() {
    document.querySelectorAll("[data-lineup-card]").forEach(function (card) {
      card.querySelectorAll("[data-swatch]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          card.querySelectorAll("[data-swatch]").forEach(function (b) {
            b.classList.remove("is-active");
            b.setAttribute("aria-pressed", "false");
          });
          btn.classList.add("is-active");
          btn.setAttribute("aria-pressed", "true");
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
