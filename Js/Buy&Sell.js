// Buy & Sell Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Header Navigation
  initHeaderNavigation();

  // P2P Buy/Sell Tabs
  initP2PTabs();

  // Trading Tabs Functionality
  initTradingTabs();

  // Currency Selectors
  initCurrencySelectors();

  // Input Calculations
  initInputCalculations();

  // Carousel Functionality
  initCarousel();

  // Floating Support Button
  initSupportButton();

  // Dark Mode Integration
  initDarkMode();

  // Payment Modal
  initPaymentModal();

  // Currency Dropdown (HTML/CSS based)
  initCurrencyDropdown();
});

// Header Navigation
function initHeaderNavigation() {
  const navLinks = document.querySelectorAll(".buy-sell-nav-link");
  const buySellContent = document.getElementById("buy-sell-content");
  const p2pContent = document.getElementById("p2p-content");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Get the section to show
      const section = this.getAttribute("data-section");

      // Toggle content sections
      if (section === "buy-sell") {
        buySellContent.classList.add("active");
        p2pContent.classList.remove("active");
      } else if (section === "p2p") {
        buySellContent.classList.remove("active");
        p2pContent.classList.add("active");
      }
    });
  });
}

// P2P Buy/Sell Tabs
function initP2PTabs() {
  const p2pTabs = document.querySelectorAll(".p2p-tab");
  const buySection = document.getElementById("p2p-buy-section");
  const sellSection = document.getElementById("p2p-sell-section");

  p2pTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      p2pTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Get the tab text to determine which section to show
      const tabText = this.textContent.trim().toLowerCase();

      // Toggle sections
      if (tabText === "buy") {
        buySection.classList.add("active");
        sellSection.classList.remove("active");
      } else if (tabText === "sell") {
        buySection.classList.remove("active");
        sellSection.classList.add("active");
      }
    });
  });
}

// Trading Tabs
function initTradingTabs() {
  const tabs = document.querySelectorAll(".trading-tab");
  const buyButton = document.querySelector(".buy-button");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Update button text based on active tab
      const activeTab = this.getAttribute("data-tab");
      if (activeTab === "buy") {
        buyButton.textContent = "Buy ETH";
        buyButton.style.background =
          "linear-gradient(135deg, #00d4aa 0%, #00c087 100%)";
      } else if (activeTab === "sell") {
        buyButton.textContent = "Sell ETH";
        buyButton.style.background =
          "linear-gradient(135deg, #ff5757 0%, #ff3b3b 100%)";
      }
    });
  });
}

