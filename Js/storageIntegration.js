// Integration script for HoangCrypto Data Storage
// Add this script to your HTML pages to enable data storage functionality

(function () {
  "use strict";

  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeStorage);
  } else {
    initializeStorage();
  }

  function initializeStorage() {
    console.log("Initializing HoangCrypto Data Storage...");

    // Auto-detect and setup forms
    setupAutoDetectedForms();

    // Setup theme persistence
    setupThemePersistence();

    // Setup language preferences
    setupLanguagePersistence();

    // Setup country selection persistence
    setupCountryPersistence();

    console.log("Data storage initialization complete");
  }

  function setupAutoDetectedForms() {
    // Login forms
    const loginForms = document.querySelectorAll(
      'form[id*="login"], .login-form, form[class*="login"]'
    );
    loginForms.forEach((form) => {
      if (form.id) {
        enableFormStorage(form.id, ["password"]);
        console.log(`Auto-storage enabled for login form: ${form.id}`);
      }
    });

    // Signup forms
    const signupForms = document.querySelectorAll(
      'form[id*="signup"], .signup-form, form[class*="signup"]'
    );
    signupForms.forEach((form) => {
      if (form.id) {
        enableFormStorage(form.id, [
          "password",
          "confirmPassword",
          "confirm_password",
        ]);
        console.log(`Auto-storage enabled for signup form: ${form.id}`);
      }
    });

    // Reset password forms
    const resetForms = document.querySelectorAll(
      'form[id*="reset"], .reset-form, form[class*="reset"]'
    );
    resetForms.forEach((form) => {
      if (form.id) {
        enableFormStorage(form.id, [
          "password",
          "newPassword",
          "confirmPassword",
        ]);
        console.log(`Auto-storage enabled for reset form: ${form.id}`);
      }
    });

    // Generic forms with data-storage attribute
    const storageForms = document.querySelectorAll('form[data-storage="true"]');
    storageForms.forEach((form) => {
      if (form.id) {
        const excludeFields = form.dataset.excludeFields
          ? form.dataset.excludeFields.split(",").map((f) => f.trim())
          : ["password"];
        enableFormStorage(form.id, excludeFields);
        console.log(`Auto-storage enabled for form: ${form.id}`);
      }
    });
  }

  function enableFormStorage(formId, excludeFields = []) {
    const form = document.getElementById(formId);
    if (!form) return;

    // Load saved data immediately
    setTimeout(() => {
      dataStorage.loadFormData(formId, excludeFields);
    }, 100);

    // Auto-save on input changes
    let saveTimeout;
    form.addEventListener("input", function (e) {
      // Don't save password fields
      if (
        excludeFields.includes(e.target.name) ||
        e.target.type === "password"
      ) {
        return;
      }

      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        dataStorage.saveFormData(formId, excludeFields);
      }, 1000);
    });

    // Save on form submission (before actual submit)
    form.addEventListener("submit", function (e) {
      dataStorage.saveFormData(formId, excludeFields);
    });
  }

  function setupThemePersistence() {
    // Load saved theme
    const savedTheme = dataStorage.getData("theme_preference");
    if (savedTheme) {
      applyTheme(savedTheme.theme);
    }

    // Listen for theme changes
    const themeToggle = document.querySelector(".theme-toggle-btn");
    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        setTimeout(() => {
          const isLight = document.body.classList.contains("light-mode");
          const theme = isLight ? "light" : "dark";

          dataStorage.saveData("theme_preference", {
            theme: theme,
            timestamp: Date.now(),
          });

          console.log("Theme saved:", theme);
        }, 100);
      });
    }

    // Observer for theme changes (in case theme is changed programmatically)
    if (window.MutationObserver) {
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            const isLight = document.body.classList.contains("light-mode");
            const theme = isLight ? "light" : "dark";

            dataStorage.saveData("theme_preference", {
              theme: theme,
              timestamp: Date.now(),
            });
          }
        });
      });

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }
  }

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }

  function setupLanguagePersistence() {
    // Load saved language
    const savedLang = dataStorage.getData("language_preference");
    if (savedLang) {
      // Apply saved language (you can customize this based on your language system)
      console.log("Loaded saved language:", savedLang.language);
    }

    // Listen for language selection
    const languageItems = document.querySelectorAll(".language-option-item");
    languageItems.forEach((item) => {
      item.addEventListener("click", function () {
        const language = this.textContent.trim();

        dataStorage.saveData("language_preference", {
          language: language,
          timestamp: Date.now(),
        });

        console.log("Language saved:", language);
      });
    });
  }

  function setupCountryPersistence() {
    // Load saved country
    const savedCountry = dataStorage.getData("country_preference");
    if (savedCountry) {
      // Apply saved country selection
      const countrySelect = document.querySelector(".country-select");
      if (countrySelect) {
        countrySelect.textContent = savedCountry.country;
      }
    }

    // Listen for country selection
    const countryItems = document.querySelectorAll(".country-item");
    countryItems.forEach((item) => {
      item.addEventListener("click", function () {
        const countryName =
          this.querySelector(".country-name")?.textContent || "";
        const countryCode =
          this.querySelector(".country-code")?.textContent || "";

        if (countryName) {
          dataStorage.saveData("country_preference", {
            country: countryName,
            code: countryCode,
            timestamp: Date.now(),
          });

          console.log("Country saved:", countryName);
        }
      });
    });
  }

  // Utility function to clear form data
  function clearFormData(formId) {
    if (confirm("Are you sure you want to clear saved form data?")) {
      dataStorage.removeData(`form_${formId}`);
      console.log(`Form data cleared for: ${formId}`);

      // Reload the page to reset the form
      if (confirm("Reload page to reset form?")) {
        location.reload();
      }
    }
  }

  // Utility function to export user data
  function exportUserData() {
    const stats = dataStorage.getStorageStats();
    const allData = {};

    if (stats && stats.items) {
      stats.items.forEach((item) => {
        allData[item.key] = dataStorage.getData(item.key);
      });
    }

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(dataBlob);
    link.download = `hoangcrypto_data_${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();

    console.log("User data exported");
  }

  // Add global utilities
  window.HoangCryptoUtils = {
    clearFormData: clearFormData,
    exportData: exportUserData,
    getStorageStats: () => dataStorage.getStorageStats(),
    clearAllData: () => {
      if (
        confirm(
          "Are you sure you want to clear all saved data? This action cannot be undone."
        )
      ) {
        dataStorage.clearAllData();
        alert("All data cleared successfully!");
        location.reload();
      }
    },
  };

  // Add keyboard shortcuts for development
  document.addEventListener("keydown", function (e) {
    // Ctrl+Shift+S: Show storage stats
    if (e.ctrlKey && e.shiftKey && e.key === "S") {
      e.preventDefault();
      const stats = dataStorage.getStorageStats();
      console.table(stats.items);
      console.log("Total storage:", stats.totalSizeFormatted);
    }

    // Ctrl+Shift+C: Clear all data
    if (e.ctrlKey && e.shiftKey && e.key === "C") {
      e.preventDefault();
      window.HoangCryptoUtils.clearAllData();
    }

    // Ctrl+Shift+E: Export data
    if (e.ctrlKey && e.shiftKey && e.key === "E") {
      e.preventDefault();
      exportUserData();
    }
  });
})();
