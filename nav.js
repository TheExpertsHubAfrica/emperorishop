(function () {
  var header = document.querySelector("header.top-nav, header.mac-top-nav");
  var toggle = document.querySelector(".nav-menu-toggle");
  var menu = document.getElementById("site-menu");
  if (!header || !toggle || !menu) return;

  function navMaxWidthPx() {
    if (header.classList.contains("mac-top-nav")) return 760;
    if (header.classList.contains("top-nav-apple")) return 834;
    return 760;
  }

  function setOpen(open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("nav-drawer-open", open);
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    setOpen(!header.classList.contains("is-open"));
  });

  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  document.addEventListener("click", function (e) {
    if (!header.classList.contains("is-open")) return;
    if (!header.contains(e.target)) setOpen(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > navMaxWidthPx() && header.classList.contains("is-open")) {
      setOpen(false);
    }
  });
})();