// Currency Selectors
function initCurrencySelectors() {
  const currencySelectors = document.querySelectorAll(".currency-selector");
  console.log("Currency selectors found:", currencySelectors.length);

  currencySelectors.forEach((selector) => {
    selector.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Currency selector clicked:", this.id);
      showCurrencyDropdown(this);
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function () {
    const existingDropdown = document.querySelector(".currency-dropdown-menu");
    if (existingDropdown) {
      existingDropdown.remove();
    }
  });
}

function showCurrencyDropdown(selector) {
  console.log("showCurrencyDropdown called for:", selector.id);

  // Check if this selector already has a dropdown open
  const wrapper = selector.closest(".input-wrapper");
  const existingDropdown = wrapper.querySelector(".currency-dropdown-menu");

  if (existingDropdown) {
    console.log("Removing existing dropdown from same selector");
    existingDropdown.remove();
    return;
  }

  // Remove any other open dropdowns
  document
    .querySelectorAll(".currency-dropdown-menu")
    .forEach((dd) => dd.remove());

  // Create dropdown menu
  const dropdown = document.createElement("div");
  dropdown.className = "currency-dropdown-menu";
  console.log("Dropdown created");

  // Currency options based on selector type
  const selectorId = selector.id;
  let currencies = [];

  if (selectorId === "payCurrency") {
    currencies = [
      {
        code: "BTC",
        name: "Bitcoin",
        icon: "https://img.icons8.com/color/48/bitcoin.png",
      },
      {
        code: "USDT",
        name: "Tether",
        icon: "https://img.icons8.com/color/48/tether.png",
      },
      {
        code: "VND",
        name: "Vietnamese Dong",
        icon: "./Icon Coin/VND.png",
      },
    ];
  } else if (selectorId === "receiveCurrency") {
    currencies = [
      {
        code: "BTC",
        name: "Bitcoin",
        icon: "https://img.icons8.com/color/48/bitcoin.png",
      },
      {
        code: "USDT",
        name: "Tether",
        icon: "https://img.icons8.com/color/48/tether.png",
      },
      {
        code: "VND",
        name: "Vietnamese Dong",
        icon: "./Icon Coin/VND.png",
      },
    ];
  }

  console.log("Currencies:", currencies);

  currencies.forEach((currency) => {
    const option = document.createElement("div");
    option.className = "currency-option";

    option.innerHTML = `
            <img src="${currency.icon}" alt="${currency.code}">
            <div style="flex: 1;">
                <div style="font-size: 14px; font-weight: 600; color: #ffffff;">${currency.code}</div>
                <div style="font-size: 12px; color: #8b93a7;">${currency.name}</div>
            </div>
        `;

    option.addEventListener("click", function (e) {
      e.stopPropagation();
      updateCurrency(selector, currency);
      dropdown.remove();
    });

    dropdown.appendChild(option);
  });

  // Position dropdown - wrapper already defined above
  console.log("Wrapper found:", wrapper);

  if (wrapper) {
    wrapper.appendChild(dropdown);
    console.log("Dropdown appended to wrapper");
  } else {
    console.error("Wrapper not found!");
  }
}

function updateCurrency(selector, currency) {
  const icon = selector.querySelector(".currency-icon");
  const code = selector.querySelector(".currency-code");

  icon.src = currency.icon;
  code.textContent = currency.code;

  // Update button text if receive currency changed
  if (selector.id === "receiveCurrency") {
    const buyButton = document.querySelector(".buy-button");
    const activeTab = document
      .querySelector(".trading-tab.active")
      .getAttribute("data-tab");

    if (activeTab === "buy") {
      buyButton.textContent = `Buy ${currency.code}`;
    } else {
      buyButton.textContent = `Sell ${currency.code}`;
    }
  }

  // Recalculate exchange
  calculateExchange();
}

// Input Calculations
function initInputCalculations() {
  const payInput = document.querySelector(
    ".input-group:nth-child(3) .trading-input"
  );
  const receiveInput = document.querySelector(
    ".input-group:nth-child(4) .trading-input"
  );

  if (payInput) {
    payInput.addEventListener("input", function () {
      calculateExchange();
    });
  }
}

function calculateExchange() {
  const payInput = document.querySelector(
    ".input-group:nth-child(3) .trading-input"
  );
  const receiveInput = document.querySelector(
    ".input-group:nth-child(4) .trading-input"
  );
  const estimatedPrice = document.querySelector(".estimated-price");
  const payCurrency = document.querySelector("#payCurrency .currency-code");
  const receiveCurrency = document.querySelector(
    "#receiveCurrency .currency-code"
  );

  if (!payInput || !receiveInput || !payCurrency || !receiveCurrency) return;

  const payCurrencyCode = payCurrency.textContent;
  const receiveCurrencyCode = receiveCurrency.textContent;
  const payAmount = parseFloat(payInput.value.replace(/,/g, "")) || 0;

  if (payAmount > 0 && typeof TradingSystem !== "undefined") {
    // Use TradingSystem exchange rates
    const receiveAmount = TradingSystem.calculateExchange(
      payAmount,
      payCurrencyCode,
      receiveCurrencyCode
    );
    receiveInput.value = receiveAmount.toFixed(8);

    // Update estimated price
    if (estimatedPrice) {
      const rate = receiveAmount / payAmount;
      estimatedPrice.textContent = `Estimated price: 1 ${payCurrencyCode} = ${rate.toFixed(
        8
      )} ${receiveCurrencyCode}`;
    }
  } else {
    receiveInput.value = "";
    if (estimatedPrice) {
      estimatedPrice.textContent = `Estimated price: 1 ${payCurrencyCode} = -- ${receiveCurrencyCode}`;
    }
  }
}

// Carousel Functionality
function initCarousel() {
  const dots = document.querySelectorAll(".carousel-dots .dot");
  const carousels = document.querySelectorAll(".coins-carousel");
  const carouselTrack = document.querySelector(".coins-carousel-track");
  const carouselSection = document.querySelector(".newly-listed-section");
  let currentSlide = 0;
  let autoPlayInterval;
  let isHovered = false;

  // Click handler for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentSlide = index;
      updateCarousel();
      // Reset auto-play interval when manually changed
      if (!isHovered) {
        resetAutoPlay();
      }
    });
  });

  // Update carousel display
  function updateCarousel() {
    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // Update carousel track position
    if (carouselTrack) {
      const translateX = -currentSlide * 100;
      carouselTrack.style.transform = `translateX(${translateX}%)`;
    }

    // Update active state for fade effect
    carousels.forEach((carousel, index) => {
      if (index === currentSlide) {
        carousel.classList.add("active");
      } else {
        carousel.classList.remove("active");
      }
    });
  }

  // Auto-rotate carousel
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (!isHovered) {
        currentSlide = (currentSlide + 1) % dots.length;
        updateCarousel();
      }
    }, 3000); // Change slide every 3 seconds
  }

  // Reset auto-play interval
  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Stop auto-play when hovering over the section
  if (carouselSection) {
    carouselSection.addEventListener("mouseenter", function () {
      isHovered = true;
    });

    carouselSection.addEventListener("mouseleave", function () {
      isHovered = false;
    });
  }

  // Start auto-play on page load
  startAutoPlay();

  // Initial display
  updateCarousel();

  // Initialize info banner carousel
  initInfoBannerCarousel();
}

