// =============================
// 🌐 MENÚ RESPONSIVE
// =============================
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// =============================
// 🔝 BOTÓN SUBIR
// =============================
const btnSubir = document.getElementById("btnSubir");

if (btnSubir) {
  window.addEventListener("scroll", () => {
    btnSubir.classList.toggle("mostrar", window.scrollY > 200);
  });

  btnSubir.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =============================
// ✨ EFECTO REVEAL
// =============================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =============================
// 🌗 CAMBIO DE TEMA
// =============================
const themeSwitch = document.querySelector(".theme-switch");

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem("theme", theme);
  themeSwitch.textContent = theme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
  themeSwitch.setAttribute("aria-label", theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
}

if (themeSwitch) {
  themeSwitch.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === "dark" ? "light" : "dark";
    setTheme(currentTheme);
  });
}

// Cargar tema guardado
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});

// =============================
// 📊 ANIMAR BARRAS DE HABILIDADES
// =============================
const skillEls = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = getComputedStyle(e.target).getPropertyValue('--w');
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

skillEls.forEach(el => skillObserver.observe(el));

// =============================
// 📧 FORMULARIO DE CONTACTO
// =============================
const contactForm = document.getElementById('contactForm');
const contactMsg = document.getElementById('contactMsg');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = contactForm.nombre.value.trim();
    const email = contactForm.email.value.trim();
    const mensaje = contactForm.mensaje.value.trim();

    if (!nombre || !email || !mensaje) {
      contactMsg.textContent = 'Por favor completa todos los campos.';
      contactMsg.style.color = 'crimson';
      return;
    }

    contactMsg.textContent = 'Enviando...';
    contactMsg.style.color = '';
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        contactMsg.textContent = '¡Mensaje enviado! Gracias — te responderé pronto.';
        contactForm.reset();
      } else {
        contactMsg.textContent = 'Ocurrió un error, intenta de nuevo más tarde.';
      }
    } catch {
      contactMsg.textContent = 'Error de red, revisa tu conexión.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar';
    }
  });
}