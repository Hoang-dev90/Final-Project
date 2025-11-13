function toggleSearchPanel() {
  const panel = document.getElementById("searchPanel");
  const overlay = document.getElementById("searchOverlay");

  panel.classList.toggle("active");
  overlay.classList.toggle("active");

  // Focus vào input khi mở
  if (panel.classList.contains("active")) {
    setTimeout(() => {
      panel.querySelector(".search-input").focus();
    }, 300);
  }
}

// Đóng panel khi nhấn ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const panel = document.getElementById("searchPanel");
    const overlay = document.getElementById("searchOverlay");
    if (panel.classList.contains("active")) {
      panel.classList.remove("active");
      overlay.classList.remove("active");
    }
  }
});

// Xử lý notification tabs
document.addEventListener("DOMContentLoaded", function () {
  const notificationTabs = document.querySelectorAll(".notification-tab");

  notificationTabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.stopPropagation();
      // Remove active class from all tabs
      notificationTabs.forEach((t) => t.classList.remove("active"));
      // Add active class to clicked tab
      this.classList.add("active");
    });
  });

  // Prevent notification panel from closing when clicking inside
  const notificationPanel = document.querySelector(".notification-panel");
  if (notificationPanel) {
    notificationPanel.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById("themeToggle");
  const footerThemeToggle = document.getElementById("footerThemeToggle");
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    if (footerThemeToggle) {
      footerThemeToggle.checked = true;
    }
  }

  // Navbar theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      body.classList.toggle("light-mode");

      // Sync with footer toggle
      if (footerThemeToggle) {
        footerThemeToggle.checked = body.classList.contains("light-mode");
      }

      // Save theme preference
      if (body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
      } else {
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // Footer theme toggle
  if (footerThemeToggle) {
    footerThemeToggle.addEventListener("change", function () {
      if (this.checked) {
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
      } else {
        body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // Currency dropdown functionality
  const currencyWrapper = document.querySelector(".currency-dropdown-wrapper");
  const currencySelector = document.querySelector(".currency-selector");
  const currencyOptions = document.querySelectorAll(".currency-option");
  const selectedCurrency = document.querySelector(".selected-currency");

  if (currencySelector) {
    currencySelector.addEventListener("click", function (e) {
      e.stopPropagation();
      currencyWrapper.classList.toggle("active");
    });
  }

  currencyOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const currency = this.dataset.currency;

      // Update selected text
      selectedCurrency.textContent = currency;

      // Update active class
      currencyOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      // Close dropdown
      currencyWrapper.classList.remove("active");
    });
  });

  // Language dropdown functionality
  const languageWrapper = document.querySelector(".language-dropdown-wrapper");
  const languageSelector = document.querySelector(".language-selector");
  const languageOptions = document.querySelectorAll(".language-option");
  const selectedLanguage = document.querySelector(".selected-language");

  if (languageSelector) {
    languageSelector.addEventListener("click", function (e) {
      e.stopPropagation();
      languageWrapper.classList.toggle("active");
    });
  }

  languageOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const language = this.dataset.language;

      // Update selected text
      selectedLanguage.textContent = language;

      // Update active class
      languageOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      // Close dropdown
      languageWrapper.classList.remove("active");
    });
  });

  // Theme dropdown functionality
  const themeWrapper = document.querySelector(".theme-dropdown-wrapper");
  const themeSelector = document.querySelector(".theme-selector");
  const themeOptions = document.querySelectorAll(".theme-option");
  const selectedTheme = document.querySelector(".selected-theme");

  if (themeSelector) {
    themeSelector.addEventListener("click", function (e) {
      e.stopPropagation();
      themeWrapper.classList.toggle("active");
    });
  }

  themeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const theme = this.dataset.theme;

      // Update selected text
      selectedTheme.textContent = theme;

      // Update active class
      themeOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      // Close dropdown
      themeWrapper.classList.remove("active");

      // Apply theme
      if (theme === "Light") {
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
      } else {
        body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (currencyWrapper && !currencyWrapper.contains(e.target)) {
      currencyWrapper.classList.remove("active");
    }
    if (languageWrapper && !languageWrapper.contains(e.target)) {
      languageWrapper.classList.remove("active");
    }
    if (themeWrapper && !themeWrapper.contains(e.target)) {
      themeWrapper.classList.remove("active");
    }
  });

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top-btn");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const halfPage = (scrollHeight - clientHeight) / 2;

    if (scrollTop > halfPage) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Scroll to top when clicked
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Panner close button
  const pannerWrapper = document.querySelector(".panner-wrapper");
  const pannerCloseBtn = document.querySelector(".panner-close-btn");

  if (pannerCloseBtn) {
    pannerCloseBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      pannerWrapper.classList.add("hidden");
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

  // Journey tabs switching (Exchange/Wallet)
  const journeyTabs = document.querySelectorAll(".journey-tab");
  const journeyExchangeContent = document.querySelector(
    ".journey-content-exchange"
  );
  const journeyWalletContent = document.querySelector(
    ".journey-content-wallet"
  );

  journeyTabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      journeyTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Show corresponding content
      if (index === 0) {
        // Exchange tab
        journeyExchangeContent.classList.add("active");
        journeyWalletContent.classList.remove("active");
      } else {
        // Wallet tab
        journeyWalletContent.classList.add("active");
        journeyExchangeContent.classList.remove("active");
      }
    });
  });

  // Promotions Carousel
  const promoTrack = document.querySelector(".promo-track");
  const promoCards = document.querySelectorAll(".promo-card");
  const promoArrowLeft = document.querySelector(".promo-arrow-left");
  const promoArrowRight = document.querySelector(".promo-arrow-right");

  let currentIndex = 0;
  const totalCards = promoCards.length;

  // Calculate cards per view based on screen width
  function getCardsPerView() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1024) return 3;
    return 4;
  }

  function updateCarousel() {
    const cardsPerView = getCardsPerView();
    const cardWidth = promoCards[0].offsetWidth;
    const gap = 10;
    const translateX = -(currentIndex * (cardWidth + gap));
    promoTrack.style.transform = `translateX(${translateX}px)`;
  }

  promoArrowRight.addEventListener("click", function () {
    const cardsPerView = getCardsPerView();
    const maxIndex = totalCards - cardsPerView;

    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to start
    }
    updateCarousel();
  });

  promoArrowLeft.addEventListener("click", function () {
    const cardsPerView = getCardsPerView();
    const maxIndex = totalCards - cardsPerView;

    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex; // Loop to end
    }
    updateCarousel();
  });

  // Update carousel on window resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const cardsPerView = getCardsPerView();
      const maxIndex = totalCards - cardsPerView;
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }
      updateCarousel();
    }, 250);
  });

  // Initial update
  updateCarousel();
});

// FAQ Accordion
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      // If the clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