// Info Banner Carousel Functionality
function initInfoBannerCarousel() {
  const bannerDots = document.querySelectorAll(".info-banner-dots .banner-dot");
  const bannerCarousels = document.querySelectorAll(".info-banner-carousel");
  const bannerTrack = document.querySelector(".info-banner-carousel-track");
  const bannerSection = document.querySelector(".info-banner-section");
  let currentBannerSlide = 0;
  let bannerAutoPlayInterval;
  let isBannerHovered = false;

  if (!bannerDots.length || !bannerCarousels.length || !bannerTrack) {
    return; // Exit if elements don't exist
  }

  // Click handler for banner dots
  bannerDots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentBannerSlide = index;
      updateBannerCarousel();
      if (!isBannerHovered) {
        resetBannerAutoPlay();
      }
    });
  });

  // Update banner carousel display
  function updateBannerCarousel() {
    // Update dots
    bannerDots.forEach((dot, index) => {
      if (index === currentBannerSlide) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // Update carousel track position
    const translateX = -currentBannerSlide * 100;
    bannerTrack.style.transform = `translateX(${translateX}%)`;

    // Update active state for fade effect
    bannerCarousels.forEach((carousel, index) => {
      if (index === currentBannerSlide) {
        carousel.classList.add("active");
      } else {
        carousel.classList.remove("active");
      }
    });
  }

  // Auto-rotate banner carousel
  function startBannerAutoPlay() {
    bannerAutoPlayInterval = setInterval(() => {
      if (!isBannerHovered) {
        currentBannerSlide = (currentBannerSlide + 1) % bannerDots.length;
        updateBannerCarousel();
      }
    }, 3000);
  }

  // Reset auto-play interval
  function resetBannerAutoPlay() {
    clearInterval(bannerAutoPlayInterval);
    startBannerAutoPlay();
  }

  // Stop auto-play when hovering over the section
  if (bannerSection) {
    bannerSection.addEventListener("mouseenter", function () {
      isBannerHovered = true;
    });

    bannerSection.addEventListener("mouseleave", function () {
      isBannerHovered = false;
    });
  }

  // Start auto-play on page load
  startBannerAutoPlay();

  // Initial display
  updateBannerCarousel();
}

// Floating Support Button
function initSupportButton() {
  const supportBtn = document.querySelector(".floating-support-btn");

  if (supportBtn) {
    supportBtn.addEventListener("click", function () {
      // Show support chat or modal
      alert(
        "Support chat will open here. You can integrate with your customer support system."
      );

      // In a real implementation, you would open a chat widget or modal
      // For example: openSupportChat();
    });
  }
}

// Dark Mode Integration
function initDarkMode() {
  // Sync with existing dark mode toggle if it exists
  const darkModeToggle = document.getElementById("themeToggle");
  const avatarDarkModeToggle = document.getElementById("avatarDarkModeToggle");

  // Check for saved theme preference
  const currentTheme = localStorage.getItem("theme") || "dark";
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (avatarDarkModeToggle) avatarDarkModeToggle.checked = true;
  }

  // Listen for theme changes
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      if (avatarDarkModeToggle) avatarDarkModeToggle.checked = isDark;
    });
  }

  if (avatarDarkModeToggle) {
    avatarDarkModeToggle.addEventListener("change", function () {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
}

// Buy/Sell Button Click Handler
document.addEventListener("DOMContentLoaded", function () {
  const buyButton = document.querySelector(".buy-button");

  if (buyButton) {
    buyButton.addEventListener("click", function () {
      const activeTab = document
        .querySelector(".trading-tab.active")
        .getAttribute("data-tab");
      const payCurrency = document.querySelector(
        "#payCurrency .currency-code"
      ).textContent;
      const receiveCurrency = document.querySelector(
        "#receiveCurrency .currency-code"
      ).textContent;
      const payAmount = document.querySelector(
        ".input-group:nth-child(3) .trading-input"
      ).value;
      const receiveAmount = document.querySelector(
        ".input-group:nth-child(4) .trading-input"
      ).value;

      if (!payAmount || !receiveAmount) {
        alert("Please enter an amount to trade.");
        return;
      }

      // In a real implementation, this would process the transaction
      const action = activeTab === "buy" ? "Buy" : "Sell";
      alert(
        `${action} transaction initiated:\n${payAmount} ${payCurrency} → ${receiveAmount} ${receiveCurrency}`
      );

      // Here you would typically:
      // 1. Validate the transaction
      // 2. Show a confirmation modal
      // 3. Process the payment
      // 4. Update user's balance
      // 5. Show success/error message
    });
  }

  // Recurring Buy Handler
  const recurringBuy = document.querySelector(".recurring-buy");
  if (recurringBuy) {
    recurringBuy.addEventListener("click", function () {
      alert(
        "Recurring Buy feature will allow you to automatically purchase crypto at regular intervals."
      );
      // Open recurring buy setup modal
    });
  }
});

// Initialize default calculation on page load
window.addEventListener("load", function () {
  setTimeout(() => {
    calculateExchange();
  }, 100);
});

// Popular Rates Carousel
function initRatesCarousel() {
  const ratesTrack = document.querySelector(".rates-carousel-track");
  const ratesDots = document.querySelectorAll(".rate-dot");
  const ratesSection = document.querySelector(".popular-rates-section");

  if (!ratesTrack || !ratesDots.length || !ratesSection) return;

  let currentRateSlide = 0;
  let ratesAutoPlayInterval;

  function updateRatesCarousel() {
    ratesTrack.style.transform = `translateX(-${currentRateSlide * 100}%)`;

    ratesDots.forEach((dot, index) => {
      if (index === currentRateSlide) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function nextRateSlide() {
    currentRateSlide = (currentRateSlide + 1) % ratesDots.length;
    updateRatesCarousel();
  }

  function startRatesAutoPlay() {
    ratesAutoPlayInterval = setInterval(nextRateSlide, 3000);
  }

  function stopRatesAutoPlay() {
    clearInterval(ratesAutoPlayInterval);
  }

  ratesDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentRateSlide = index;
      updateRatesCarousel();
      stopRatesAutoPlay();
      startRatesAutoPlay();
    });
  });

  ratesSection.addEventListener("mouseenter", stopRatesAutoPlay);
  ratesSection.addEventListener("mouseleave", startRatesAutoPlay);

  startRatesAutoPlay();
}

// Payment Modal
function initPaymentModal() {
  const balanceSelector = document.querySelector(".balance-selector");
  const paymentModal = document.getElementById("payment-modal");
  const modalClose = document.querySelector(".payment-modal-close");
  const modalOverlay = document.querySelector(".payment-modal-overlay");
  const paymentOptions = document.querySelectorAll(".payment-option");
  const paymentRadios = document.querySelectorAll(".payment-radio");

  // Open modal
  if (balanceSelector) {
    balanceSelector.addEventListener("click", function (e) {
      e.preventDefault();
      paymentModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  // Close modal
  function closeModal() {
    paymentModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }

  // Handle payment option selection
  paymentOptions.forEach((option, index) => {
    option.addEventListener("click", function () {
      // Remove selected class from all options
      paymentOptions.forEach((opt) => opt.classList.remove("selected"));

      // Add selected class to clicked option
      this.classList.add("selected");

      // Check the radio button
      const radio = this.querySelector(".payment-radio");
      if (radio) {
        paymentRadios.forEach((r) => (r.checked = false));
        radio.checked = true;
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && paymentModal.classList.contains("active")) {
      closeModal();
    }
  });
}

// Currency Dropdown (HTML/CSS based)
function initCurrencyDropdown() {
  const currencyOptions = document.querySelectorAll(
    ".currency-dropdown-option"
  );

  currencyOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation();

      const code = this.getAttribute("data-code");
      const icon = this.getAttribute("data-icon");
      const selector = this.closest(".currency-selector");

      // Update selector display
      const selectorIcon = selector.querySelector(".currency-icon");
      const selectorCode = selector.querySelector(".currency-code");

      selectorIcon.src = icon;
      selectorIcon.alt = code;
      selectorCode.textContent = code;

      // Update active state
      const panel = this.closest(".currency-dropdown-panel");
      panel.querySelectorAll(".currency-dropdown-option").forEach((opt) => {
        opt.classList.remove("active");
      });
      this.classList.add("active");

      // Update button text if receive currency changed
      if (selector.id === "receiveCurrency") {
        const buyButton = document.querySelector(".buy-button");
        const activeTab = document.querySelector(".trading-tab.active");
        if (activeTab) {
          const tabType = activeTab.getAttribute("data-tab");
          if (tabType === "buy") {
            buyButton.textContent = `Buy ${code}`;
          } else {
            buyButton.textContent = `Sell ${code}`;
          }
        }
      }
    });
  });
}

// Wallet Management System
const WalletManager = {
  // Initialize wallet with default balances
  init() {
    if (!localStorage.getItem("wallet")) {
      const defaultWallet = {
        BTC: 0,
        USDT: 0,
        VND: 500000000, // 500 million VND as starting balance
      };
      localStorage.setItem("wallet", JSON.stringify(defaultWallet));
      console.log("Wallet initialized with default balances:", defaultWallet);
    } else {
      console.log("Wallet loaded from localStorage:", this.getBalances());
    }

    // Update display after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.updateWalletDisplay();
      console.log("Wallet display updated");
    }, 100);
  },

  // Get wallet balances
  getBalances() {
    return JSON.parse(localStorage.getItem("wallet")) || {};
  },

  // Get balance for specific currency
  getBalance(currency) {
    const wallet = this.getBalances();
    return wallet[currency] || 0;
  },

  // Update balance for specific currency
  updateBalance(currency, amount) {
    const wallet = this.getBalances();
    wallet[currency] = (wallet[currency] || 0) + amount;
    localStorage.setItem("wallet", JSON.stringify(wallet));
    this.updateWalletDisplay();
  },

  // Set balance for specific currency
  setBalance(currency, amount) {
    const wallet = this.getBalances();
    wallet[currency] = amount;
    localStorage.setItem("wallet", JSON.stringify(wallet));
    this.updateWalletDisplay();
  },

  // Update wallet display in navbar
  updateWalletDisplay() {
    const wallet = this.getBalances();
    console.log("updateWalletDisplay called, wallet:", wallet);

    const balanceAmountElement = document.querySelector(
      ".wallet-panel .balance-amount"
    );
    const balanceUsdElement = document.querySelector(
      ".wallet-panel .balance-usd"
    );

    console.log("Balance elements found:", {
      balanceAmount: !!balanceAmountElement,
      balanceUsd: !!balanceUsdElement,
    });

    // Get current displayed currency from wallet dropdown
    const activeCurrencyOption = document.querySelector(
      ".wallet-panel .currency-dropdown-menu .currency-option.active"
    );
    const currentCurrency = activeCurrencyOption
      ? activeCurrencyOption.getAttribute("data-currency")
      : "BTC";

    console.log("Current currency:", currentCurrency);

    // Update display
    if (balanceAmountElement) {
      const balance = wallet[currentCurrency] || 0;
      const formattedBalance = this.formatNumber(balance);
      balanceAmountElement.textContent = `${formattedBalance} ${currentCurrency}`;
      console.log(`Updated balance to: ${formattedBalance} ${currentCurrency}`);
    }

    // Calculate VND equivalent (always show total VND)
    if (balanceUsdElement) {
      const vndBalance = wallet.VND || 0;
      const formattedVND = this.formatNumber(vndBalance);
      balanceUsdElement.textContent = `≈ ${formattedVND} VND`;
      console.log(`Updated VND balance to: ${formattedVND} VND`);
    }

    // Update balance selector in trading panel
    this.updateBalanceSelector();
  },

  // Update balance selector display
  updateBalanceSelector() {
    const wallet = this.getBalances();
    const balanceSelector = document.querySelector(
      ".balance-selector .balance-amount"
    );

    if (balanceSelector) {
      // Get the pay currency
      const payCurrencyCode = document.querySelector(
        "#payCurrency .currency-code"
      );
      const currency = payCurrencyCode ? payCurrencyCode.textContent : "VND";
      const balance = wallet[currency] || 0;
      balanceSelector.textContent = `${this.formatNumber(balance)} ${currency}`;
    }
  },

  // Format number with commas
  formatNumber(num) {
    return parseFloat(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    });
  },
};

