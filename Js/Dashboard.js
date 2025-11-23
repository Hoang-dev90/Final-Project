// Dashboard JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // View switching functionality
  const dashboardView = document.getElementById("dashboardView");
  const profileView = document.getElementById("profileView");
  const securityView = document.getElementById("securityView");
  const identityView = document.getElementById("identityView");
  const vouchersView = document.getElementById("vouchersView");
  const promotionView = document.getElementById("promotionView");
  const apiView = document.getElementById("apiView");
  const settingsView = document.getElementById("settingsView");

  // Function to show dashboard
  window.showDashboard = function () {
    dashboardView.style.display = "block";
    profileView.style.display = "none";
    if (securityView) securityView.style.display = "none";
    if (identityView) identityView.style.display = "none";
    if (vouchersView) vouchersView.style.display = "none";
    if (promotionView) promotionView.style.display = "none";
    if (apiView) apiView.style.display = "none";
    if (settingsView) settingsView.style.display = "none";

    // Update sidebar active state
    document.querySelectorAll(".sidebar-link").forEach((link) => {
      link.classList.remove("active");
    });
    document
      .querySelector('.sidebar-link[href="#dashboard"]')
      .classList.add("active");
  };

  // Function to show profile
  window.showProfile = function () {
    dashboardView.style.display = "none";
    profileView.style.display = "block";
    if (securityView) securityView.style.display = "none";
    if (identityView) identityView.style.display = "none";
    if (vouchersView) vouchersView.style.display = "none";
    if (promotionView) promotionView.style.display = "none";
    if (apiView) apiView.style.display = "none";
    if (settingsView) settingsView.style.display = "none";
  };

  // Function to show security
  window.showSecurity = function () {
    dashboardView.style.display = "none";
    profileView.style.display = "none";
    if (securityView) securityView.style.display = "block";
    if (identityView) identityView.style.display = "none";
    if (vouchersView) vouchersView.style.display = "none";
    if (promotionView) promotionView.style.display = "none";
    if (apiView) apiView.style.display = "none";
    if (settingsView) settingsView.style.display = "none";

    // Update sidebar active state
    document.querySelectorAll(".sidebar-link").forEach((link) => {
      link.classList.remove("active");
    });
    const securityLink = document.querySelector(
      '.sidebar-link[href="#security"]'
    );
    if (securityLink) securityLink.classList.add("active");
  };

  // Function to show identity
  window.showIdentity = function () {
    dashboardView.style.display = "none";
    profileView.style.display = "none";
    if (securityView) securityView.style.display = "none";
    if (identityView) identityView.style.display = "block";
    if (vouchersView) vouchersView.style.display = "none";
    if (promotionView) promotionView.style.display = "none";
    if (apiView) apiView.style.display = "none";
    if (settingsView) settingsView.style.display = "none";

    // Update sidebar active state
    document.querySelectorAll(".sidebar-link").forEach((link) => {
      link.classList.remove("active");
    });
    const identityLink = document.querySelector(
      '.sidebar-link[href="#identity"]'
    );
    if (identityLink) identityLink.classList.add("active");
  };

  // Function to show vouchers
  window.showVouchers = function () {
    dashboardView.style.display = "none";
    profileView.style.display = "none";
    if (securityView) securityView.style.display = "none";
    if (identityView) identityView.style.display = "none";
    if (vouchersView) vouchersView.style.display = "block";
    if (promotionView) promotionView.style.display = "none";
    if (apiView) apiView.style.display = "none";
    if (settingsView) settingsView.style.display = "none";

    // Update sidebar active state
    document.querySelectorAll(".sidebar-link").forEach((link) => {
      link.classList.remove("active");
    });
    const vouchersLink = document.querySelector(
      '.sidebar-link[href="#coupons"]'
    );
    if (vouchersLink) vouchersLink.classList.add("active");
  };

  // Function to show promotion
  window.showPromotion = function () {
    dashboardView.style.display = "none";
    profileView.style.display = "none";
    if (securityView) securityView.style.display = "none";
    if (identityView) identityView.style.display = "none";
    if (vouchersView) vouchersView.style.display = "none";
    if (promotionView) promotionView.style.display = "block";
    if (apiView) apiView.style.display = "none";
    if (settingsView) settingsView.style.display = "none";

    // Update sidebar active state
    document.querySelectorAll(".sidebar-link").forEach((link) => {
      link.classList.remove("active");
    });
    const promotionLink = document.querySelector(
      '.sidebar-link[href="#promotion"]'
    );
    if (promotionLink) promotionLink.classList.add("active");
  };

  // Function to show API
  window.showApi = function () {
    dashboardView.style.display = "none";
    profileView.style.display = "none";
    if (securityView) securityView.style.display = "none";
    if (identityView) identityView.style.display = "none";
    if (vouchersView) vouchersView.style.display = "none";
    if (promotionView) promotionView.style.display = "none";
    if (apiView) apiView.style.display = "block";
    if (settingsView) settingsView.style.display = "none";

    // Update sidebar active state
    document.querySelectorAll(".sidebar-link").forEach((link) => {
      link.classList.remove("active");
    });
    const apiLink = document.querySelector('.sidebar-link[href="#api"]');
    if (apiLink) apiLink.classList.add("active");
  };

  // Function to show Settings
  window.showSettings = function () {
    dashboardView.style.display = "none";
    profileView.style.display = "none";
    if (securityView) securityView.style.display = "none";
    if (identityView) identityView.style.display = "none";
    if (vouchersView) vouchersView.style.display = "none";
    if (promotionView) promotionView.style.display = "none";
    if (apiView) apiView.style.display = "none";
    if (settingsView) settingsView.style.display = "block";

    // Update sidebar active state
    document.querySelectorAll(".sidebar-link").forEach((link) => {
      link.classList.remove("active");
    });
    const settingsLink = document.querySelector(
      '.sidebar-link[href="#settings"]'
    );
    if (settingsLink) settingsLink.classList.add("active");
  };

  // Add click handlers for navbar avatar/username -> profile
  const avatarElements = document.querySelectorAll(
    ".avatar-wrapper a, .avatar-username"
  );
  avatarElements.forEach((element) => {
    element.addEventListener("click", function (e) {
      if (
        this.getAttribute("href") === "dashboard.html" ||
        this.classList.contains("avatar-username")
      ) {
        e.preventDefault();
        showProfile();
      }
    });
  });

  // Add click handler for sidebar dashboard link -> show dashboard view
  const dashboardSidebarLink = document.querySelector(
    '.sidebar-link[href="#dashboard"]'
  );
  if (dashboardSidebarLink) {
    dashboardSidebarLink.addEventListener("click", function (e) {
      e.preventDefault();
      showDashboard();
    });
  }

  // Add click handler for sidebar security link -> show security view
  const securitySidebarLink = document.querySelector(
    '.sidebar-link[href="#security"]'
  );
  if (securitySidebarLink) {
    securitySidebarLink.addEventListener("click", function (e) {
      e.preventDefault();
      showSecurity();
    });
  }

  // Add click handler for sidebar identity link -> show identity view
  const identitySidebarLink = document.querySelector(
    '.sidebar-link[href="#identity"]'
  );
  if (identitySidebarLink) {
    identitySidebarLink.addEventListener("click", function (e) {
      e.preventDefault();
      showIdentity();
    });
  }

  // Add click handler for sidebar vouchers link -> show vouchers view
  const vouchersSidebarLink = document.querySelector(
    '.sidebar-link[href="#coupons"]'
  );
  if (vouchersSidebarLink) {
    vouchersSidebarLink.addEventListener("click", function (e) {
      e.preventDefault();
      showVouchers();
    });
  }

  // Add click handler for sidebar promotion link -> show promotion view
  const promotionSidebarLink = document.querySelector(
    '.sidebar-link[href="#promotion"]'
  );
  if (promotionSidebarLink) {
    promotionSidebarLink.addEventListener("click", function (e) {
      e.preventDefault();
      showPromotion();
    });
  }

  // Add click handler for sidebar API link -> show API view
  const apiSidebarLink = document.querySelector('.sidebar-link[href="#api"]');
  if (apiSidebarLink) {
    apiSidebarLink.addEventListener("click", function (e) {
      e.preventDefault();
      showApi();
    });
  }

  // Add click handler for sidebar Settings link -> show Settings view
  const settingsSidebarLink = document.querySelector(
    '.sidebar-link[href="#settings"]'
  );
  if (settingsSidebarLink) {
    settingsSidebarLink.addEventListener("click", function (e) {
      e.preventDefault();
      showSettings();
    });
  }

  // Add click handler for user header elements -> show profile view
  const userAvatarLarge = document.querySelector(".user-avatar-large");
  const dashboardUsername = document.getElementById("dashboardUsername");
  const upgradeBtn = document.querySelector(".upgrade-btn");

  if (userAvatarLarge) {
    userAvatarLarge.addEventListener("click", function () {
      showProfile();
    });
    userAvatarLarge.style.cursor = "pointer";
  }

  if (dashboardUsername) {
    dashboardUsername.addEventListener("click", function () {
      showProfile();
    });
    dashboardUsername.style.cursor = "pointer";
  }

  if (upgradeBtn) {
    upgradeBtn.addEventListener("click", function () {
      showProfile();
    });
  }

  // Submenu toggle functionality
  const submenuLink = document.querySelector(".sidebar-link.has-submenu");
  const submenu = document.querySelector(".submenu");

  if (submenuLink && submenu) {
    submenuLink.addEventListener("click", function (e) {
      e.preventDefault();
      submenu.classList.toggle("open");
      this.classList.toggle("active");
    });
  }

  // FAQ toggle functionality for Identity page
  const faqQuestions = document.querySelectorAll(".identity-faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.closest(".identity-faq-item");
      const wasActive = faqItem.classList.contains("active");

      // Close all FAQ items
      document.querySelectorAll(".identity-faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Toggle current item
      if (!wasActive) {
        faqItem.classList.add("active");
      }
    });
  });

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

  // Load username from localStorage
  const savedUsername = localStorage.getItem("hoangcrypto_username");
  const greetingElement = document.getElementById("userGreeting");
  const usernameElement = document.querySelector(".avatar-username");

  if (savedUsername) {
    if (greetingElement) {
      greetingElement.textContent = savedUsername;
    }
    if (usernameElement) {
      usernameElement.textContent = savedUsername;
    }
  } else {
    if (greetingElement) {
      greetingElement.textContent = "Guest User";
    }
  }

  // Generate or get UID
  let uid = localStorage.getItem("hoangcrypto_uid");
  if (!uid) {
    uid = "UID: " + Math.floor(100000000 + Math.random() * 900000000);
    localStorage.setItem("hoangcrypto_uid", uid);
  }

  const uidElement = document.querySelector(".avatar-uid");
  if (uidElement) {
    uidElement.textContent = uid;
  }

  // Handle dark mode toggle in avatar dropdown
  const avatarDarkModeToggle = document.getElementById("avatarDarkModeToggle");

  if (avatarDarkModeToggle) {
    // Set initial state based on current theme
    const currentTheme = localStorage.getItem("theme");
    avatarDarkModeToggle.checked = currentTheme === "dark" || !currentTheme;

    // Handle toggle change
    avatarDarkModeToggle.addEventListener("change", function () {
      if (this.checked) {
        body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
      } else {
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Handle logout
  const logoutItem = document.querySelector(".logout-item");
  if (logoutItem) {
    logoutItem.addEventListener("click", function () {
      // Clear user session data
      localStorage.removeItem("hoangcrypto_username");
      localStorage.removeItem("hoangcrypto_logged_in");

      // Redirect to login page
      window.location.href = "login.html";
    });
  }

  // Copy referral code
  const copyBtn = document.querySelector(".copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const referralCode = document.querySelector(".referral-code");
      if (referralCode) {
        const code = referralCode.textContent;
        navigator.clipboard
          .writeText(code)
          .then(() => {
            alert("Referral code copied: " + code);
          })
          .catch((err) => {
            console.error("Failed to copy:", err);
          });
      }
    });
  }
});

