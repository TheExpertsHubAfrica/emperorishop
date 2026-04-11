(function () {
  var modal = document.getElementById("ipad-film-modal");
  var video = document.getElementById("ipad-film-video");
  var fallback = document.getElementById("ipad-film-fallback");
  var openBtn = document.querySelector("[data-film-open]");
  var backdrop = modal && modal.querySelector(".ipad-film-modal-backdrop");
  var closeBtn = modal && modal.querySelector(".ipad-film-modal-close");
  var hlsInstance = null;
  var fallbackDefault =
    "Playback is not available in this browser. Try Safari or a recent version of Chrome or Edge.";

  if (!modal || !video) return;

  function getFilmSrc() {
    return (openBtn && openBtn.getAttribute("data-film-src")) || "";
  }

  function destroyHls() {
    if (hlsInstance) {
      hlsInstance.destroy();
      hlsInstance = null;
    }
  }

  function stopVideo() {
    video.pause();
    destroyHls();
    video.removeAttribute("src");
    video.load();
    if (fallback) {
      fallback.hidden = true;
      fallback.textContent = fallbackDefault;
    }
  }

  /**
   * @returns {"native"|"hls"|"none"}
   */
  function attachSource(url) {
    if (!url) return "none";
    if (fallback) fallback.hidden = true;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      return "native";
    }

    if (typeof Hls !== "undefined" && Hls.isSupported()) {
      hlsInstance = new Hls({ enableWorker: true });
      hlsInstance.loadSource(url);
      hlsInstance.attachMedia(video);
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play().catch(function () {});
      });
      hlsInstance.on(Hls.Events.ERROR, function (_evt, data) {
        if (data.fatal && fallback) fallback.hidden = false;
      });
      return "hls";
    }

    if (fallback) fallback.hidden = false;
    return "none";
  }

  function openModal() {
    var url = getFilmSrc().trim();

    stopVideo();
    modal.removeAttribute("hidden");
    modal.classList.add("is-open");
    document.body.classList.add("ipad-film-open");

    if (!url) {
      if (fallback) {
        fallback.hidden = false;
        fallback.textContent = "Guided tour film URL can be added on this button (data-film-src).";
      }
      if (closeBtn) closeBtn.focus();
      return;
    }

    if (fallback) fallback.textContent = fallbackDefault;

    var mode = attachSource(url);
    if (mode === "native") {
      video.play().catch(function () {});
    }

    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("hidden", "");
    document.body.classList.remove("ipad-film-open");
    stopVideo();
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hasAttribute("hidden")) closeModal();
  });
})();
