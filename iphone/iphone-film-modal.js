(function () {
  var modal = document.getElementById("iphone-film-modal");
  var video = document.getElementById("iphone-film-video");
  var fallback = document.getElementById("iphone-film-fallback");
  var openBtn = document.querySelector("[data-film-open]");
  var backdrop = modal && modal.querySelector(".iphone-film-modal-backdrop");
  var closeBtn = modal && modal.querySelector(".iphone-film-modal-close");
  var hlsInstance = null;

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
    if (fallback) fallback.hidden = true;
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
    var url = getFilmSrc();
    if (!url) return;

    stopVideo();
    modal.removeAttribute("hidden");
    modal.classList.add("is-open");
    document.body.classList.add("iphone-film-open");

    var mode = attachSource(url);
    if (mode === "native") {
      video.play().catch(function () {});
    }

    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("hidden", "");
    document.body.classList.remove("iphone-film-open");
    stopVideo();
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hasAttribute("hidden")) closeModal();
  });
})();
