/**
 * Animations Module
 * Handles scroll-triggered animations and IntersectionObserver
 */

class AnimationsManager {
  constructor() {
    this.config = {
      duration: 800,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      staggerDelay: 100,
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
    };

    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    this.init();
  }

  init() {
    // Wait for content to load before initializing animations
    document.addEventListener("contentLoaded", () => {
      this.initScrollAnimations();
    });
  }

  initScrollAnimations() {
    if (this.prefersReducedMotion) return;

    const observerOptions = {
      threshold: this.config.threshold,
      rootMargin: this.config.rootMargin,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
      ".fade-in, .slide-up, .slide-left, .slide-right, .scale-up, .scale-down, .rotate-in, .scroll-reveal"
    );

    animatedElements.forEach((el, index) => {
      // Add stagger delay for elements in the same parent
      if (el.classList.contains("stagger-1")) {
        el.style.transitionDelay = `${this.config.staggerDelay}ms`;
      } else if (el.classList.contains("stagger-2")) {
        el.style.transitionDelay = `${this.config.staggerDelay * 2}ms`;
      } else if (el.classList.contains("stagger-3")) {
        el.style.transitionDelay = `${this.config.staggerDelay * 3}ms`;
      } else if (el.classList.contains("stagger-4")) {
        el.style.transitionDelay = `${this.config.staggerDelay * 4}ms`;
      } else if (el.classList.contains("stagger-5")) {
        el.style.transitionDelay = `${this.config.staggerDelay * 5}ms`;
      } else if (el.classList.contains("stagger-6")) {
        el.style.transitionDelay = `${this.config.staggerDelay * 6}ms`;
      }

      observer.observe(el);
    });

    // Floating animations
    this.initFloatingAnimations();
  }

  initFloatingAnimations() {
    const floatingElements = document.querySelectorAll(".floating");

    floatingElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
    });
  }

  // Parallax effect for hero section
  initParallax() {
    const heroImage = document.querySelector(".hero-image");

    if (!heroImage || this.prefersReducedMotion) return;

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * this.config.parallaxSpeed;
      heroImage.style.transform = `translateY(${parallax}px)`;
    });
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = AnimationsManager;
}
