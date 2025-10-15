/**
 * Loading Screen Module
 * Handles quantum atom loading animation and percentage counter
 */

class LoadingManager {
  constructor() {
    this.loadingScreen = document.getElementById("loading-screen");
    this.mainContent = document.getElementById("main-content");
    this.percentageElement = document.querySelector(".loading-percentage");
    this.init();
  }

  init() {
    // Start loading animation
    window.addEventListener("load", () => this.handleLoad());
  }

  handleLoad() {
    if (this.loadingScreen && this.mainContent) {
      // Start percentage animation
      this.animatePercentage();

      setTimeout(() => {
        this.hideLoadingScreen();
      }, 2500); // Show loading for 2.5 seconds
    }
  }

  animatePercentage() {
    if (!this.percentageElement) return;

    let progress = 0;
    const duration = 2500; // 2.5 seconds
    const steps = 100;
    const increment = duration / steps;

    const counter = setInterval(() => {
      progress += 1;
      this.percentageElement.textContent = progress + "%";

      if (progress >= 100) {
        clearInterval(counter);
      }
    }, increment);
  }

  hideLoadingScreen() {
    this.loadingScreen.classList.add("hidden");
    this.mainContent.classList.add("visible");

    // Remove loading screen from DOM after transition
    setTimeout(() => {
      this.loadingScreen.style.display = "none";

      // Trigger event for other modules that depend on content being loaded
      document.dispatchEvent(new Event("contentLoaded"));
    }, 1000);
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = LoadingManager;
}
