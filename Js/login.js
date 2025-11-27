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
const emailContent = document.getElementById("emailContent");
const mobileContent = document.getElementById("mobileContent");

emailTab.addEventListener("click", () => {
  emailTab.classList.add("active");
  mobileTab.classList.remove("active");
  emailContent.style.display = "block";
  mobileContent.style.display = "none";
});

mobileTab.addEventListener("click", () => {
  mobileTab.classList.add("active");
  emailTab.classList.remove("active");
  emailContent.style.display = "none";
  mobileContent.style.display = "block";
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
      item.style.display = "grid";
    } else {
      item.style.display = "none";
    }
  });
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
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("Form submitted"); // Debug log

  // Get the email/phone input value
  const emailInput = document.getElementById("emailOrPhone");
  const mobileInput = document.getElementById("mobileNumber");
  const emailContent = document.getElementById("emailContent");
  const mobileContent = document.getElementById("mobileContent");

  // Determine which input is visible and get its value
  let username = "";
  let password = "";

  // Check which tab is active by checking display style or visibility
  const isEmailTab =
    mobileContent.style.display === "none" ||
    window.getComputedStyle(mobileContent).display === "none";

  if (isEmailTab) {
    username = emailInput.value.trim();
    password = document.getElementById("emailPassword").value;
    console.log("Email tab - Username:", username); // Debug log
  } else {
    const countryCode = document.getElementById("selectedCode").textContent;
    username = countryCode + mobileInput.value.trim();
    password = document.getElementById("mobilePassword").value;
    console.log("Mobile tab - Username:", username); // Debug log
  }

  // Validate input fields
  if (!username) {
    alert("Please enter your email or phone number");
    return;
  }

  if (!password) {
    alert("Please enter your password");
    return;
  }

  // Check if user data exists in localStorage
  const savedUserData = localStorage.getItem("hoangcrypto_user_registration");

  if (savedUserData) {
    try {
      const userData = JSON.parse(savedUserData);

      // Simple validation - check if email or phone matches
      const isValidUser =
        userData.email === username || userData.phone === username;

      if (isValidUser) {
        // Save username to localStorage
        localStorage.setItem("hoangcrypto_username", username);
        localStorage.setItem("hoangcrypto_logged_in", "true");

        alert("Login successful!");

        // Redirect to main page after successful login
        setTimeout(() => {
          window.location.href = "Logout.html";
        }, 500);
      } else {
        alert("Invalid email/phone or password. Please try again.");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      // If there's an error, still allow login for demo purposes
      localStorage.setItem("hoangcrypto_username", username);
      localStorage.setItem("hoangcrypto_logged_in", "true");

      alert("Login successful!");
      setTimeout(() => {
        window.location.href = "Logout.html";
      }, 500);
    }
  } else {
    // No user data found, allow login anyway for demo purposes
    localStorage.setItem("hoangcrypto_username", username);
    localStorage.setItem("hoangcrypto_logged_in", "true");

    alert("Login successful! (Demo mode - no registration data found)");
    setTimeout(() => {
      window.location.href = "Logout.html";
    }, 500);
  }
});

// Navigate to signup page
document.getElementById("signupLink").addEventListener("click", (e) => {
  e.preventDefault();
  // Redirect to signup page - you can change this URL to your actual signup page
  window.location.href = "signup.html";
});
