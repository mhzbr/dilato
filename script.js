// CONFIGURAÇÃO DO WHATSAPP
const whatsappNumber = "5544991081567";

// HEADER NO SCROLL


// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// ANIMAÇÕES AO ROLAR
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document
  .querySelectorAll(
    ".about, .numbers, .operation, .coast, .profile, .support, .cta-section, .step, .support-card, .number-item"
  )
  .forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

// CONTADOR DOS NÚMEROS
const counters = document.querySelectorAll(".number-item strong");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = parseInt(counter.getAttribute("data-target"), 10);

      if (!target) return;

      let current = 0;
      const increment = target / 90;

      const updateCounter = () => {
        current += increment;

        if (current < target) {
          counter.innerText = "+" + Math.floor(current).toLocaleString("pt-BR");
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = "+" + target.toLocaleString("pt-BR");
        }
      };

      updateCounter();
      counterObserver.unobserve(counter);
    });
  },
  {
    threshold: 0.5,
  }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

// FORMULÁRIO PARA WHATSAPP
const form = document.getElementById("leadForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const perfilOperacao = document.getElementById("perfilOperacao").value;
    const possuiEquipe = document.getElementById("possuiEquipe").value;
    const capital = document.getElementById("capital").value;
    const experiencia = document.getElementById("experiencia").value.trim();

    const mensagem = `
Olá, tenho interesse em operar a Dilato no litoral paulista.

*Dados do interessado:*
Nome: ${nome}
WhatsApp: ${telefone}
E-mail: ${email}
Cidade de interesse: ${cidade}

*Perfil da operação:*
Perfil: ${perfilOperacao}
Possui equipe: ${possuiEquipe}
Capital disponível: ${capital}

*Experiência:*
${experiencia}

Gostaria de receber mais informações sobre a oportunidade de expansão regional da Dilato.
    `.trim();

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
  });
}

// MÁSCARA SIMPLES PARA TELEFONE
const telefoneInput = document.getElementById("telefone");

if (telefoneInput) {
  telefoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else {
      value = value.replace(/^(\d*)$/, "$1");
    }

    e.target.value = value;
  });
}

// PARALLAX LEVE NO HERO
const heroVideo = document.querySelector(".hero-video");

window.addEventListener("scroll", () => {
  if (!heroVideo) return;

  const scroll = window.pageYOffset;
  heroVideo.style.transform = `translateY(${scroll * 0.12}px)`;
});