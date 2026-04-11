(function () {
  var root = document.getElementById("heroIphoneCarousel");
  if (!root) return;

  var slidesWrap = root.querySelector("[data-hero-slides]");
  var dots = root.parentElement && root.parentElement.querySelectorAll("[data-hero-dot]");
  var slides = root.querySelectorAll(".hero-iphone-slide");
  var mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduceMotion = mqReduce.matches;
  var intervalMs = 4000;
  var timer = null;
  var index = 0;

  function onReduceMotionChange() {
    reduceMotion = mqReduce.matches;
    if (reduceMotion) stopAutoplay();
    else startAutoplay();
  }
  if (mqReduce.addEventListener) {
    mqReduce.addEventListener("change", onReduceMotionChange);
  } else if (mqReduce.addListener) {
    mqReduce.addListener(onReduceMotionChange);
  }

  function setSlide(i) {
    index = i === 1 ? 1 : 0;
    if (slidesWrap) {
      slidesWrap.classList.toggle("hero-iphone-slides--view-1", index === 1);
      slidesWrap.classList.toggle("hero-iphone-slides--view-0", index === 0);
    }
    slides.forEach(function (slide, si) {
      slide.setAttribute("aria-hidden", si === index ? "false" : "true");
    });
    if (dots && dots.length) {
      dots.forEach(function (dot, di) {
        var on = di === index;
        dot.classList.toggle("is-active", on);
        dot.setAttribute("aria-selected", on ? "true" : "false");
        dot.setAttribute("tabindex", on ? "0" : "-1");
      });
    }
  }

  function next() {
    setSlide(index === 0 ? 1 : 0);
  }

  function startAutoplay() {
    if (reduceMotion || timer) return;
    timer = window.setInterval(next, intervalMs);
  }

  function stopAutoplay() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  if (dots && dots.length) {
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        var i = parseInt(dot.getAttribute("data-hero-dot"), 10);
        if (i === 0 || i === 1) {
          setSlide(i);
          stopAutoplay();
          startAutoplay();
        }
      });
    });
  }

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);
  root.addEventListener("focusin", stopAutoplay);
  root.addEventListener("focusout", function () {
    if (!root.contains(document.activeElement)) startAutoplay();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  setSlide(0);
  startAutoplay();
})();
