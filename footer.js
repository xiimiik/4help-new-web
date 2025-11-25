// Footer toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const fillFormBtn = document.getElementById("fillFormBtn");
  const fillFormBtnOpen = document.getElementById("fillFormBtnOpen");
  const contactMeBtn = document.getElementById("contactMeBtn");
  const footerClosed = document.getElementById("footerClosed");
  const footerForm = document.getElementById("footerForm");
  const submitButton = document.getElementById("submitButton");
  const agreeCheckbox = document.getElementById("agreeCheckbox");
  const textarea = document.querySelector(".new-footer__textarea");
  const charCount = document.querySelector(".new-footer__char-count");

  // Google Form URL - TODO: Replace with actual Google Form URL
  // Example: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform'
  const GOOGLE_FORM_URL = "https://forms.google.com/YOUR_FORM_ID";

  // Open Google Form in new tab (from closed state)
  if (fillFormBtn) {
    fillFormBtn.addEventListener("click", function () {
      window.open(GOOGLE_FORM_URL, "_blank");
    });
  }

  // Open Google Form in new tab (from open state)
  if (fillFormBtnOpen) {
    fillFormBtnOpen.addEventListener("click", function () {
      window.open(GOOGLE_FORM_URL, "_blank");
    });
  }

  // Show contact form
  if (contactMeBtn) {
    contactMeBtn.addEventListener("click", function () {
      footerClosed.classList.add("hidden");
      footerForm.classList.add("active");

      // Smooth scroll to form
      footerForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  // Character counter for textarea
  if (textarea && charCount) {
    textarea.addEventListener("input", function () {
      const length = this.value.length;
      charCount.textContent = `${length}/400`;
    });
  }

  // Enable/disable submit button based on checkbox
  if (agreeCheckbox && submitButton) {
    agreeCheckbox.addEventListener("change", function () {
      submitButton.disabled = !this.checked;
    });
  }

  // Form submission
  if (submitButton) {
    submitButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Add your form submission logic here
      console.log("Form submitted");

      // Example: Reset form and return to closed state
      // footerForm.classList.remove("active");
      // footerClosed.classList.remove("hidden");
    });
  }
});
