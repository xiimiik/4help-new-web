document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".new-carousel");
  if (!carousel) return;

  const slides = carousel.querySelectorAll(".new-carousel__slide");
  const dotsContainer = carousel.querySelector(".new-carousel__dots");
  const prevButton = carousel.querySelector(".new-carousel__arrow--prev");
  const nextButton = carousel.querySelector(".new-carousel__arrow--next");

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Generate dots
  function generateDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("span");
      dot.classList.add("new-carousel__dot");
      if (i === 0) {
        dot.classList.add("new-carousel__dot--active");
      }

      dot.addEventListener("click", () => {
        currentSlide = i;
        showSlide(currentSlide);
      });

      dotsContainer.appendChild(dot);
    }
  }

  // Show slide
  function showSlide(index) {
    slides.forEach((slide) =>
      slide.classList.remove("new-carousel__slide--active")
    );

    const allDots = carousel.querySelectorAll(".new-carousel__dot");
    allDots.forEach((dot) => dot.classList.remove("new-carousel__dot--active"));

    slides[index].classList.add("new-carousel__slide--active");

    if (allDots[index]) {
      allDots[index].classList.add("new-carousel__dot--active");
    }
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Initialize
  generateDots();

  // Event listeners
  if (prevButton) {
    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      prevSlide();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      nextSlide();
    });
  }

  // Auto-play
  setInterval(nextSlide, 5000);
});
