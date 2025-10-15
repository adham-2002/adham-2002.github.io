/**
 * Navigation Module
 * Handles mobile menu, smooth scrolling, and navbar effects
 */

class NavigationManager {
  constructor() {
    this.hamburger = document.querySelector(".hamburger");
    this.navMenu = document.querySelector(".nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.navbar = document.querySelector(".navbar");
    this.init();
  }

  init() {
    // Hamburger menu toggle
    if (this.hamburger) {
      this.hamburger.addEventListener("click", () => this.toggleMenu());
    }

    // Smooth scrolling for navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e, link));
    });

    // Scroll effects
    window.addEventListener("scroll", () => this.handleScroll());

    // Initial navbar state
    this.updateNavbar();
  }

  toggleMenu() {
    this.hamburger.classList.toggle("active");
    this.navMenu.classList.toggle("active");
  }

  handleNavClick(e, link) {
    const href = link.getAttribute("href");

    // Only handle internal links
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile menu
      this.hamburger?.classList.remove("active");
      this.navMenu?.classList.remove("active");

      // Update active state
      this.updateActiveLink(link);
    }
  }

  updateActiveLink(activeLink) {
    this.navLinks.forEach((link) => link.classList.remove("active"));
    activeLink.classList.add("active");
  }

  handleScroll() {
    this.updateNavbar();
    this.highlightActiveSection();
  }

  updateNavbar() {
    if (!this.navbar) return;

    const scrolled = window.scrollY > 50;
    const isDark = document.body.classList.contains("dark");

    if (scrolled) {
      this.navbar.classList.add("scrolled");
      this.navbar.style.background = isDark
        ? "rgba(15, 23, 42, 0.98)"
        : "rgba(255, 255, 255, 0.98)";
    } else {
      this.navbar.classList.remove("scrolled");
      this.navbar.style.background = isDark
        ? "rgba(15, 23, 42, 0.95)"
        : "rgba(255, 255, 255, 0.95)";
    }
  }

  highlightActiveSection() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const correspondingLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`
      );

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        correspondingLink?.classList.add("active");
      } else {
        correspondingLink?.classList.remove("active");
      }
    });
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = NavigationManager;
}
