// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Mark portfolio as initialized to prevent conflicts with modular JS
  window.portfolioInitialized = true;

  // ========================================
  // EASTER EGG HINT
  // ========================================
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

  // ========================================
  // ANIMATION CONFIGURATION
  // ========================================
  const animationConfig = {
    duration: 800,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    staggerDelay: 100,
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  };

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Loading Screen
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  // ========================================
  // LOADING SCREEN WITH PERCENTAGE COUNTER
  // ========================================

  // Animate percentage counter
  function animatePercentage() {
    const percentageElement = document.querySelector(".loading-percentage");
    if (!percentageElement) return;

    let progress = 0;
    const duration = 2500; // 2.5 seconds
    const steps = 100;
    const increment = duration / steps;

    const counter = setInterval(() => {
      progress += 1;
      percentageElement.textContent = progress + "%";

      if (progress >= 100) {
        clearInterval(counter);
      }
    }, increment);
  }

  // Hide loading screen after page loads with advanced timing
  window.addEventListener("load", () => {
    if (loadingScreen && mainContent) {
      // Start percentage animation
      animatePercentage();

      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        // Show main content
        mainContent.classList.add("visible");
        // Remove loading screen from DOM after transition completes
        setTimeout(() => {
          loadingScreen.style.display = "none";
          // Trigger initial animations
          initScrollAnimations();
        }, 1000);
      }, 2500); // Show loading for 2.5 seconds - balanced timing for quantum atom animation
    }
  });

  // ========================================
  // ENHANCED NAVBAR SCROLL EFFECTS
  // ========================================
  function updateNavbarBackground() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const isDark = body.classList.contains("dark");
    const scrolled = window.scrollY > 50;

    // Add/remove scrolled class for CSS transitions
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

  // Function to toggle theme icons
  function updateThemeIcon(isDark) {
    if (!themeToggle) return;

    // Update aria-label for accessibility
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem("theme") || "dark";
  if (currentTheme === "dark") {
    body.classList.add("dark");
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }

  // Update navbar background on initial load
  updateNavbarBackground();


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

  // ========================================
  // LOGO CLICK COUNTER WITH CONFETTI 🎉
  // ========================================
  const logo = document.getElementById("logo");
  const clickCounterDisplay = document.getElementById("click-counter");
  let clickCount = parseInt(localStorage.getItem("logoClickCount")) || 0;
  let confettiTriggered = localStorage.getItem("confettiTriggered") === "true";

  // Update counter display
  function updateClickCounter() {
    if (clickCount > 0 && clickCount < 100) {
      clickCounterDisplay.textContent = clickCount + "/100";
      clickCounterDisplay.style.display = "inline-block";
    } else if (clickCount >= 100 && !confettiTriggered) {
      clickCounterDisplay.textContent = "🎉 100!";
      clickCounterDisplay.style.display = "inline-block";
    } else if (confettiTriggered) {
      clickCounterDisplay.textContent = "✨";
      clickCounterDisplay.style.display = "inline-block";
    }
  }

  // Create confetti effect
  function createConfetti() {
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

        // Random color
        confetti.style.background =
          colors[Math.floor(Math.random() * colors.length)];

        // Random size
        const size = Math.random() * 8 + 4;
        confetti.style.width = size + "px";
        confetti.style.height = size * 1.5 + "px";

        // Random rotation speed
        const randomRotation = Math.random() * 360;
        confetti.style.transform = `rotate(${randomRotation}deg)`;

        // Random animation duration
        const duration = Math.random() * 2 + 2;
        confetti.style.animationDuration = duration + "s";

        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 200;
        confetti.style.setProperty("--drift", drift + "px");

        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
          confetti.remove();
        }, duration * 1000);
      }, i * 10); // Stagger the confetti creation
    }

    // Play celebration sound (optional - you can add this later)
    console.log("🎉 Congratulations! You found the Easter egg! 🎊");

    // Show celebration message
    showCelebrationMessage();
  }

  // Show celebration message
  function showCelebrationMessage() {
    const message = document.createElement("div");
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem 3rem;
      border-radius: 20px;
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
      z-index: 10000;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: bounceIn 0.6s ease;
    `;
    message.innerHTML = `
      🎉 Congratulations! 🎊<br>
      <span style="font-size: 1rem; font-weight: 400; margin-top: 0.5rem; display: block;">
        You found the secret Easter egg!
      </span>
    `;

    document.body.appendChild(message);

    // Remove message after 4 seconds
    setTimeout(() => {
      message.style.animation = "fadeOut 0.5s ease";
      setTimeout(() => message.remove(), 500);
    }, 4000);
  }

  // Logo click handler
  if (logo) {
    logo.addEventListener("click", (e) => {
      if (confettiTriggered) {
        // Already triggered, just show a small celebration
        createMiniConfetti(e);
        return;
      }

      clickCount++;
      localStorage.setItem("logoClickCount", clickCount);

      // Add bounce animation
      logo.style.animation = "none";
      setTimeout(() => {
        logo.style.animation = "bounce 0.5s ease";
      }, 10);

      updateClickCounter();

      // Trigger confetti at 100 clicks
      if (clickCount >= 100 && !confettiTriggered) {
        confettiTriggered = true;
        localStorage.setItem("confettiTriggered", "true");
        createConfetti();
      }

      // Milestone messages
      if (clickCount === 10) {
        console.log("🎯 10 clicks! Keep going...");
      } else if (clickCount === 25) {
        console.log("🔥 25 clicks! You're persistent!");
      } else if (clickCount === 50) {
        console.log("⚡ 50 clicks! Halfway there!");
      } else if (clickCount === 75) {
        console.log("🚀 75 clicks! Almost there!");
      } else if (clickCount === 99) {
        console.log("😱 99 clicks! ONE MORE!!!");
      }
    });

    // Initialize counter on page load
    updateClickCounter();
  }

  // Create mini confetti for post-100 clicks
  function createMiniConfetti(e) {
    const colors = ["#22c55e", "#16a34a", "#10b981", "#14b8a6", "#06b6d4"];

    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti-piece";
      confetti.style.left = e.clientX + "px";
      confetti.style.top = e.clientY + "px";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = "6px";
      confetti.style.height = "8px";
      confetti.style.animationDuration = "1.5s";

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 1500);
    }
  }

  // Reset Easter egg (for testing - remove in production or add a secret command)
  // Uncomment to enable reset via console:
  // window.resetEasterEgg = () => {
  //   localStorage.removeItem('logoClickCount');
  //   localStorage.removeItem('confettiTriggered');
  //   clickCount = 0;
  //   confettiTriggered = false;
  //   updateClickCounter();
  //   console.log('Easter egg reset!');
  // };

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
      smoothScrollToSection(target);
    });
  });

  // ========================================
  // ENHANCED CARD HOVER EFFECTS
  // ========================================
  function initCardAnimations() {
    // Project cards
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        if (!prefersReducedMotion) {
          this.style.transform = "translateY(-8px) scale(1.02)";
        }
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });

    // Service cards
    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        if (!prefersReducedMotion) {
          this.style.transform = "translateY(-5px) rotate(1deg)";
        }
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) rotate(0deg)";
      });
    });

    // Testimonial cards
    document.querySelectorAll(".testimonial-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        if (!prefersReducedMotion) {
          this.style.transform = "translateY(-5px) scale(1.01)";
        }
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  // Initialize card animations
  initCardAnimations();

  // ========================================
  // ANIMATED COUNTERS FOR STATS
  // ========================================
  function animateCounter(element, target, duration = 2000, isDecimal = false) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = isDecimal ? target.toFixed(2) : target + "+";
        clearInterval(timer);
      } else {
        element.textContent = isDecimal
          ? current.toFixed(2)
          : Math.floor(current) + "+";
      }
    }, 16);
  }

  // Observe stats section for counter animation
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = "true";

          const statNumbers = entry.target.querySelectorAll(".stat-number");
          statNumbers.forEach((stat) => {
            const targetText = stat.textContent;
            const target = parseFloat(targetText);
            const isDecimal = targetText.includes(".");

            if (!isNaN(target)) {
              animateCounter(stat, target, 2000, isDecimal);
            }
          });

          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const aboutStats = document.querySelector(".about-stats");
  if (aboutStats) {
    statsObserver.observe(aboutStats);
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
    updateNavbarBackground();
    updateParallax();
  });

  // ========================================
  // PARALLAX SCROLL EFFECTS
  // ========================================
  function updateParallax() {
    if (prefersReducedMotion) return;

    const scrolled = window.pageYOffset;

    // Parallax for hero section
    const hero = document.querySelector(".hero");
    if (hero) {
      const heroContent = hero.querySelector(".hero-container");
      if (heroContent) {
        const speed = 0.5;
        heroContent.style.transform = `translateY(${scrolled * speed}px)`;
      }
    }

    // Parallax for section backgrounds
    document.querySelectorAll(".parallax-bg").forEach((element) => {
      const speed = element.dataset.speed || 0.3;
      const rect = element.getBoundingClientRect();
      const scrollPercent =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const yPos = -(scrollPercent * 100 * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  // ========================================
  // SCROLL REVEAL ANIMATIONS
  // ========================================
  function initScrollAnimations() {
    if (prefersReducedMotion) {
      // If user prefers reduced motion, show all elements immediately
      document.querySelectorAll(".scroll-reveal, .fade-in").forEach((el) => {
        el.classList.add("revealed", "visible");
      });
      return;
    }

    // Create Intersection Observer for scroll animations
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add stagger delay if element has stagger class
            const staggerMatch = entry.target.className.match(/stagger-(\d+)/);
            const delay = staggerMatch
              ? parseInt(staggerMatch[1]) * animationConfig.staggerDelay
              : 0;

            setTimeout(() => {
              entry.target.classList.add("revealed", "visible");
            }, delay);

            // Unobserve after revealing (one-time animation)
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: animationConfig.threshold,
        rootMargin: animationConfig.rootMargin,
      }
    );

    // Observe all scroll-reveal elements
    document
      .querySelectorAll(
        ".scroll-reveal, .fade-in, .slide-up, .slide-down, .slide-left, .slide-right, .scale-up, .rotate-in"
      )
      .forEach((el) => {
        revealObserver.observe(el);
      });
  }

  // ========================================
  // SMOOTH SCROLL WITH OFFSET
  // ========================================
  function smoothScrollToSection(target) {
    if (!target) return;

    const navbarHeight = 70;
    const targetPosition = target.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

  // Update scroll-based elements on scroll
  window.addEventListener("scroll", () => {
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

  // ========================================
  // SCROLL-TRIGGERED TIMELINE ANIMATIONS
  // ========================================
  function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll(".timeline-item");

    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, index * 150);

            timelineObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    timelineItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";
      item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      timelineObserver.observe(item);
    });
  }

  // Initialize timeline animations
  if (!prefersReducedMotion) {
    initTimelineAnimations();
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

  // ========================================
  // MOUSE PARALLAX EFFECT ON HERO
  // ========================================
  function initMouseParallax() {
    if (prefersReducedMotion) return;

    const hero = document.querySelector(".hero");
    const heroImage = document.querySelector(".hero-image");

    if (hero && heroImage) {
      hero.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = hero.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        const moveX = (x - 0.5) * 30;
        const moveY = (y - 0.5) * 30;

        heroImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      });

      hero.addEventListener("mouseleave", () => {
        heroImage.style.transform = "translate(0, 0) scale(1)";
      });

      heroImage.style.transition = "transform 0.3s ease-out";
    }
  }

  initMouseParallax();

  // ========================================
  // FLOATING ANIMATION FOR HERO IMAGE
  // ========================================
  function initFloatingAnimation() {
    const heroImage = document.querySelector(".hero-image .image-placeholder");
    if (heroImage && !prefersReducedMotion) {
      heroImage.classList.add("floating");
    }
  }

  initFloatingAnimation();

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
✨ Enhanced with modern scroll animations
♿ Respects prefers-reduced-motion
`);

  // ========================================
  // PERFORMANCE OPTIMIZATION
  // ========================================
  // Debounce scroll events for better performance
  let scrollTimeout;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(() => {
        updateNavbarBackground();
        updateParallax();
      });
    },
    { passive: true }
  );

  // ========================================
  // UDEMY COURSES 3D CONICAL CAROUSEL
  // ========================================
  const udemySection = document.querySelector(".udemy-courses");

  if (udemySection) {
    const carousel = udemySection.querySelector(".udemy-carousel-3d");
    const cards = Array.from(udemySection.querySelectorAll(".udemy-card"));
    const prevBtn = udemySection.querySelector(".udemy-prev");
    const nextBtn = udemySection.querySelector(".udemy-next");

    if (!carousel || cards.length === 0) {
      console.warn("⚠️ Carousel elements not found");
      return;
    }

    let currentRotation = 0;
    let targetRotation = 0;
    let currentCardIndex = 0; // Track which card is centered
    let isAutoRotating = true;
    let autoSpeed = 0.15;
    let animationId = null;
    let isDragging = false;
    let startDragX = 0;
    let dragStartRotation = 0;

    const totalCards = cards.length;
    const anglePerCard = 360 / totalCards;
    const radius = 500;

    console.log(`🎡 Initializing 3D Carousel with ${totalCards} cards`);

    // Position cards in circular formation
    function setupCarousel() {
      cards.forEach((card, index) => {
        const angle = anglePerCard * index;
        card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        card.setAttribute("data-index", index);
        card.setAttribute("data-angle", angle);
      });
    }

    // Animate rotation
    function animate() {
      // Smooth easing
      const diff = targetRotation - currentRotation;
      currentRotation += diff * 0.08;

      // Auto-rotate
      if (isAutoRotating && !isDragging) {
        targetRotation -= autoSpeed;
        // Update current index based on rotation
        updateCurrentIndex();
      }

      // Apply rotation
      carousel.style.transform = `rotateY(${currentRotation}deg)`;

      // Update center card
      highlightCenterCard();

      animationId = requestAnimationFrame(animate);
    }

    // Update current card index based on rotation
    function updateCurrentIndex() {
      const normalizedRotation = ((currentRotation % 360) + 360) % 360;
      const cardPosition =
        Math.round(normalizedRotation / anglePerCard) % totalCards;
      currentCardIndex = (totalCards - cardPosition) % totalCards;
    }

    // Find and highlight center card
    function highlightCenterCard() {
      let minDiff = Infinity;
      let centerCard = null;
      let centerIndex = -1;

      cards.forEach((card, index) => {
        const angle = parseFloat(card.dataset.angle);
        const totalAngle = (currentRotation + angle) % 360;
        const normalized = ((totalAngle % 360) + 360) % 360;

        // Distance from front (0 degrees)
        const diff = Math.min(Math.abs(normalized), Math.abs(normalized - 360));

        if (diff < minDiff) {
          minDiff = diff;
          centerCard = card;
          centerIndex = index;
        }

        // Remove highlight and reset transform
        card.classList.remove("centered");
        const innerElement = card.querySelector(".udemy-card-inner");
        if (innerElement && !card.classList.contains("flipped")) {
          innerElement.style.transform = "";
        }
      });

      // Highlight center card and apply scale
      if (centerCard && minDiff < anglePerCard / 2) {
        centerCard.classList.add("centered");
        currentCardIndex = centerIndex;

        // Apply scale to centered card's inner element
        const innerElement = centerCard.querySelector(".udemy-card-inner");
        if (innerElement) {
          const isFlipped = centerCard.classList.contains("flipped");
          if (isFlipped) {
            innerElement.style.transform = "scale(1.05) rotateY(180deg)";
          } else {
            innerElement.style.transform = "scale(1.05)";
          }
        }
      }
    }

    // Navigate to specific card by index
    function goToCardByIndex(index) {
      isAutoRotating = false;

      // Calculate target rotation to show the card at index
      targetRotation = -(anglePerCard * index);
      currentCardIndex = index;

      // Resume auto-rotate after 4 seconds
      setTimeout(() => {
        isAutoRotating = true;
      }, 4000);
    }

    // Navigate to next/previous card
    function navigateCard(direction) {
      isAutoRotating = false;

      if (direction === "next") {
        currentCardIndex = (currentCardIndex + 1) % totalCards;
      } else if (direction === "prev") {
        currentCardIndex = (currentCardIndex - 1 + totalCards) % totalCards;
      }

      // Set target rotation to show the exact card
      targetRotation = -(anglePerCard * currentCardIndex);

      // Resume auto-rotate after 4 seconds
      setTimeout(() => {
        isAutoRotating = true;
      }, 4000);
    }

    // Previous button
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigateCard("prev");
      });
    }

    // Next button
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigateCard("next");
      });
    }

    // Mouse drag
    carousel.addEventListener("mousedown", (e) => {
      if (
        e.target.closest(".udemy-cert-btn") ||
        e.target.closest(".udemy-nav-btn")
      ) {
        return;
      }
      isDragging = true;
      startDragX = e.clientX;
      dragStartRotation = targetRotation;
      isAutoRotating = false;
      carousel.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startDragX;
      targetRotation = dragStartRotation + deltaX * 0.5;
      updateCurrentIndex();
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        carousel.style.cursor = "grab";

        // Snap to nearest card
        updateCurrentIndex();
        targetRotation = -(anglePerCard * currentCardIndex);

        setTimeout(() => {
          isAutoRotating = true;
        }, 3000);
      }
    });

    // Pause on hover
    carousel.addEventListener("mouseenter", () => {
      isAutoRotating = false;
    });

    carousel.addEventListener("mouseleave", () => {
      if (!isDragging) {
        setTimeout(() => {
          isAutoRotating = true;
        }, 500);
      }
    });

    // Touch support for mobile
    let touchStart = 0;
    let touchStartRotation = 0;
    let touchStartTime = 0;
    let lastTouchX = 0;
    let velocity = 0;

    carousel.addEventListener(
      "touchstart",
      (e) => {
        if (e.target.closest(".udemy-cert-btn")) {
          return;
        }

        touchStart = e.touches[0].clientX;
        lastTouchX = touchStart;
        touchStartRotation = targetRotation;
        touchStartTime = Date.now();
        velocity = 0;
        isAutoRotating = false;
      },
      { passive: true }
    );

    carousel.addEventListener(
      "touchmove",
      (e) => {
        const currentTouchX = e.touches[0].clientX;
        const delta = currentTouchX - touchStart;
        const timeDelta = Date.now() - touchStartTime;

        // Calculate velocity for momentum
        velocity = (currentTouchX - lastTouchX) / Math.max(timeDelta, 1);
        lastTouchX = currentTouchX;
        touchStartTime = Date.now();

        targetRotation = touchStartRotation + delta * 0.5;
        updateCurrentIndex();
      },
      { passive: true }
    );

    carousel.addEventListener(
      "touchend",
      (e) => {
        // Apply momentum for smooth deceleration
        const momentum = velocity * 100;
        targetRotation += momentum;

        // Snap to nearest card
        updateCurrentIndex();
        targetRotation = -(anglePerCard * currentCardIndex);

        setTimeout(() => {
          isAutoRotating = true;
        }, 3000);
      },
      { passive: true }
    );

    // Card flip on click
    cards.forEach((card, index) => {
      card.addEventListener("click", (e) => {
        const isCentered = card.classList.contains("centered");
        console.log(`🎴 Card ${index} clicked, centered:`, isCentered);

        // If clicking certificate button on the back, don't flip
        if (e.target.closest(".udemy-cert-btn")) {
          e.stopPropagation();
          return;
        }

        e.stopPropagation();

        // Determine which side was clicked
        const clickedFront = !!e.target.closest(".udemy-card-front");
        const clickedBack = !!e.target.closest(".udemy-card-back");

        const wasFlipped = card.classList.contains("flipped");
        let targetFlipped = wasFlipped;

        // UX rule:
        // - Clicking FRONT always opens details (flip to back)
        // - Clicking BACK (except cert button) flips back to front
        // - Otherwise, toggle
        if (clickedFront) {
          targetFlipped = true;
        } else if (clickedBack) {
          targetFlipped = false;
        } else {
          targetFlipped = !wasFlipped;
        }

        if (targetFlipped) {
          card.classList.add("flipped");
        } else {
          card.classList.remove("flipped");
        }

        // Apply transform directly to inner element to override CSS
        const innerElement = card.querySelector(".udemy-card-inner");
        if (innerElement) {
          if (targetFlipped) {
            innerElement.style.transform = isCentered
              ? "scale(1.05) rotateY(180deg)"
              : "rotateY(180deg)";
          } else {
            innerElement.style.transform = isCentered ? "scale(1.05)" : "";
          }
          console.log(
            `✨ Card ${index} flipped: ${targetFlipped}, transform: ${innerElement.style.transform}`
          );
        }

        // If not centered, also center it so details are readable
        if (!isCentered) {
          const cardIndex = parseInt(card.dataset.index);
          console.log(`🎯 Also centering card ${cardIndex}`);
          goToCardByIndex(cardIndex);
        }

        // Resume after 6 seconds of inactivity
        setTimeout(() => {
          if (!card.matches(":hover")) {
            isAutoRotating = true;
          }
        }, 6000);
      });
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      const rect = udemySection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isVisible) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateCard("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateCard("next");
      }
    });

    // Pause when tab not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        isAutoRotating = false;
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      } else {
        isAutoRotating = true;
        animate();
      }
    });

    // Window resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupCarousel();
      }, 150);
    });

    // Start everything
    setupCarousel();
    animate();

    console.log("✅ 3D Carousel initialized successfully!");
  }

  // ========================================
  // INITIALIZE ALL ANIMATIONS
  // ========================================
  console.log("🎨 Initializing scroll animations...");
  console.log(`♿ Reduced motion: ${prefersReducedMotion ? "ON" : "OFF"}`);
}); // End of DOMContentLoaded

// ========================================
// EASTER EGG RESET FUNCTION (For Testing)
// ========================================
// Developers can reset the Easter egg by typing in console:
// resetEasterEgg()
window.resetEasterEgg = function () {
  localStorage.removeItem("logoClickCount");
  localStorage.removeItem("confettiTriggered");
  console.log(
    "%c🔄 Easter Egg Reset! %c\nClick counter has been reset to 0.",
    "font-size: 16px; font-weight: bold; color: #22c55e;",
    "font-size: 12px; color: #888;"
  );
  console.log(
    "%cRefresh the page to see changes.",
    "font-size: 12px; color: #667eea;"
  );
  location.reload();
};
