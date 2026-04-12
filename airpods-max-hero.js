(function () {
  var img = document.getElementById("airpodsMaxHeroImg");
  if (!img) return;

  var PATHS = [
    "./images/airpods_max_orange.png",
    "./images/airpods_max_black.png",
    "./images/airpods_max_blue.png",
    "./images/airpods_max_purple.png",
  ];

  var ALTS = [
    "AirPods Max 2 in orange finish",
    "AirPods Max 2 in black finish",
    "AirPods Max 2 in blue finish",
    "AirPods Max 2 in purple finish",
  ];

  var intervalMs = 3800;
  /** Match `.airpods-max-photo { transition: opacity 0.4s ease-in-out }` — full fade-out before swap, then fade-in */
  var fadeMs = 400;
  var timer = null;
  var idx = 0;

  var mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  function clearTimer() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function advance() {
    idx = (idx + 1) % PATHS.length;
    img.style.opacity = "0";
    window.setTimeout(function () {
      function fadeIn() {
        img.onload = null;
        img.onerror = null;
        requestAnimationFrame(function () {
          img.style.opacity = "1";
        });
      }
      img.onload = fadeIn;
      img.onerror = fadeIn;
      img.src = PATHS[idx];
      img.alt = ALTS[idx];
      window.setTimeout(function () {
        if (img.complete) fadeIn();
      }, 0);
    }, fadeMs);
  }

  function start() {
    clearTimer();
    if (mqReduce.matches || PATHS.length < 2) return;
    timer = window.setInterval(function () {
      if (!document.hidden) advance();
    }, intervalMs);
  }

  if (mqReduce.addEventListener) {
    mqReduce.addEventListener("change", function () {
      if (mqReduce.matches) {
        clearTimer();
        idx = 0;
        img.src = PATHS[0];
        img.alt = ALTS[0];
        img.style.opacity = "1";
      } else {
        start();
      }
    });
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) clearTimer();
    else if (!mqReduce.matches) start();
  });

  img.style.opacity = "1";

  PATHS.forEach(function (src) {
    var pre = new Image();
    pre.decoding = "async";
    pre.src = src;
  });

  start();
})();
