// Education horizontal scroll animation
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".new-education-wrapper");
  const section = document.querySelector(".new-education");
  const cards = document.querySelector(".new-education__cards");

  if (!wrapper || !section || !cards) return;

  let ticking = false;

  function updateCardsPosition() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperTop = wrapperRect.top;
    const wrapperHeight = wrapperRect.height;
    const wrapperBottom = wrapperRect.bottom;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate dynamic translateY for section centering
    let translateY = 0;

    // If wrapper is taller than viewport, center the section
    if (wrapperTop <= 0 && wrapperBottom >= windowHeight) {
      // Section is in "active scroll zone" - center it
      translateY = (windowHeight - sectionHeight) / 2;
    } else if (wrapperTop > 0) {
      // Wrapper is entering from bottom - keep section at top
      translateY = Math.max(
        0,
        Math.min(wrapperTop, (windowHeight - sectionHeight) / 2)
      );
    } else if (wrapperBottom < windowHeight) {
      // Wrapper is exiting from top - keep section from going too low
      const maxY = (windowHeight - sectionHeight) / 2;
      const bottomOffset = windowHeight - wrapperBottom;
      translateY = Math.max(0, maxY - bottomOffset);
    }

    // Calculate scroll progress through the wrapper
    const centerY = (windowHeight - sectionHeight) / 2;
    const scrollStart = centerY;
    const scrollEnd = -(wrapperHeight - windowHeight - centerY);
    const scrollRange = scrollStart - scrollEnd;

    // Calculate progress (0 to 1)
    const scrollProgress = Math.max(
      0,
      Math.min(1, (scrollStart - wrapperTop) / scrollRange)
    );

    // Calculate horizontal translation
    // Cards move from left (0) to right (negative translateX)
    const sectionWidth = section.offsetWidth;
    const cardsWidth = cards.scrollWidth;
    const maxTranslate = -(cardsWidth - sectionWidth + 64); // 64px for padding

    const translateX = maxTranslate * scrollProgress;

    // Apply both transforms
    section.style.transform = `translateY(${translateY}px)`;
    cards.style.transform = `translateX(${translateX}px)`;

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateCardsPosition);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", updateCardsPosition);
  updateCardsPosition(); // Initial position
});
