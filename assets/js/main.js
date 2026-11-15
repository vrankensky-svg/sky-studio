(function () {
  const storageKey = "sky-studio-lang";
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".nav-mobile");
  const titles = {
    es: "Sky Studio · Webs para negocios en Xàbia / Jávea",
    en: "Sky Studio · Websites for local businesses in Xàbia / Jávea"
  };
  const descriptions = {
    es: "Sky Studio. Soy Sky, de Xàbia, y hago webs sencillas de una página para negocios locales: en el móvil, en español e inglés, con mapa y un botón de WhatsApp.",
    en: "Sky Studio. I’m Sky, from Xàbia, and I build simple one-page websites for local businesses: they work well on a phone, in Spanish and English, with a map and a WhatsApp button."
  };

  function currentLang() {
    const saved = localStorage.getItem(storageKey);
    if (saved === "en" || saved === "es") return saved;
    return "es";
  }

  function setLang(lang) {
    const next = lang === "en" ? "en" : "es";
    document.documentElement.lang = next;
    document.documentElement.dataset.lang = next;

    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== next;
    });

    document.querySelectorAll("[data-es][data-en]").forEach(function (el) {
      el.textContent = el.getAttribute("data-" + next);
    });

    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === next ? "true" : "false");
    });

    if (titles[next]) document.title = titles[next];

    const meta = document.querySelector('meta[name="description"]');
    if (meta && descriptions[next]) meta.setAttribute("content", descriptions[next]);

    const nav = document.querySelector(".nav");
    if (nav) nav.setAttribute("aria-label", next === "en" ? "Primary" : "Principal");
    if (mobileNav) mobileNav.setAttribute("aria-label", next === "en" ? "Mobile" : "Móvil");

    localStorage.setItem(storageKey, next);
  }

  document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-set-lang"));
    });
  });

  setLang(currentLang());

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      mobileNav.classList.toggle("is-open", !open);
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
      });
    });
  }
})();
