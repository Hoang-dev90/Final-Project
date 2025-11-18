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
// Tab switching
const emailTab = document.getElementById("emailTab");
const mobileTab = document.getElementById("mobileTab");
const emailInput = document.getElementById("emailInput");
const mobileInput = document.getElementById("mobileInput");

emailTab.addEventListener("click", () => {
  emailTab.classList.add("active");
  mobileTab.classList.remove("active");
  emailInput.style.display = "block";
  mobileInput.style.display = "none";
});

mobileTab.addEventListener("click", () => {
  mobileTab.classList.add("active");
  emailTab.classList.remove("active");
  emailInput.style.display = "none";
  mobileInput.style.display = "block";
});

// Country selector
const countrySelect = document.getElementById("countrySelect");
const countryDropdown = document.getElementById("countryDropdown");
const countryList = document.getElementById("countryList");
const selectedFlag = document.getElementById("selectedFlag");
const selectedCode = document.getElementById("selectedCode");

countrySelect.addEventListener("click", (e) => {
  e.stopPropagation();
  countryDropdown.style.display =
    countryDropdown.style.display === "none" ? "block" : "none";
});

countryList.addEventListener("click", (e) => {
  const countryItem = e.target.closest(".country-item");
  if (countryItem) {
    const code = countryItem.dataset.code;
    const flag = countryItem.dataset.flag;
    selectedCode.textContent = code;
    selectedFlag.src = `https://flagcdn.com/w20/${flag}.png`;
    countryDropdown.style.display = "none";
  }
});

document.addEventListener("click", () => {
  countryDropdown.style.display = "none";
});

// Country search
const countrySearch = document.getElementById("countrySearch");
countrySearch.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const items = countryList.querySelectorAll(".country-item");
  items.forEach((item) => {
    const name = item.dataset.name.toLowerCase();
    const code = item.dataset.code.toLowerCase();
    if (name.includes(searchTerm) || code.includes(searchTerm)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

// Password validation
const passwordInput = document.getElementById("password");
const passwordRequirements = document.getElementById("passwordRequirements");
const passwordWrapper = document.getElementById("passwordWrapper");

passwordInput.addEventListener("focus", () => {
  passwordRequirements.style.display = "block";
});

passwordInput.addEventListener("blur", () => {
  setTimeout(() => {
    passwordRequirements.style.display = "none";
  }, 200);
});

passwordInput.addEventListener("input", (e) => {
  const value = e.target.value;

  // Check length (10-128 characters)
  const lengthValid = value.length >= 10 && value.length <= 128;
  updateRequirement("req-length", lengthValid);

  // Check uppercase
  const uppercaseValid = /[A-Z]/.test(value);
  updateRequirement("req-uppercase", uppercaseValid);

  // Check lowercase
  const lowercaseValid = /[a-z]/.test(value);
  updateRequirement("req-lowercase", lowercaseValid);

  // Check number
  const numberValid = /[0-9]/.test(value);
  updateRequirement("req-number", numberValid);

  // Update border color
  const allValid =
    lengthValid && uppercaseValid && lowercaseValid && numberValid;
  if (allValid) {
    passwordWrapper.style.borderColor = "#2ebd85";
  } else if (value.length > 0) {
    passwordWrapper.style.borderColor = "#f6465d";
  } else {
    passwordWrapper.style.borderColor = "rgba(255, 255, 255, 0.1)";
  }
});

function updateRequirement(id, valid) {
  const element = document.getElementById(id);
  if (valid) {
    element.classList.add("valid");
  } else {
    element.classList.remove("valid");
  }
}

// Referral code toggle
const referralCheck = document.getElementById("referralCheck");
const referralInput = document.getElementById("referralInput");

referralCheck.addEventListener("change", (e) => {
  if (e.target.checked) {
    referralInput.style.display = "block";
  } else {
    referralInput.style.display = "none";
    document.getElementById("referralCode").value = "";
  }
});

// Toggle password visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// Form validation and submission
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    email: document.getElementById("email")?.value || "",
    phone: document.getElementById("phone")?.value || "",
    password: document.getElementById("password")?.value || "",
    confirmPassword: document.getElementById("confirmPassword")?.value || "",
    agreedToTerms: document.getElementById("terms")?.checked || false,
    referralCode: document.getElementById("referralCode")?.value || "",
  };

  // Show loading state
  const submitBtn = document.querySelector(".continue-btn");
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = "Validating...";
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";

  // Comprehensive form validation
  const validationResult = validateSignupForm(formData);

  if (!validationResult.isValid) {
    // Restore button state on validation error
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";

    alert(validationResult.message);
    return;
  }

  // If validation passes, save user data and redirect to login
  try {
    // Save user registration data (excluding password for security)
    const userData = {
      email: formData.email,
      phone: formData.phone,
      referralCode: formData.referralCode,
      registrationDate: new Date().toISOString(),
      status: "pending_verification",
    };

    // Save to localStorage using our data storage system
    if (typeof dataStorage !== "undefined") {
      dataStorage.saveData("user_registration", userData);
      dataStorage.saveSignupProgress(userData);
    } else {
      localStorage.setItem(
        "hoangcrypto_user_registration",
        JSON.stringify(userData)
      );
    }

    // Update button state to show creating account
    submitBtn.textContent = "Creating Account...";

    // Simulate processing time and show success message
    setTimeout(() => {
      alert(
        "🎉 Sign up successful! You will now be redirected to the login page."
      );

      // Add redirect with a small delay for user to see the success message
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    }, 1500);
  } catch (error) {
    console.error("Error saving user data:", error);

    // Restore button state
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";

    alert(
      "Sign up successful, but there was an issue saving your data. Redirecting to login..."
    );
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  }
});

// Comprehensive form validation function
function validateSignupForm(formData) {
  // Check if email or phone is provided
  if (!formData.email && !formData.phone) {
    return {
      isValid: false,
      message: "Please provide either an email address or phone number.",
    };
  }

  // Email validation
  if (formData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        isValid: false,
        message: "Please enter a valid email address.",
      };
    }
  }

  // Phone validation
  if (formData.phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      return {
        isValid: false,
        message: "Please enter a valid phone number.",
      };
    }
  }

  // Password validation
  if (!formData.password) {
    return {
      isValid: false,
      message: "Password is required.",
    };
  }

  const lengthValid =
    formData.password.length >= 10 && formData.password.length <= 128;
  const uppercaseValid = /[A-Z]/.test(formData.password);
  const lowercaseValid = /[a-z]/.test(formData.password);
  const numberValid = /[0-9]/.test(formData.password);

  if (!lengthValid) {
    return {
      isValid: false,
      message: "Password must be between 10-128 characters long.",
    };
  }

  if (!uppercaseValid) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }

  if (!lowercaseValid) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }

  if (!numberValid) {
    return {
      isValid: false,
      message: "Password must contain at least one number.",
    };
  }

  // Confirm password validation
  if (formData.password !== formData.confirmPassword) {
    return {
      isValid: false,
      message: "Passwords do not match!",
    };
  }

  // Terms and conditions validation
  if (!formData.agreedToTerms) {
    return {
      isValid: false,
      message: "Please agree to the Terms and Conditions and Privacy Policy.",
    };
  }

  // All validations passed
  return {
    isValid: true,
    message: "All validations passed successfully.",
  };
}

// Navigate to login page
document.getElementById("loginLink").addEventListener("click", (e) => {
  e.preventDefault();
  // Redirect to login page - you can change this URL to your actual login page
  window.location.href = "login.html";
});
