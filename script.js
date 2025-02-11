document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".gallery-item img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  let images = [];

  // Store image sources
  galleryItems.forEach((item) => {
    images.push(item.src);
  });

  // Open lightbox and display clicked image
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add("show");
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  // Close lightbox when clicking outside image
  lightbox.addEventListener("click", function (event) {
    if (
      event.target !== lightboxImg &&
      event.target !== prevBtn &&
      event.target !== nextBtn
    ) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (event) {
    if (lightbox.classList.contains("show")) {
      if (event.key === "ArrowLeft") prevImage();
      if (event.key === "ArrowRight") nextImage();
      if (event.key === "Escape") closeLightbox();
    }
  });

  // Attach functions globally so buttons can call them
  window.closeLightbox = closeLightbox;
  window.prevImage = prevImage;
  window.nextImage = nextImage;
});
