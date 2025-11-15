document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle functionality
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
  }

  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      body.classList.toggle("light-mode");

      // Save theme preference
      if (body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
      } else {
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // Language hover panel tabs
  const languageTabs = document.querySelectorAll(".language-tab");
  const languageTabContents = document.querySelectorAll(
    ".language-tab-content"
  );

  languageTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabName = this.dataset.tab;

      // Remove active class from all tabs
      languageTabs.forEach((t) => t.classList.remove("active"));
      languageTabContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");
      document
        .querySelector(`.language-tab-content[data-content="${tabName}"]`)
        .classList.add("active");
    });
  });

  // Language/Currency option selection
  const languageOptions = document.querySelectorAll(".language-option-item");

  languageOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const parent = this.closest(".language-tab-content");
      const siblings = parent.querySelectorAll(".language-option-item");

      // Remove active from siblings
      siblings.forEach((sibling) => sibling.classList.remove("active"));

      // Add active to clicked option
      this.classList.add("active");
    });
  });
});
