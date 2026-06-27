(() => {
  const storageKey = "lumin-language";
  const supported = new Set(["zh", "en"]);

  function normalize(value) {
    return supported.has(value) ? value : null;
  }

  function urlLanguage() {
    return normalize(new URLSearchParams(window.location.search).get("lang"));
  }

  function storedLanguage() {
    try {
      return normalize(window.localStorage.getItem(storageKey));
    } catch {
      return null;
    }
  }

  function remember(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // The toggle still works if browser storage is unavailable.
    }
  }

  function setUrlLanguage(language) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState({}, "", url);
  }

  function applyLanguage(language, options = {}) {
    const nextLanguage = normalize(language) || "zh";

    document.documentElement.dataset.language = nextLanguage;
    document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-lang-option]").forEach((button) => {
      const isActive = button.dataset.langOption === nextLanguage;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (options.persist) {
      remember(nextLanguage);
    }

    if (options.updateUrl) {
      setUrlLanguage(nextLanguage);
    }
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-lang-option]");
    if (!button) return;

    applyLanguage(button.dataset.langOption, {
      persist: true,
      updateUrl: true
    });
  });

  applyLanguage(urlLanguage() || storedLanguage() || "zh", {
    persist: Boolean(urlLanguage())
  });
})();