// Trading System
const TradingSystem = {
  // Exchange rates (VND per unit)
  exchangeRates: {
    BTC: 2500000000, // 2.5 billion VND per BTC
    USDT: 25000, // 25,000 VND per USDT
    VND: 1,
  },

  // Initialize trading system
  init() {
    const buyButton = document.querySelector(".buy-button");
    if (buyButton) {
      buyButton.addEventListener("click", () => this.executeTrade());
    }

    // Update balance display when currency changes
    document.querySelectorAll(".currency-dropdown-option").forEach((option) => {
      option.addEventListener("click", () => {
        setTimeout(() => WalletManager.updateBalanceSelector(), 100);
      });
    });
  },

  // Execute buy/sell trade
  executeTrade() {
    const payInput = document.querySelector(
      ".input-group:nth-child(3) .trading-input"
    );
    const receiveInput = document.querySelector(
      ".input-group:nth-child(4) .trading-input"
    );
    const payCurrency = document.querySelector(
      "#payCurrency .currency-code"
    ).textContent;
    const receiveCurrency = document.querySelector(
      "#receiveCurrency .currency-code"
    ).textContent;
    const activeTab = document.querySelector(".trading-tab.active");
    const isBuy = activeTab
      ? activeTab.getAttribute("data-tab") === "buy"
      : true;

    // Get amounts
    let payAmount = parseFloat(payInput.value.replace(/,/g, "")) || 0;
    let receiveAmount = parseFloat(receiveInput.value.replace(/,/g, "")) || 0;

    if (payAmount <= 0) {
      alert("Please enter a valid amount to pay!");
      return;
    }

    // Check if user has enough balance
    const currentBalance = WalletManager.getBalance(payCurrency);
    if (currentBalance < payAmount) {
      alert(
        `Insufficient balance! You have ${WalletManager.formatNumber(
          currentBalance
        )} ${payCurrency}`
      );
      return;
    }

    // Calculate receive amount if not set
    if (receiveAmount <= 0) {
      receiveAmount = this.calculateExchange(
        payAmount,
        payCurrency,
        receiveCurrency
      );
    }

    // Confirm transaction
    const confirmMsg = isBuy
      ? `Buy ${WalletManager.formatNumber(
          receiveAmount
        )} ${receiveCurrency} for ${WalletManager.formatNumber(
          payAmount
        )} ${payCurrency}?`
      : `Sell ${WalletManager.formatNumber(
          payAmount
        )} ${payCurrency} for ${WalletManager.formatNumber(
          receiveAmount
        )} ${receiveCurrency}?`;

    if (!confirm(confirmMsg)) {
      return;
    }

    // Execute transaction
    WalletManager.updateBalance(payCurrency, -payAmount);
    WalletManager.updateBalance(receiveCurrency, receiveAmount);

    // Show success message
    alert(
      `Transaction successful!\n` +
        `Paid: ${WalletManager.formatNumber(payAmount)} ${payCurrency}\n` +
        `Received: ${WalletManager.formatNumber(
          receiveAmount
        )} ${receiveCurrency}\n\n` +
        `New ${payCurrency} balance: ${WalletManager.formatNumber(
          WalletManager.getBalance(payCurrency)
        )}\n` +
        `New ${receiveCurrency} balance: ${WalletManager.formatNumber(
          WalletManager.getBalance(receiveCurrency)
        )}`
    );

    // Clear inputs
    payInput.value = "";
    receiveInput.value = "";

    // Update displays
    WalletManager.updateWalletDisplay();
  },

  // Calculate exchange amount
  calculateExchange(amount, fromCurrency, toCurrency) {
    const fromRate = this.exchangeRates[fromCurrency] || 1;
    const toRate = this.exchangeRates[toCurrency] || 1;
    return (amount * fromRate) / toRate;
  },
};

