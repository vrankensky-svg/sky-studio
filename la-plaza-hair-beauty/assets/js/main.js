(function () {
  const storageKey = "laplaza-lang";
  const overlay = document.getElementById("nav-overlay");
  const openBtn = document.querySelector(".menu-open");
  const closeBtn = document.querySelector(".menu-close");

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
    const nav = document.querySelector(".nav-overlay nav");
    if (nav) nav.setAttribute("aria-label", next === "en" ? "Primary" : "Principal");
    localStorage.setItem(storageKey, next);
  }
  function openMenu() {
    overlay.hidden = false;
    overlay.classList.add("is-open");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
    if (closeBtn) closeBtn.focus();
  }
  function closeMenu() {
    overlay.hidden = true;
    overlay.classList.remove("is-open");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    openBtn.focus();
  }

  document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-set-lang"));
    });
  });
  setLang(currentLang());

  if (openBtn && overlay) {
    openBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    overlay.querySelectorAll("nav a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) closeMenu();
    });
  }
})();
