// =============================
// 🌐 MENÚ RESPONSIVE
// =============================
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

// =============================
// 🔝 BOTÓN DE VOLVER ARRIBA
// =============================
const btnSubir = document.getElementById("btnSubir");

if (btnSubir) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btnSubir.classList.add("mostrar");
    } else {
      btnSubir.classList.remove("mostrar");
    }
  });

  btnSubir.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// =============================
// ✨ EFECTO SCROLL REVEAL
// =============================
function revealElements() {
  const elements = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  const visiblePoint = 100;

  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - visiblePoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// =============================
// 🌗 MODO OSCURO
// =============================
const themeSwitch = document.querySelector(".theme-switch");

if (themeSwitch) {
  themeSwitch.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Guardar preferencia
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeSwitch.textContent = "☀️ Modo Claro";
    } else {
      localStorage.setItem("theme", "light");
      themeSwitch.textContent = "🌙 Modo Oscuro";
    }
  });
}

// Cargar modo guardado
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeSwitch) themeSwitch.textContent = "☀️ Modo Claro";
  }
});
