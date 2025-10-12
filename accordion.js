// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const accordionHeaders = document.querySelectorAll('.new-accordion__header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const accordionItem = this.closest('.new-accordion__item');
      const isActive = accordionItem.classList.contains('new-accordion__item--active');

      // Close all accordion items
      document.querySelectorAll('.new-accordion__item').forEach(item => {
        item.classList.remove('new-accordion__item--active');
      });

      // If the clicked item was not active, open it
      if (!isActive) {
        accordionItem.classList.add('new-accordion__item--active');
      }
    });
  });
});
