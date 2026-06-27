(() => {
  function headerOffset() {
    return Math.ceil(document.querySelector(".site-header")?.getBoundingClientRect().height || 72);
  }

  function scrollToHash() {
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    window.requestAnimationFrame(() => {
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset();
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    });
  }

  window.addEventListener("hashchange", scrollToHash);
  window.addEventListener("load", scrollToHash);
  scrollToHash();
})();
