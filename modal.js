// Modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".new-modal");
  const modalContainer = document.querySelector(".new-modal__container");
  const closeBtn = document.querySelector(".new-modal__close");
  const overlay = document.querySelector(".new-modal__overlay");
  const expandBtn = document.querySelector(".new-modal__btn--text");
  const form = document.querySelector(".new-modal__form");
  const textarea = document.querySelector(".new-modal__textarea");
  const charCount = document.querySelector(".new-modal__char-count");
  const checkbox = document.querySelector(".new-modal__checkbox-input");
  const submitBtn = document.querySelector(".new-modal__submit");

  // Show modal on page load
  function showModal() {
    modal.classList.add("new-modal--active");
    document.body.classList.add("modal-open");
  }

  // Hide modal
  function hideModal() {
    modal.classList.remove("new-modal--active");
    document.body.classList.remove("modal-open");
    // Reset to collapsed state
    modalContainer.classList.remove("new-modal__container--expanded");
  }

  // Expand modal
  function expandModal() {
    modalContainer.classList.add("new-modal__container--expanded");
  }

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener("click", hideModal);
  }

  // Overlay click
  if (overlay) {
    overlay.addEventListener("click", hideModal);
  }

  // Expand button
  if (expandBtn) {
    expandBtn.addEventListener("click", expandModal);
  }

  // Character counter for textarea
  if (textarea && charCount) {
    textarea.addEventListener("input", function () {
      const length = this.value.length;
      charCount.textContent = `${length}/400`;
    });
  }

  // Form validation
  function validateForm() {
    const name = document.querySelector('input[name="name"]');
    const phone = document.querySelector('input[name="phone"]');
    const contact = document.querySelector('select[name="contact"]');
    const service = document.querySelector('select[name="service"]');
    const question = document.querySelector('textarea[name="question"]');

    if (
      name &&
      phone &&
      contact &&
      service &&
      question &&
      checkbox &&
      name.value.trim() &&
      phone.value.trim() &&
      contact.value &&
      service.value &&
      question.value.trim() &&
      checkbox.checked
    ) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  // Add event listeners for form validation
  if (form) {
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("input", validateForm);
      input.addEventListener("change", validateForm);
    });

    if (checkbox) {
      checkbox.addEventListener("change", validateForm);
    }
  }

  // Form submission
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Handle form submission here
      console.log("Form submitted");
      hideModal();
    });
  }

  // Primary button (Google Form)
  const primaryBtn = document.querySelector(
    ".new-modal__btn--primary:not(.new-modal__submit)"
  );
  if (primaryBtn) {
    primaryBtn.addEventListener("click", function () {
      // Open Google Form in new tab
      window.open("YOUR_GOOGLE_FORM_URL", "_blank");
    });
  }

  // Show modal on page load
  showModal();

  // ESC key to close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("new-modal--active")) {
      hideModal();
    }
  });
});
