/**
 * Easter Egg Module
 * Logo click counter with confetti animation
 */

class EasterEggManager {
  constructor() {
    this.logo = document.getElementById("logo");
    this.clickCounterDisplay = document.getElementById("click-counter");
    this.clickCount = parseInt(localStorage.getItem("logoClickCount")) || 0;
    this.confettiTriggered =
      localStorage.getItem("confettiTriggered") === "true";
    this.init();
  }

  init() {
    // Show console hints
    this.showConsoleHints();

    // Update counter display
    this.updateClickCounter();

    // Add click event listener
    if (this.logo) {
      this.logo.addEventListener("click", () => this.handleLogoClick());
    }
  }

  showConsoleHints() {
    console.log(
      "%c🎉 Easter Egg Alert! 🎉",
      "font-size: 20px; font-weight: bold; color: #22c55e; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
    );
    console.log(
      "%cTry clicking on my name (logo) in the navigation... 👀",
      "font-size: 14px; color: #667eea;"
    );
    console.log(
      "%cHint: Something magical happens at 100 clicks! ✨",
      "font-size: 12px; color: #888;"
    );
  }

  handleLogoClick() {
    this.clickCount++;
    localStorage.setItem("logoClickCount", this.clickCount);
    this.updateClickCounter();

    if (this.clickCount === 100 && !this.confettiTriggered) {
      this.createConfetti();
      this.confettiTriggered = true;
      localStorage.setItem("confettiTriggered", "true");
    }
  }

  updateClickCounter() {
    if (!this.clickCounterDisplay) return;

    if (this.clickCount > 0 && this.clickCount < 100) {
      this.clickCounterDisplay.textContent = this.clickCount + "/100";
      this.clickCounterDisplay.style.display = "inline-block";
    } else if (this.clickCount >= 100 && !this.confettiTriggered) {
      this.clickCounterDisplay.textContent = "🎉 100!";
      this.clickCounterDisplay.style.display = "inline-block";
    } else if (this.confettiTriggered) {
      this.clickCounterDisplay.textContent = "✨";
      this.clickCounterDisplay.style.display = "inline-block";
    }
  }

  createConfetti() {
    const colors = [
      "#22c55e",
      "#16a34a",
      "#10b981",
      "#14b8a6",
      "#06b6d4",
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#a855f7",
      "#d946ef",
      "#ec4899",
      "#f43f5e",
    ];
    const confettiCount = 150;

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti-piece";

        // Random starting position across the top of the screen
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.top = "-10px";
        confetti.style.background =
          colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 8 + 4 + "px";
        confetti.style.height = Math.random() * 12 + 8 + "px";
        confetti.style.position = "fixed";
        confetti.style.zIndex = "10000";
        confetti.style.pointerEvents = "none";
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        confetti.style.animation = `confettiFall ${
          Math.random() * 2 + 3
        }s linear forwards`;

        // Random rotation
        const rotation = Math.random() * 360;
        confetti.style.transform = `rotate(${rotation}deg)`;

        document.body.appendChild(confetti);

        // Remove after animation completes
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }, i * 10);
    }

    // Log congratulations message
    console.log(
      "%c🎊 CONGRATULATIONS! 🎊",
      "font-size: 24px; font-weight: bold; color: #22c55e; background: #0f172a; padding: 10px;"
    );
    console.log(
      "%cYou found the hidden Easter egg! 🥚✨",
      "font-size: 16px; color: #667eea;"
    );
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = EasterEggManager;
}
