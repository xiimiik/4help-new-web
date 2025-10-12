// Mobile burger menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.new-header');
  const burger = document.querySelector('.new-header__burger');

  if (burger) {
    burger.addEventListener('click', function() {
      header.classList.toggle('new-header--open');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.new-header__link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        header.classList.remove('new-header--open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!header.contains(event.target)) {
        header.classList.remove('new-header--open');
      }
    });
  }
});
