(function () {
  var railSelectors = [
    ".category-strip",
    ".latest-cards",
    ".store-rail",
    ".mac-product-rail",
    ".mac-lineup-rail",
    ".mac-why-rail",
    ".iphone-picker-rail",
    ".iphone-lineup-rail",
    ".iphone-why-rail",
    ".ipad-picker-rail",
    ".ipad-lineup-rail",
    ".ipad-why-rail",
  ];

  function enhanceRail(rail) {
    if (!rail || rail.dataset.scrollArrowsReady === "true") return;
    rail.dataset.scrollArrowsReady = "true";

    var wrap = document.createElement("div");
    wrap.className = "scroll-arrows-wrap";

    rail.parentNode.insertBefore(wrap, rail);
    wrap.appendChild(rail);

    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "scroll-arrow-btn scroll-arrow-btn-prev";
    prevBtn.setAttribute("aria-label", "Scroll left");
    prevBtn.innerHTML = "&#x2039;";

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "scroll-arrow-btn scroll-arrow-btn-next";
    nextBtn.setAttribute("aria-label", "Scroll right");
    nextBtn.innerHTML = "&#x203A;";

    wrap.appendChild(prevBtn);
    wrap.appendChild(nextBtn);

    function getStep() {
      return Math.max(240, Math.round(rail.clientWidth * 0.82));
    }

    function update() {
      var maxScrollLeft = rail.scrollWidth - rail.clientWidth;
      var hasOverflow = maxScrollLeft > 2;
      var hasLeftHidden = rail.scrollLeft > 2;
      var hasRightHidden = rail.scrollLeft < maxScrollLeft - 2;

      wrap.classList.toggle("has-overflow", hasOverflow);
      prevBtn.classList.toggle("is-visible", hasOverflow && hasLeftHidden);
      nextBtn.classList.toggle("is-visible", hasOverflow && hasRightHidden);
      prevBtn.disabled = !(hasOverflow && hasLeftHidden);
      nextBtn.disabled = !(hasOverflow && hasRightHidden);
    }

    prevBtn.addEventListener("click", function () {
      rail.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    nextBtn.addEventListener("click", function () {
      rail.scrollBy({ left: getStep(), behavior: "smooth" });
    });

    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);

    if ("ResizeObserver" in window) {
      var resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(rail);
    }

    update();
  }

  function init() {
    document.querySelectorAll(railSelectors.join(",")).forEach(enhanceRail);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