// Wallet Currency Switcher - 3 ví độc lập
const walletData = {
  BTC: {
    amount: "0.87653",
    symbol: "BTC",
    usdValue: "82,451.30",
  },
  VND: {
    amount: "200,000,000",
    symbol: "VND",
    usdValue: "8,000.00",
  },
  USDT: {
    amount: "5,000",
    symbol: "USDT",
    usdValue: "5,000.00",
  },
};

let currentCurrency = "BTC";

function changeCurrency(currency) {
  if (currency === currentCurrency) return;

  currentCurrency = currency;

  const wallet = walletData[currency];

  // Update wallet balance
  const balanceAmount = document.querySelector(".balance-amount");
  const balanceUsd = document.querySelector(".balance-usd");

  if (balanceAmount && balanceUsd) {
    balanceAmount.textContent = `${wallet.amount} ${wallet.symbol}`;
    balanceUsd.textContent = `≈ $${wallet.usdValue}`;
  }

  // Update asset card
  const assetAmount = document.querySelector(".asset-amount");
  const assetCurrency = document.querySelector(".asset-currency");
  const assetCurrencyLabel = document.querySelector(".asset-currency-label");
  const assetUsd = document.querySelector(".asset-usd");

  if (assetAmount && assetCurrency && assetUsd && assetCurrencyLabel) {
    assetAmount.innerHTML = `${wallet.amount} <span class="asset-currency">${wallet.symbol}</span>`;
    assetCurrencyLabel.textContent = wallet.symbol;
    assetUsd.textContent = `≈ $${wallet.usdValue}`;
  }

  // Update currency options in wallet
  const currencyOptions = document.querySelectorAll(".currency-option");
  currencyOptions.forEach((option) => {
    option.classList.remove("active");
    if (option.dataset.currency === currency) {
      option.classList.add("active");
    }
  });

  // Update currency options in asset card
  const assetCurrencyOptions = document.querySelectorAll(
    ".asset-currency-option"
  );
  assetCurrencyOptions.forEach((option) => {
    option.classList.remove("active");
    if (option.dataset.currency === currency) {
      option.classList.add("active");
    }
  });

  // Close dropdowns
  const dropdown = document.querySelector(".currency-dropdown-menu");
  if (dropdown) {
    dropdown.style.opacity = "0";
    dropdown.style.visibility = "hidden";

    setTimeout(() => {
      dropdown.style.opacity = "";
      dropdown.style.visibility = "";
    }, 200);
  }

  const assetDropdown = document.querySelector(".asset-currency-dropdown-menu");
  if (assetDropdown) {
    assetDropdown.style.opacity = "0";
    assetDropdown.style.visibility = "hidden";
  }

  // Animation
  const balanceContainer = document.querySelector(".balance-amount-container");
  if (balanceContainer) {
    balanceContainer.style.transform = "scale(1.05)";
    setTimeout(() => {
      balanceContainer.style.transform = "scale(1)";
    }, 150);
  }

  const assetAmountWrapper = document.querySelector(".asset-amount-wrapper");
  if (assetAmountWrapper) {
    assetAmountWrapper.style.transform = "scale(1.05)";
    setTimeout(() => {
      assetAmountWrapper.style.transform = "scale(1)";
    }, 150);
  }
}

