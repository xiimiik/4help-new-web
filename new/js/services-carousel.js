// Services Carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing carousel...");

  const carousel = document.querySelector(".new-services__carousel");
  if (!carousel) {
    console.error("Carousel not found!");
    return;
  }
  console.log("Carousel found:", carousel);

  const slides = carousel.querySelectorAll(".new-services__slide");
  const dotsContainer = carousel.querySelector(".new-services__dots");
  const prevButton = carousel.querySelector(".new-services__arrow--prev");
  const nextButton = carousel.querySelector(".new-services__arrow--next");

  console.log("Elements found:", {
    slides: slides.length,
    dotsContainer: dotsContainer,
    prevButton: prevButton,
    nextButton: nextButton,
  });

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Dynamically generate dots based on number of slides
  function generateDots() {
    if (!dotsContainer) {
      console.error("Dots container not found!");
      return;
    }

    console.log("Generating", totalSlides, "dots...");
    dotsContainer.innerHTML = ""; // Clear existing dots

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("span");
      dot.classList.add("new-services__dot");
      if (i === 0) {
        dot.classList.add("new-services__dot--active");
      }

      // Add click event to each dot
      dot.addEventListener("click", () => {
        console.log("Dot", i, "clicked");
        currentSlide = i;
        showSlide(currentSlide);
      });

      dotsContainer.appendChild(dot);
    }
    console.log("Dots generated:", dotsContainer.children.length);
  }

  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class from all slides
    slides.forEach((slide) =>
      slide.classList.remove("new-services__slide--active")
    );

    // Remove active class from all dots
    const allDots = carousel.querySelectorAll(".new-services__dot");
    allDots.forEach((dot) => dot.classList.remove("new-services__dot--active"));

    // Add active class to current slide
    slides[index].classList.add("new-services__slide--active");

    // Add active class to corresponding dot
    if (allDots[index]) {
      allDots[index].classList.add("new-services__dot--active");
    }
  }

  // Function to go to next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  // Function to go to previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Initialize dots
  generateDots();

  // Event listeners for navigation buttons
  if (prevButton) {
    console.log("Adding event listener to prev button");
    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Prev button clicked!");
      prevSlide();
    });
  } else {
    console.error("Prev button not found!");
  }

  if (nextButton) {
    console.log("Adding event listener to next button");
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Next button clicked!");
      nextSlide();
    });
  } else {
    console.error("Next button not found!");
  }

  console.log("Carousel initialization complete!");

  // Optional: Auto-play carousel (uncomment if needed)
  // setInterval(nextSlide, 5000); // Change slide every 5 seconds
});
