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

// IntersectionObserver para .reveal
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


// animar skill-fill cuando aparecen
const skillEls = document.querySelectorAll('.skill-fill');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = getComputedStyle(e.target).getPropertyValue('--w');
      obs.unobserve(e.target);
    }
  });
},{ threshold: 0.4 });

skillEls.forEach(el => obs.observe(el));


// Enviar formulario con fetch + validar simple
const contactForm = document.getElementById('contactForm');
const contactMsg = document.getElementById('contactMsg');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // validación simple
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

    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    // después de respuesta:
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        contactMsg.textContent = '¡Mensaje enviado! Gracias — te responderé pronto.';
        contactForm.reset();
      } else {
        contactMsg.textContent = 'Ocurrió un error, intenta de nuevo más tarde.';
      }
    } catch (err) {
      contactMsg.textContent = 'Error de red, revisa tu conexión.';
    }
  });
}
