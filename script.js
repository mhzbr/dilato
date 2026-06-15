// HEADER SCROLL

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.background = "rgba(255,245,223,0.98)";
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";
  } else {
    header.style.background = "rgba(255,245,223,0.9)";
    header.style.boxShadow = "none";
  }
});

// ANIMAÇÕES

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
    ".about, .numbers, .operation, .coast, .profile, .support, .cta-section, .step, .support-card"
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

      const target = parseInt(
        counter.getAttribute("data-target")
      );

      let current = 0;

      const increment = target / 80;

      const updateCounter = () => {

        current += increment;

        if (current < target) {

          counter.innerText =
            "+" + Math.floor(current);

          requestAnimationFrame(updateCounter);

        } else {

          counter.innerText =
            "+" + target.toLocaleString("pt-BR");

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

// SCROLL SUAVE

document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {

    anchor.addEventListener("click", function (e) {

      e.preventDefault();

      const target = document.querySelector(
        this.getAttribute("href")
      );

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    });

  });

// FORMULÁRIO

const form = document.querySelector(".lead-form");

if (form) {

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    const nome =
      form.querySelector('input[type="text"]').value;

    alert(
      `Obrigado ${nome}! Nossa equipe entrará em contato em breve.`
    );

    form.reset();

  });

}

// PARALLAX HERO

const heroVideo = document.querySelector(".hero-video");

window.addEventListener("scroll", () => {

  const scroll = window.pageYOffset;

  if (heroVideo) {

    heroVideo.style.transform =
      `translateY(${scroll * 0.15}px)`;

  }

});