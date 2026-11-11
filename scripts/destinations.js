// ================= MOBILE NAVIGATION =================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  menuToggle.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

// Close navigation when a link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});

// ================= DESTINATION SCROLL ANIMATION =================

const destinationCards = document.querySelectorAll(".destination-card");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${(index % 2) * 0.12}s`;

        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

destinationCards.forEach((card) => {
  observer.observe(card);
});
