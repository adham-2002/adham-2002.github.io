// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Progress Bar
  const progressBar = document.getElementById("progress-bar");

  // Loading Screen
  const loadingScreen = document.getElementById("loading-screen");

  // Hide loading screen after page loads
  window.addEventListener("load", () => {
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        // Remove from DOM after transition completes
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 500);
      }, 1000); // Show loading for at least 1 second
    }
  });

  // Function to update progress bar based on scroll position
  function updateProgressBar() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    if (progressBar) {
      progressBar.style.width = scrollPercentage + "%";
    }
  }

  // Function to update navbar background based on theme and scroll position
  function updateNavbarBackground() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const isDark = body.classList.contains("dark");
    const scrolled = window.scrollY > 50;

    if (scrolled) {
      navbar.style.background = isDark
        ? "rgba(15, 23, 42, 0.98)"
        : "rgba(255, 255, 255, 0.98)";
    } else {
      navbar.style.background = isDark
        ? "rgba(15, 23, 42, 0.95)"
        : "rgba(255, 255, 255, 0.95)";
    }
  }

  // Function to toggle theme icons
  function updateThemeIcon(isDark) {
    if (!themeToggle) return;

    const moonIcon = themeToggle.querySelector(".moon-icon");
    const sunIcon = themeToggle.querySelector(".sun-icon");

    if (moonIcon && sunIcon) {
      if (isDark) {
        moonIcon.style.display = "none";
        sunIcon.style.display = "block";
      } else {
        moonIcon.style.display = "block";
        sunIcon.style.display = "none";
      }
    }
  }

  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem("theme") || "dark";
  if (currentTheme === "dark") {
    body.classList.add("dark");
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }

  // Update navbar background and progress bar on initial load
  updateNavbarBackground();
  updateProgressBar();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        updateThemeIcon(true);
        themeToggle.setAttribute("aria-label", "Switch to light mode");
        localStorage.setItem("theme", "dark");
      } else {
        updateThemeIcon(false);
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
        localStorage.setItem("theme", "light");
      }

      // Update navbar background immediately when theme changes
      updateNavbarBackground();
    });
  }

  // Mobile Navigation
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isActive = hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");

      // Update ARIA attributes for accessibility
      hamburger.setAttribute("aria-expanded", isActive);
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Smooth Scrolling with navbar offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const navbarHeight = 70;
        const targetPosition = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Typing Animation
  const typingText = document.getElementById("typing-text");
  const texts = ["Backend Developer & DevOps Engineer"];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    if (!typingText) return;

    const currentText = texts[textIndex];

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before next text
    }

    setTimeout(typeWriter, typeSpeed);
  }

  // Start typing animation
  if (typingText) {
    typeWriter();
  }

  // Update scroll-based elements on scroll
  window.addEventListener("scroll", () => {
    updateProgressBar();
    updateNavbarBackground();
  });

  // Intersection Observer for Fade-in Animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });

  // Skill Bar Animation
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll(".skill-bar");
          skillBars.forEach((bar) => {
            const width = bar.getAttribute("data-width");
            setTimeout(() => {
              bar.style.width = width;
            }, 200);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe skills section
  const skillsSection = document.querySelector(".skills");
  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }

  // Contact Form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Create mailto link
      const mailtoLink = `mailto:adham54732@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      alert("Thank you for your message! Your email client should open now.");

      // Reset form
      this.reset();
    });
  }

  // Active Navigation Link
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbarHeight = 70;

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionBottom = sectionTop + section.clientHeight;
      const scrollPosition = window.pageYOffset;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Project Card Hover Effects
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // Console message for developers
  console.log(`
🚀 Welcome to Adham's Portfolio!
📧 Contact: adham54732@gmail.com
💼 LinkedIn: linkedin.com/in/adhamelganzoury
🐙 GitHub: github.com/adham-2002

Built with vanilla HTML, CSS, and JavaScript
`);
}); // End of DOMContentLoaded