// Dropdown toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector(".currency-dropdown-btn");
  const dropdownMenu = document.querySelector(".currency-dropdown-menu");
  const dropdown = document.querySelector(".currency-dropdown");

  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isVisible = dropdownMenu.style.opacity === "1";

      if (isVisible) {
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.visibility = "hidden";
      } else {
        dropdownMenu.style.opacity = "1";
        dropdownMenu.style.visibility = "visible";
      }
    });

    document.addEventListener("click", function (e) {
      if (dropdown && !dropdown.contains(e.target)) {
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.visibility = "hidden";
      }
    });

    dropdownMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // Asset currency dropdown
  const assetDropdownBtn = document.querySelector(
    ".asset-currency-dropdown-btn"
  );
  const assetDropdownMenu = document.querySelector(
    ".asset-currency-dropdown-menu"
  );
  const assetDropdown = document.querySelector(".asset-currency-dropdown");

  if (assetDropdownBtn && assetDropdownMenu) {
    assetDropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isVisible = assetDropdownMenu.style.opacity === "1";

      if (isVisible) {
        assetDropdownMenu.style.opacity = "0";
        assetDropdownMenu.style.visibility = "hidden";
      } else {
        assetDropdownMenu.style.opacity = "1";
        assetDropdownMenu.style.visibility = "visible";
      }
    });

    document.addEventListener("click", function (e) {
      if (assetDropdown && !assetDropdown.contains(e.target)) {
        assetDropdownMenu.style.opacity = "0";
        assetDropdownMenu.style.visibility = "hidden";
      }
    });

    assetDropdownMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // Asset currency options click
  const assetCurrencyOptions = document.querySelectorAll(
    ".asset-currency-option"
  );
  assetCurrencyOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const currency = this.dataset.currency;
      changeCurrency(currency);
    });
  });

  // Settings page - Radio card interactivity
  const radioCards = document.querySelectorAll(".settings-radio-card");
  radioCards.forEach((card) => {
    card.addEventListener("click", function () {
      const radio = this.querySelector('input[type="radio"]');
      if (radio) {
        // Remove active class from siblings
        const radioGroup = this.closest(".settings-radio-group");
        if (radioGroup) {
          radioGroup.querySelectorAll(".settings-radio-card").forEach((c) => {
            c.classList.remove("active");
          });
        }
        // Add active class to clicked card
        this.classList.add("active");
        radio.checked = true;
      }
    });
  });
});
