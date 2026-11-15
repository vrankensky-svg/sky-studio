(function () {
  const storageKey = "sorbos-lang";
  function currentLang() {
    const saved = localStorage.getItem(storageKey);
    if (saved === "en" || saved === "es") return saved;
    return "es";
  }
  function setLang(lang) {
    const next = lang === "en" ? "en" : "es";
    document.documentElement.lang = next;
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== next;
    });
    document.querySelectorAll("[data-es][data-en]").forEach(function (el) {
      el.textContent = el.getAttribute("data-" + next);
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === next ? "true" : "false");
    });
    const nav = document.querySelector(".nav");
    if (nav) nav.setAttribute("aria-label", next === "en" ? "Primary" : "Principal");
    localStorage.setItem(storageKey, next);
  }
  document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-set-lang"));
    });
  });
  setLang(currentLang());
})();
