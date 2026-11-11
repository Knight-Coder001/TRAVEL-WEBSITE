const galleryItems = [...document.querySelectorAll(".gallery-item")];
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("lightbox-caption");

let currentIndex = 0;
let visibleItems = [];

// FILTER GALLERY

function updateVisibleItems() {
  visibleItems = galleryItems.filter(
    (item) => !item.classList.contains("hide"),
  );
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.filter;

    galleryItems.forEach((item) => {
      const matches = category === "all" || item.dataset.category === category;

      item.classList.toggle("hide", !matches);
    });

    updateVisibleItems();
  });
});

// OPEN LIGHTBOX

function openLightbox(index) {
  updateVisibleItems();

  currentIndex = index;
  const item = visibleItems[currentIndex];

  if (!item) return;

  const img = item.querySelector("img");
  const title = item.querySelector(".image-overlay span");

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  caption.textContent = title ? title.textContent : img.alt;

  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

// IMAGE CLICK

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    updateVisibleItems();

    const index = visibleItems.indexOf(item);
    openLightbox(index);
  });
});

// NEXT IMAGE

function nextImage() {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  openLightbox(currentIndex);
}

// PREVIOUS IMAGE

function previousImage() {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;

  openLightbox(currentIndex);
}

// CLOSE LIGHTBOX

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

document
  .querySelector(".close-lightbox")
  .addEventListener("click", closeLightbox);

document.querySelector(".lightbox-next").addEventListener("click", nextImage);

document
  .querySelector(".lightbox-prev")
  .addEventListener("click", previousImage);

// KEYBOARD NAVIGATION

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("show")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") nextImage();
  if (event.key === "ArrowLeft") previousImage();
});

// CLOSE WHEN BACKGROUND IS CLICKED

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// INITIALIZE

updateVisibleItems();
