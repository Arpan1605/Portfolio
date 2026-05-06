const header = document.getElementById("siteHeader");
const revealNodes = document.querySelectorAll(".reveal");
const langButtons = document.querySelectorAll("[data-lang-switch]");
const langTargets = document.querySelectorAll("[data-en]");
const savedLang = localStorage.getItem("portfolio-language") || "en";

function setLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("portfolio-language", lang);

  langTargets.forEach(node => {
    const value = node.getAttribute(`data-${lang}`);
    if (value !== null) {
      node.innerHTML = value;
    }
  });

  langButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.langSwitch === lang);
    button.setAttribute("aria-pressed", String(button.dataset.langSwitch === lang));
  });
}

function onScroll() {
  if (!header) {
    return;
  }
  header.classList.toggle("scrolled", window.scrollY > 16);
}

if (revealNodes.length > 0) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealNodes.forEach(node => observer.observe(node));
}

langButtons.forEach(button => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.langSwitch);
  });
});

window.addEventListener("scroll", onScroll, { passive: true });
setLanguage(savedLang);
onScroll();
