/**
 * Theme Toggle Module
 * Handles dark/light mode switching with persistence
 */

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("theme-toggle");
    this.body = document.body;
    this.init();
  }

  init() {
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem("theme") || "dark";

    if (currentTheme === "dark") {
      this.body.classList.add("dark");
      this.updateThemeIcon(true);
    } else {
      this.updateThemeIcon(false);
    }

    // Add event listener
    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => this.toggleTheme());
    }
  }

  toggleTheme() {
    this.body.classList.toggle("dark");
    const isDark = this.body.classList.contains("dark");

    this.updateThemeIcon(isDark);
    this.updateNavbarBackground();
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  updateThemeIcon(isDark) {
    if (!this.themeToggle) return;

    this.themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  updateNavbarBackground() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const isDark = this.body.classList.contains("dark");
    const scrolled = window.scrollY > 50;

    if (scrolled) {
      navbar.classList.add("scrolled");
      navbar.style.background = isDark
        ? "rgba(15, 23, 42, 0.98)"
        : "rgba(255, 255, 255, 0.98)";
    } else {
      navbar.classList.remove("scrolled");
      navbar.style.background = isDark
        ? "rgba(15, 23, 42, 0.95)"
        : "rgba(255, 255, 255, 0.95)";
    }
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = ThemeManager;
}
