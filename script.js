// script.js
(function () {
  const root = document.documentElement;
  const body = document.body;

  /* Loading screen */
  const loader = document.querySelector(".loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) loader.style.display = "none";
    }, 800);
  });

  /* Theme toggle */
  const themeToggle = document.querySelector(".theme-toggle");
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    root.setAttribute("data-theme", storedTheme);
  } else {
    root.setAttribute("data-theme", "light");
  }
  themeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* Mobile nav */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  navToggle?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");
  });
  navLinks?.addEventListener("click", (e) => {
    if (e.target.matches(".nav-link")) {
      navLinks.classList.remove("open");
    }
  });

  /* Smooth scrolling for internal links */
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement && target.getAttribute("href")?.startsWith("#")) {
      const id = target.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        const rect = el.getBoundingClientRect();
        const offset = window.scrollY + rect.top - 70;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }
  });

  /* Scroll progress */
  const progressBar = document.querySelector(".scroll-progress-bar");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
  });

  /* Cursor glow */
  const cursorGlow = document.querySelector(".cursor-glow");
  let cursorTimeout;
  document.addEventListener("mousemove", (e) => {
    if (!cursorGlow) return;
    cursorGlow.style.opacity = "1";
    cursorGlow.style.transform = `translate(${e.clientX - 80}px, ${e.clientY - 80}px)`;
    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(() => {
      cursorGlow.style.opacity = "0";
    }, 800);
  });

  /* Typing animation */
  const typingText = document.querySelector(".typing-text");
  const phrases = [
    "Senior Presentation Designer",
    "Executive Storytelling Specialist",
    "Financial Data Visualization Expert",
    "Presentation Strategy Consultant",
    "Board-Level Communication Designer",
    "Investor Presentation Specialist"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let typingForward = true;

  function typeLoop() {
    if (!typingText) return;
    const currentPhrase = phrases[phraseIndex];
    if (typingForward) {
      charIndex++;
      if (charIndex === currentPhrase.length + 3) {
        typingForward = false;
        setTimeout(typeLoop, 900);
        return;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        typingForward = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    typingText.textContent = currentPhrase.slice(0, Math.max(0, charIndex));
    setTimeout(typeLoop, typingForward ? 70 : 40);
  }
  typeLoop();

  /* Animated counters (hero KPIs & impact metrics) */
  function animateCounter(el, target, duration = 1200) {
    let start = 0;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const kpiCards = document.querySelectorAll(".kpi-card");
  const impactCards = document.querySelectorAll(".impact-card");
  const impactBars = document.querySelectorAll(".impact-bar-fill");
  const skillMeters = document.querySelectorAll(".skill-meter");

  const observerOptions = { threshold: 0.3 };

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const numberEl = card.querySelector(".kpi-number");
        const data = card.getAttribute("data-counter");
        if (numberEl && data) {
          animateCounter(numberEl, parseInt(data, 10));
        }
        obs.unobserve(card);
      }
    });
  }, observerOptions);

  kpiCards.forEach((card) => counterObserver.observe(card));

  const impactObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const data = card.getAttribute("data-counter");
        if (data) {
          const h3 = card.querySelector("h3");
          if (h3 && !h3.dataset.animated) {
            h3.dataset.animated = "true";
          }
        }
        obs.unobserve(card);
      }
    });
  }, observerOptions);

  impactCards.forEach((card) => impactObserver.observe(card));

  const impactBarObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute("data-width") || "0";
        bar.style.width = width + "%";
        obs.unobserve(bar);
      }
    });
  }, observerOptions);
  impactBars.forEach((bar) => impactBarObserver.observe(bar));

  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const meter = entry.target;
        const value = meter.getAttribute("data-skill") || "0";
        const fill = meter.querySelector(".skill-fill");
        if (fill) fill.style.width = value + "%";
        obs.unobserve(meter);
      }
    });
  }, observerOptions);
  skillMeters.forEach((meter) => skillObserver.observe(meter));

  /* Scroll reveal */
  const revealElements = document.querySelectorAll(
    ".section-header, .about-column, .expertise-card, .impact-card, .impact-chart, .timeline-item, .skills-meters, .skills-visual, .project-card, .cert-card, .education-item, .value-card, .testimonial-carousel, .contact-form-wrapper, .contact-info"
  );
  revealElements.forEach((el) => el.classList.add("reveal"));
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealElements.forEach((el) => revealObserver.observe(el));

  /* Active navigation highlight */
  const sections = document.querySelectorAll("section[id]");
  const navLinkEls = document.querySelectorAll(".nav-link");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinkEls.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  /* Back to top button */
  const backToTop = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    if (!backToTop) return;
    backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
  });
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* Testimonial carousel */
  const track = document.querySelector(".testimonial-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  let testimonialIndex = 0;

  function updateCarousel() {
    if (!track) return;
    const offset = testimonialIndex * -100;
    track.style.transform = `translateX(${offset}%)`;
  }
  function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % cards.length;
    updateCarousel();
  }
  function prevTestimonial() {
    testimonialIndex = (testimonialIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  }
  nextBtn?.addEventListener("click", nextTestimonial);
  prevBtn?.addEventListener("click", prevTestimonial);
  setInterval(nextTestimonial, 8000);

  /* Contact form validation */
  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    const fields = ["name", "email", "subject", "message"];
    fields.forEach((id) => {
      const input = document.getElementById(id);
      const error = input?.parentElement?.querySelector(".form-error");
      if (!input || !error) return;
      if (!input.value.trim()) {
        error.textContent = "This field is required.";
        valid = false;
      } else if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        error.textContent = "Please enter a valid email address.";
        valid = false;
      } else {
        error.textContent = "";
      }
    });
    if (valid) {
      alert("Thank you for your message. This demo form does not send emails, but your input was validated successfully.");
      form.reset();
    }
  });

  /* Timeline subtle animation (already handled by reveal, but ensure markers pulse) */
  const timelineMarkers = document.querySelectorAll(".timeline-marker, .education-marker");
  timelineMarkers.forEach((marker) => {
    marker.style.transition = "box-shadow 0.4s ease-out, transform 0.4s ease-out";
  });

  /* Year in footer */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
})();