// Change currency in wallet dropdown
function changeCurrency(currency) {
  console.log("Changing currency to:", currency);

  // Update active state in dropdown (specific to wallet panel)
  const options = document.querySelectorAll(
    ".wallet-panel .currency-dropdown-menu .currency-option"
  );
  console.log("Found options:", options.length);

  options.forEach((option) => {
    option.classList.remove("active");
    if (option.getAttribute("data-currency") === currency) {
      option.classList.add("active");
      console.log("Set active:", currency);
    }
  });

  // Update wallet display
  WalletManager.updateWalletDisplay();

  // Log current balances
  const wallet = WalletManager.getBalances();
  console.log("Current wallet balances:", wallet);
}

// Initialize systems when page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("=== DOMContentLoaded fired ===");
  console.log("Starting WalletManager.init()...");
  WalletManager.init();
  console.log("Starting TradingSystem.init()...");
  TradingSystem.init();

  // Setup wallet currency dropdown button toggle
  const currencyDropdownBtn = document.querySelector(
    ".wallet-panel .currency-dropdown-btn"
  );
  const currencyDropdown = document.querySelector(
    ".wallet-panel .currency-dropdown"
  );

  if (currencyDropdownBtn && currencyDropdown) {
    currencyDropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const wasActive = currencyDropdown.classList.contains("active");
      currencyDropdown.classList.toggle("active");
      const isNowActive = currencyDropdown.classList.contains("active");

      // Only refresh when OPENING dropdown, not closing
      if (!wasActive && isNowActive) {
        WalletManager.updateWalletDisplay();
      }

      console.log("Dropdown toggled, active:", isNowActive);
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!currencyDropdown.contains(e.target)) {
        currencyDropdown.classList.remove("active");
      }
    });
  }

  // Setup wallet currency dropdown (specific to wallet panel)
  const currencyOptions = document.querySelectorAll(
    ".wallet-panel .currency-dropdown-menu .currency-option"
  );
  console.log(
    "Setting up wallet currency dropdown, found:",
    currencyOptions.length
  );

  currencyOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      const currency = this.getAttribute("data-currency");
      console.log("Clicked currency:", currency);
      changeCurrency(currency);
      // Close dropdown after selection
      if (currencyDropdown) {
        currencyDropdown.classList.remove("active");
      }
    });
  });
});

initRatesCarousel();
