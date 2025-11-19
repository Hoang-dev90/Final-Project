// Wallet Currency Switcher
const currencyData = {
  BTC: {
    amount: "0.00 BTC",
    equivalent: "≈ 0.00 VND",
  },
  VND: {
    amount: "0.00 VND",
    equivalent: "≈ 0.00 BTC",
  },
  USDT: {
    amount: "0.00 USDT",
    equivalent: "≈ 0.00 VND",
  },
};

// Current selected currency
let currentCurrency = "BTC";

// Change currency function
function changeCurrency(currency) {
  if (currency === currentCurrency) return;

  // Update current currency
  currentCurrency = currency;

  // Update the display values
  const balanceAmount = document.querySelector(".balance-amount");
  const balanceUsd = document.querySelector(".balance-usd");

  if (balanceAmount && balanceUsd) {
    balanceAmount.textContent = currencyData[currency].amount;
    balanceUsd.textContent = currencyData[currency].equivalent;
  }

  // Update active state in dropdown
  const currencyOptions = document.querySelectorAll(".currency-option");
  currencyOptions.forEach((option) => {
    option.classList.remove("active");
    if (option.dataset.currency === currency) {
      option.classList.add("active");
    }
  });

  // Hide dropdown after selection
  const dropdown = document.querySelector(".currency-dropdown-menu");
  if (dropdown) {
    dropdown.style.opacity = "0";
    dropdown.style.visibility = "hidden";

    // Reset after animation
    setTimeout(() => {
      dropdown.style.opacity = "";
      dropdown.style.visibility = "";
    }, 200);
  }

  // Add visual feedback
  const balanceContainer = document.querySelector(".balance-amount-container");
  if (balanceContainer) {
    balanceContainer.style.transform = "scale(1.05)";
    setTimeout(() => {
      balanceContainer.style.transform = "scale(1)";
    }, 150);
  }

  console.log(`Currency changed to: ${currency}`);
}

// Dropdown toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector(".currency-dropdown-btn");
  const dropdownMenu = document.querySelector(".currency-dropdown-menu");
  const dropdown = document.querySelector(".currency-dropdown");

  if (dropdownBtn && dropdownMenu) {
    // Toggle dropdown on button click
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

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) {
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.visibility = "hidden";
      }
    });

    // Keep dropdown open when clicking inside
    dropdownMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
});

// Example function to update balance values (can be connected to real data)
function updateBalance(btcAmount) {
  const exchangeRates = {
    BTC_TO_VND: 2400000000, // Example rate: 1 BTC = 2.4B VND
    BTC_TO_USDT: 97000, // Example rate: 1 BTC = 97k USDT
    USDT_TO_VND: 25000, // Example rate: 1 USDT = 25k VND
  };

  const vndAmount = btcAmount * exchangeRates.BTC_TO_VND;
  const usdtAmount = btcAmount * exchangeRates.BTC_TO_USDT;

  // Update currency data
  currencyData.BTC = {
    amount: `${btcAmount.toFixed(8)} BTC`,
    equivalent: `≈ ${vndAmount.toLocaleString("vi-VN")} VND`,
  };

  currencyData.VND = {
    amount: `${vndAmount.toLocaleString("vi-VN")} VND`,
    equivalent: `≈ ${btcAmount.toFixed(8)} BTC`,
  };

  currencyData.USDT = {
    amount: `${usdtAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })} USDT`,
    equivalent: `≈ ${vndAmount.toLocaleString("vi-VN")} VND`,
  };

  // Update display if current currency matches
  if (currentCurrency) {
    changeCurrency(currentCurrency);
  }
}

// Initialize with demo data (remove this in production)
document.addEventListener("DOMContentLoaded", function () {
  // Example: User has 0.00123 BTC
  updateBalance(1);
});
