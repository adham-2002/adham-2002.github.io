/**
 * Main JavaScript Entry Point - Modular Architecture
 * Initializes all application modules
 */

// Import note: If using ES6 modules, uncomment these:
// import ThemeManager from './modules/theme-toggle.js';
// import NavigationManager from './modules/navigation.js';
// import LoadingManager from './modules/loading.js';
// import EasterEggManager from './modules/easter-egg.js';
// import AnimationsManager from './modules/animations.js';

// Initialize all modules when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log(
    "%c🚀 Portfolio Initialized (Modular)",
    "color: #22c55e; font-size: 16px; font-weight: bold;"
  );

  // Only initialize if not already initialized by script.js
  if (!window.portfolioInitialized) {
    // Initialize Loading Screen
    const loadingManager = new LoadingManager();

    // Initialize Theme Toggle
    const themeManager = new ThemeManager();

    // Initialize Navigation
    const navigationManager = new NavigationManager();

    // Initialize Easter Egg
    const easterEggManager = new EasterEggManager();

    // Initialize Animations
    const animationsManager = new AnimationsManager();

    // Initialize Carousel (if on page)
    if (document.querySelector(".udemy-carousel-3d")) {
      initUdemyCarousel();
    }

    // Initialize Contact Form (if on page)
    if (document.querySelector(".contact-form")) {
      initContactForm();
    }

    console.log(
      "%c✅ All modules loaded successfully",
      "color: #10b981; font-size: 14px;"
    );
  } else {
    console.log(
      "%c✅ Using original script.js (backward compatibility mode)",
      "color: #10b981; font-size: 14px;"
    );
  }
});

/**
 * Udemy Carousel Functionality
 */
function initUdemyCarousel() {
  const cards = document.querySelectorAll(".udemy-card");
  const prevBtn = document.querySelector(".udemy-prev");
  const nextBtn = document.querySelector(".udemy-next");
  let currentIndex = 0;

  function updateCarousel() {
    cards.forEach((card, index) => {
      card.classList.remove("active", "prev", "next");

      if (index === currentIndex) {
        card.classList.add("active");
      } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
        card.classList.add("prev");
      } else if (index === (currentIndex + 1) % cards.length) {
        card.classList.add("next");
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    });
  }

  // Flip cards on click
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });

  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  const carousel = document.querySelector(".udemy-carousel-3d");
  if (carousel) {
    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    }
    if (touchEndX > touchStartX + 50) {
      // Swipe right
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCarousel();
    }
  }

  // Initialize
  updateCarousel();
}

/**
 * Contact Form Handler
 */
function initContactForm() {
  const form = document.querySelector(".contact-form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("Form submitted:", data);

    // Show success message (customize as needed)
    alert("Thank you for your message! I will get back to you soon.");

    // Reset form
    form.reset();

    // Here you would typically send the data to a backend API
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
  });
}

/**
 * Utility Functions
 */

// Smooth scroll to element
function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export utilities if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    scrollToElement,
    debounce,
  };
}
