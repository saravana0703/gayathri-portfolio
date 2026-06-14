/* =========================================================
   PREMIUM EXECUTIVE INTERACTION LAYER — script.js
   Matches FULL-STANDARD CSS + Executive Presentation HTML
   ========================================================= */

/* ------------------------------
   1. LOADER
------------------------------ */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => loader.remove(), 400);
  }, 600);
});

/* ------------------------------
   2. SCROLL PROGRESS BAR
------------------------------ */
const progressBar = document.getElementById("scrollProgressBar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";
});

/* ------------------------------
   3. BACK TO TOP BUTTON
------------------------------ */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ------------------------------
   4. CURSOR GLOW EFFECT
------------------------------ */
const cursorGlow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.opacity = 1;
  cursorGlow.style.transform = `translate(${e.clientX - 90}px, ${e.clientY - 90}px)`;
});

/* ------------------------------
   5. THEME TOGGLE (Light / Dark)
------------------------------ */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
});

/* ------------------------------
   6. ACTIVE NAV LINK HIGHLIGHT
------------------------------ */
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  let currentSection = "";

  document.querySelectorAll("section").forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
}

window.addEventListener("scroll", updateActiveNav);

/* ------------------------------
   7. SCROLL REVEAL ANIMATIONS
------------------------------ */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) el.classList.add("visible");
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ------------------------------
   8. TESTIMONIAL CAROUSEL
------------------------------ */
const track = document.getElementById("testimonialTrack");
const prev = document.getElementById("testimonialPrev");
const next = document.getElementById("testimonialNext");

let testimonialIndex = 0;
const testimonialCount = track.children.length;

function updateTestimonial() {
  track.style.transform = `translateX(-${testimonialIndex * 100}%)`;
}

prev.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + testimonialCount) % testimonialCount;
  updateTestimonial();
});

next.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonialCount;
  updateTestimonial();
});

/* ------------------------------
   9. CONTACT FORM VALIDATION
------------------------------ */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    const fields = ["name", "email", "subject", "message"];

    fields.forEach((field) => {
      const input = document.getElementById(field);
      const error = document.querySelector(`[data-error-for="${field}"]`);

      if (!input.value.trim()) {
        valid = false;
        error.textContent = "This field is required.";
        input.classList.add("error");
      } else {
        error.textContent = "";
        input.classList.remove("error");
      }

      if (field === "email" && input.value.trim()) {
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        if (!emailValid) {
          valid = false;
          error.textContent = "Enter a valid email address.";
        }
      }
    });

    if (valid) {
      alert("Thank you! Your message has been sent.");
      contactForm.reset();
    }
  });
}

/* ------------------------------
   10. SMOOTH SCROLL FOR NAV LINKS
------------------------------ */
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

/* ------------------------------
   11. SAFETY: PREVENT SHIFT ON HOVER
------------------------------ */
document.querySelectorAll(".expertise-card, .impact-card, .timeline-content, .project-card")
  .forEach((card) => {
    card.style.willChange = "transform, box-shadow";
  });

/* ------------------------------
   12. YEAR AUTO-UPDATE
------------------------------ */
document.getElementById("year").textContent = new Date().getFullYear();
