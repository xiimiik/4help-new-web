// Steps scroll animation
function initStepsAnimation() {
  const section = document.getElementById("steps-section");
  const button = document.querySelector(".new-steps__button");
  const progressLine = document.querySelector(".new-steps__line-progress");
  const timeline = document.querySelector(".new-steps__timeline");
  const content = document.querySelector(".new-steps__content");

  if (!section || !button || !progressLine || !timeline || !content) return;

  function updateProgress() {
    const sectionRect = section.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const lineContainerRect = document
      .querySelector(".new-steps__line-container")
      .getBoundingClientRect();

    // Calculate the button's position relative to the line container
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    const lineContainerTop = lineContainerRect.top;

    // Calculate progress line height (from top of line container to button center)
    const progressHeight = Math.max(0, buttonCenterY - lineContainerTop - 24);

    // Update progress line height
    progressLine.style.height = `${progressHeight}px`;
  }

  // Use requestAnimationFrame for smooth updates
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress(); // Initial call
}

// Requests scroll animation
function initRequestsScroll() {
  const wrapper = document.querySelector(".new-requests-wrapper");
  const section = document.querySelector(".new-requests");
  const evenWrapper = document.querySelector(
    ".new-requests__problems-wrapper--even"
  );
  const oddWrapper = document.querySelector(
    ".new-requests__problems-wrapper--odd"
  );

  if (!wrapper || !section || !evenWrapper || !oddWrapper) return;

  function updateScroll() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperTop = wrapperRect.top;
    const wrapperHeight = wrapper.offsetHeight;
    const sectionHeight = 830;
    const headerOffset = 106;

    if (
      wrapperTop <= headerOffset &&
      wrapperRect.bottom >= sectionHeight + headerOffset
    ) {
      const scrolled = Math.abs(wrapperTop - headerOffset);
      const scrollableDistance = wrapperHeight - sectionHeight - headerOffset;
      const progress = Math.min(scrolled / scrollableDistance, 1);

      const contentHeight = oddWrapper.scrollHeight;
      const visibleHeight = sectionHeight;
      const maxTranslate = contentHeight - visibleHeight;
      const translateY = progress * maxTranslate;

      evenWrapper.style.transform = `translateY(-${translateY}px)`;
      oddWrapper.style.transform = `translateY(-${translateY}px)`;
    } else if (wrapperTop > headerOffset) {
      evenWrapper.style.transform = "translateY(0)";
      oddWrapper.style.transform = "translateY(0)";
    }
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateScroll);
  updateScroll();
}

// Update copyright year
function updateCopyrightYear() {
  const copyrightElement = document.querySelector(".copyright-text");
  if (copyrightElement) {
    copyrightElement.textContent = `Copyright 4help © ${new Date().getFullYear()}`;
  }
}

// Hero parallax effect
function initHeroParallax() {
  const heroImages = document.querySelectorAll(".new-hero__image");
  
  if (!heroImages.length) return;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector(".new-hero");
    
    if (!heroSection) return;
    
    const heroBottom = heroSection.offsetHeight;
    
    // Only apply parallax while hero is visible
    if (scrolled < heroBottom) {
      heroImages.forEach((image, index) => {
        // Different speeds for each image
        const speed = 0.3 + (index * 0.1);
        const yPos = scrolled * speed;
        
        // Apply transform while preserving animations
        image.style.transform = `translateY(${yPos}px)`;
      });
    }
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateParallax();
}

// Features scroll animation
function initFeaturesAnimation() {
  const containers = document.querySelectorAll(".new-features__container");
  
  if (!containers.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          
          // Counter animation for numbers in title
          const title = entry.target.querySelector(".new-features__title");
          if (title) {
            const text = title.textContent;
            const numberMatch = text.match(/\d+/);
            
            if (numberMatch) {
              const targetNumber = parseInt(numberMatch[0]);
              const duration = 1000; // 1 second
              const steps = 50;
              const increment = targetNumber / steps;
              const stepDuration = duration / steps;
              let currentNumber = 0;
              
              const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                  currentNumber = targetNumber;
                  clearInterval(counter);
                }
                title.textContent = text.replace(/\d+/, Math.floor(currentNumber));
              }, stepDuration);
            }
          }
          
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  containers.forEach((container) => {
    observer.observe(container);
  });
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initHeroParallax();
    initStepsAnimation();
    initRequestsScroll();
    initFeaturesAnimation();
    updateCopyrightYear();
  });
} else {
  initHeroParallax();
  initStepsAnimation();
  initRequestsScroll();
  initFeaturesAnimation();
  updateCopyrightYear();
}
