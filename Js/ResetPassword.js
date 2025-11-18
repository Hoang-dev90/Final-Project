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
const nextBtn = document.getElementById("nextBtn");
const emailInput = document.getElementById("emailInput");
const mobileInput = document.getElementById("mobileInput");
const errorIcon = document.getElementById("errorIcon");

emailTab.addEventListener("click", () => {
  emailTab.classList.add("active");
  mobileTab.classList.remove("active");
  emailContent.style.display = "block";
  mobileContent.style.display = "none";
  updateNextButton();
});

mobileTab.addEventListener("click", () => {
  mobileTab.classList.add("active");
  emailTab.classList.remove("active");
  emailContent.style.display = "none";
  mobileContent.style.display = "block";
  updateNextButton();
});

// Enable/disable Next button
function updateNextButton() {
  const isEmailTab = emailTab.classList.contains("active");
  const value = isEmailTab ? emailInput.value : mobileInput.value;

  if (value.trim() !== "") {
    nextBtn.classList.add("active");
  } else {
    nextBtn.classList.remove("active");
  }
}

emailInput.addEventListener("input", updateNextButton);
mobileInput.addEventListener("input", updateNextButton);

// Next button click
nextBtn.addEventListener("click", () => {
  if (nextBtn.classList.contains("active")) {
    const isEmailTab = emailTab.classList.contains("active");
    const value = isEmailTab
      ? emailInput.value
      : `${document.getElementById("selectedCode").textContent} ${
          mobileInput.value
        }`;

    // Update subtitle with the contact info
    document.getElementById(
      "verifySubtitle"
    ).textContent = `We texted your code to ${value}`;

    // Switch to verification form
    document.getElementById("resetForm").style.display = "none";
    document.getElementById("verifyForm").classList.add("active");
  }
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

// Code inputs - auto focus next
const codeInputs = document.querySelectorAll(".code-input");

codeInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    if (e.target.value.length === 1 && index < codeInputs.length - 1) {
      codeInputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      codeInputs[index - 1].focus();
    }
  });
});

// Continue button
document.getElementById("continueBtn").addEventListener("click", () => {
  const code = Array.from(codeInputs)
    .map((input) => input.value)
    .join("");
  if (code.length === 4) {
    alert("Verification successful! Code: " + code);
  } else {
    alert("Please enter all 4 digits");
  }
});
