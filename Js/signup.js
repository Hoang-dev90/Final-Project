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

// Form submission
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validate password requirements
  const lengthValid = password.length >= 10 && password.length <= 128;
  const uppercaseValid = /[A-Z]/.test(password);
  const lowercaseValid = /[a-z]/.test(password);
  const numberValid = /[0-9]/.test(password);

  if (!lengthValid || !uppercaseValid || !lowercaseValid || !numberValid) {
    alert("Password does not meet requirements!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  alert("Sign up successful!");
});

// Navigate to login page
document.getElementById("loginLink").addEventListener("click", (e) => {
  e.preventDefault();
  // Redirect to login page - you can change this URL to your actual login page
  window.location.href = "login.html";
});
