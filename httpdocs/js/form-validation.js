document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#contactForm");
    if (!form) return;
  
    form.addEventListener("submit", (e) => {
      clearErrors();
      let valid = true;
  
      const required = form.querySelectorAll("[data-required]");
      required.forEach(field => {
        if (!field.value.trim()) {
          showError(field, "This field is required");
          valid = false;
        }
      });
  
      const email = form.querySelector('input[type="email"]');
      if (email && !email.validity.valid) {
        showError(email, "Enter a valid email address");
        valid = false;
      }
  
      if (!valid) e.preventDefault();
    });
  
    function showError(input, message) {
      input.classList.add("is-invalid");
  
      const error = document.createElement("div");
      error.className = "field-error";
      error.textContent = message;
  
      input.closest("p")?.appendChild(error);
    }
  
    function clearErrors() {
      document.querySelectorAll(".field-error").forEach(e => e.remove());
      document.querySelectorAll(".is-invalid").forEach(e => e.classList.remove("is-invalid"));
    }
  });
  