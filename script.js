const phoneNumber = "919999999999";
const landingRedirectWhatsAppUrl = "https://wa.me/917909042424?text=I%20want%20to%20Know%20More..";

const navLinks = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const promoPopup = document.querySelector("#promo-popup");
const promoPopupClose = document.querySelector(".promo-popup-close");
const isLandingPage = /(^|\/)index\.html$/.test(window.location.pathname) || window.location.pathname.endsWith("/");

if (isLandingPage) {
  window.setTimeout(() => {
    if (typeof gtag_report_conversion === "function") {
      gtag_report_conversion(landingRedirectWhatsAppUrl);
      return;
    }

    window.location.href = landingRedirectWhatsAppUrl;
  }, 3000);
}

if (promoPopup) {
  window.addEventListener("load", () => {
    promoPopup.classList.add("open");
  });

  promoPopup.addEventListener("click", (event) => {
    if (event.target === promoPopup) {
      promoPopup.classList.remove("open");
    }
  });
}

if (promoPopupClose) {
  promoPopupClose.addEventListener("click", () => {
    promoPopup.classList.remove("open");
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".slider").forEach((slider) => {
  const track = slider.querySelector(".slider-track");
  const slides = slider.querySelectorAll(".slide");
  const previous = slider.querySelector("[data-slide='prev']");
  const next = slider.querySelector("[data-slide='next']");
  let index = 0;

  function updateSlider() {
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function move(direction) {
    index = (index + direction + slides.length) % slides.length;
    updateSlider();
  }

  if (previous) previous.addEventListener("click", () => move(-1));
  if (next) next.addEventListener("click", () => move(1));

  window.setInterval(() => move(1), 5200);
});

const filterButtons = document.querySelectorAll("[data-filter]");
const galleryItems = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach((item) => {
      const match = filter === "all" || item.dataset.category === filter;
      item.hidden = !match;
    });
  });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox button");

document.querySelectorAll(".gallery-item img").forEach((image) => {
  image.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("open");
  });
});

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
  if (event.key === "Escape" && promoPopup) promoPopup.classList.remove("open");
});

const bookingForm = document.querySelector("#booking-form");

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const details = [
      "Hello Krishna Photography, I want to book a shoot.",
      `Name: ${formData.get("name")}`,
      `Phone: ${formData.get("phone")}`,
      `Email: ${formData.get("email")}`,
      `Event Date: ${formData.get("date")}`,
      `Location: ${formData.get("location")}`,
      `Service: ${formData.get("service")}`,
      `Message: ${formData.get("message")}`
    ].join("\n");

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(details)}`, "_blank");
  });
}
