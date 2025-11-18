// Data Storage Manager for HoangCrypto
// Handles saving and retrieving form data from localStorage

class DataStorageManager {
  constructor() {
    this.storagePrefix = "hoangcrypto_";
  }

  // Save data to localStorage
  saveData(key, data) {
    try {
      const fullKey = this.storagePrefix + key;
      const jsonData = JSON.stringify(data);
      localStorage.setItem(fullKey, jsonData);
      console.log(`Data saved successfully: ${key}`);
      return true;
    } catch (error) {
      console.error("Error saving data:", error);
      return false;
    }
  }

  // Retrieve data from localStorage
  getData(key) {
    try {
      const fullKey = this.storagePrefix + key;
      const jsonData = localStorage.getItem(fullKey);
      if (jsonData) {
        return JSON.parse(jsonData);
      }
      return null;
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  }

  // Remove specific data from localStorage
  removeData(key) {
    try {
      const fullKey = this.storagePrefix + key;
      localStorage.removeItem(fullKey);
      console.log(`Data removed successfully: ${key}`);
      return true;
    } catch (error) {
      console.error("Error removing data:", error);
      return false;
    }
  }

  // Clear all HoangCrypto data from localStorage
  clearAllData() {
    try {
      const keys = Object.keys(localStorage);
      const hoangCryptoKeys = keys.filter((key) =>
        key.startsWith(this.storagePrefix)
      );

      hoangCryptoKeys.forEach((key) => {
        localStorage.removeItem(key);
      });

      console.log("All HoangCrypto data cleared successfully");
      return true;
    } catch (error) {
      console.error("Error clearing data:", error);
      return false;
    }
  }

  // Save form data automatically
  saveFormData(formId, excludeFields = []) {
    try {
      const form = document.getElementById(formId);
      if (!form) {
        console.error(`Form with id '${formId}' not found`);
        return false;
      }

      const formData = {};
      const inputs = form.querySelectorAll("input, select, textarea");

      inputs.forEach((input) => {
        if (!excludeFields.includes(input.name) && input.name) {
          if (input.type === "checkbox") {
            formData[input.name] = input.checked;
          } else if (input.type === "radio") {
            if (input.checked) {
              formData[input.name] = input.value;
            }
          } else if (input.type !== "password") {
            // Exclude password fields for security
            formData[input.name] = input.value;
          }
        }
      });

      return this.saveData(`form_${formId}`, formData);
    } catch (error) {
      console.error("Error saving form data:", error);
      return false;
    }
  }

  // Load form data automatically
  loadFormData(formId, excludeFields = []) {
    try {
      const formData = this.getData(`form_${formId}`);
      if (!formData) {
        console.log(`No saved data found for form: ${formId}`);
        return false;
      }

      const form = document.getElementById(formId);
      if (!form) {
        console.error(`Form with id '${formId}' not found`);
        return false;
      }

      Object.keys(formData).forEach((fieldName) => {
        if (!excludeFields.includes(fieldName)) {
          const input = form.querySelector(`[name="${fieldName}"]`);
          if (input) {
            if (input.type === "checkbox") {
              input.checked = formData[fieldName];
            } else if (input.type === "radio") {
              if (input.value === formData[fieldName]) {
                input.checked = true;
              }
            } else if (input.type !== "password") {
              input.value = formData[fieldName];
            }
          }
        }
      });

      console.log(`Form data loaded successfully: ${formId}`);
      return true;
    } catch (error) {
      console.error("Error loading form data:", error);
      return false;
    }
  }

  // Save user preferences
  saveUserPreferences(preferences) {
    return this.saveData("user_preferences", preferences);
  }

  // Get user preferences
  getUserPreferences() {
    return this.getData("user_preferences") || {};
  }

  // Save user session data
  saveUserSession(sessionData) {
    return this.saveData("user_session", sessionData);
  }

  // Get user session data
  getUserSession() {
    return this.getData("user_session");
  }

  // Save login data (excluding sensitive information)
  saveLoginData(loginData) {
    const safeLoginData = {
      email: loginData.email,
      rememberMe: loginData.rememberMe,
      lastLoginTime: new Date().toISOString(),
    };
    return this.saveData("login_data", safeLoginData);
  }

  // Get login data
  getLoginData() {
    return this.getData("login_data");
  }

  // Save signup progress
  saveSignupProgress(signupData) {
    const safeSignupData = {
      email: signupData.email,
      phone: signupData.phone,
      country: signupData.country,
      agreedToTerms: signupData.agreedToTerms,
      step: signupData.step || 1,
    };
    return this.saveData("signup_progress", safeSignupData);
  }

  // Get signup progress
  getSignupProgress() {
    return this.getData("signup_progress");
  }

  // Auto-save functionality for forms
  enableAutoSave(
    formId,
    saveInterval = 30000,
    excludeFields = ["password", "confirmPassword"]
  ) {
    const form = document.getElementById(formId);
    if (!form) {
      console.error(`Form with id '${formId}' not found`);
      return false;
    }

    // Save on input change
    form.addEventListener("input", (e) => {
      clearTimeout(this.autoSaveTimeout);
      this.autoSaveTimeout = setTimeout(() => {
        this.saveFormData(formId, excludeFields);
      }, 1000); // Delay 1 second after last input
    });

    // Save periodically
    setInterval(() => {
      this.saveFormData(formId, excludeFields);
    }, saveInterval);

    // Load existing data on page load
    document.addEventListener("DOMContentLoaded", () => {
      this.loadFormData(formId, excludeFields);
    });

    console.log(`Auto-save enabled for form: ${formId}`);
    return true;
  }

  // Get storage usage statistics
  getStorageStats() {
    try {
      const keys = Object.keys(localStorage);
      const hoangCryptoKeys = keys.filter((key) =>
        key.startsWith(this.storagePrefix)
      );

      let totalSize = 0;
      const items = [];

      hoangCryptoKeys.forEach((key) => {
        const value = localStorage.getItem(key);
        const size = new Blob([value]).size;
        totalSize += size;

        items.push({
          key: key.replace(this.storagePrefix, ""),
          size: size,
          sizeFormatted: this.formatBytes(size),
        });
      });

      return {
        totalItems: hoangCryptoKeys.length,
        totalSize: totalSize,
        totalSizeFormatted: this.formatBytes(totalSize),
        items: items,
      };
    } catch (error) {
      console.error("Error getting storage stats:", error);
      return null;
    }
  }

  // Format bytes to human readable format
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}

// Initialize global instance
const dataStorage = new DataStorageManager();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = DataStorageManager;
}
