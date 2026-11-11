/* ==========================================================================
   PENNY — Interactive Frontend Scripts
   GSAP + ScrollTrigger + Lenis Smooth Scroll + Walkthrough Controller
   ========================================================================== */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // 1. Lenis Smooth Scrolling Setup
  // ---------------------------------------------------------------------------
  let lenis = null;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof Lenis !== "undefined" && !prefersReducedMotion) {
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      if (typeof ScrollTrigger !== "undefined" && typeof gsap !== "undefined") {
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      }
    } catch (e) {
      console.warn("Lenis init skipped:", e);
    }
  }

  // Register GSAP plugins safely
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ---------------------------------------------------------------------------
  // 2. Navigation & Mobile Drawer
  // ---------------------------------------------------------------------------
  const header = document.getElementById("header");
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");

  // Sticky header class toggle
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile drawer when clicking any link
    mobileDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -headerOffset });
        } else {
          window.scrollTo({
            top: targetPos,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Hero 3D Smartphone Mouse Tilt
  // ---------------------------------------------------------------------------
  const stage = document.getElementById("hero-mockup-stage");
  const phoneWrap = document.getElementById("hero-phone-wrap");

  if (stage && phoneWrap && window.innerWidth > 1024 && !prefersReducedMotion) {
    stage.addEventListener("mousemove", (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      if (typeof gsap !== "undefined") {
        gsap.to(phoneWrap, {
          rotateY: x * 18,
          rotateX: -y * 18,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });

    stage.addEventListener("mouseleave", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(phoneWrap, {
          rotateY: -8,
          rotateX: 6,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 4. Problem Chaos Tags Float
  // ---------------------------------------------------------------------------
  const chaosCloud = document.getElementById("problem-chaos-cloud");
  if (chaosCloud) {
    const tags = chaosCloud.querySelectorAll(".chaos-tag");
    const tagCoords = [
      { top: "15%", left: "8%" },
      { top: "12%", right: "10%" },
      { top: "38%", left: "12%" },
      { top: "35%", right: "8%" },
      { top: "68%", left: "6%" },
      { top: "65%", right: "12%" },
      { top: "85%", left: "20%" },
      { top: "82%", right: "18%" },
    ];

    tags.forEach((tag, i) => {
      const coord = tagCoords[i % tagCoords.length];
      if (coord.left) tag.style.left = coord.left;
      if (coord.right) tag.style.right = coord.right;
      if (coord.top) tag.style.top = coord.top;

      const rot = parseFloat(tag.dataset.rot) || 0;
      tag.style.transform = `rotate(${rot}deg)`;

      if (typeof gsap !== "undefined" && !prefersReducedMotion) {
        gsap.to(tag, {
          y: "random(-15, 15)",
          x: "random(-10, 10)",
          rotation: rot + Math.random() * 6 - 3,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.25,
        });
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 5. Interactive Application Screenshot Walkthrough
  // ---------------------------------------------------------------------------
  const walkthroughData = {
    home: {
      src: "public/images/screen_home.png",
      tag: "DASHBOARD",
      title: "Personal Dashboard & Monthly Balance",
      desc: "Unified dark interface showing monthly spend, budget ring, recent activity, and quick shortcuts."
    },
    add: {
      src: "public/images/screen_add_typed.png",
      tag: "QUICK ADD",
      title: "Instant Keypad & Category Tagging",
      desc: "Fast custom numeric keypad with category chips and instant Personal vs. Group split toggle."
    },
    group: {
      src: "public/images/screen_group_expenses.png",
      tag: "GROUP BILLS",
      title: "Shared Ledger & Member Balances",
      desc: "Transparent list of shared expenses, who paid, and who owes what with zero rounding error."
    },
    insights: {
      src: "public/images/screen_insights_shopping.png",
      tag: "INSIGHTS",
      title: "Visual Category Analytics",
      desc: "Interactive distribution charts and category breakdowns to monitor where your money goes."
    },
    settle: {
      src: "public/images/screen_settle.png",
      tag: "SETTLE UP",
      title: "1-Tap UPI Settlement & Statements",
      desc: "Launch Google Pay or PhonePe directly with pre-filled VPA or export statements to CSV & PDF."
    },
    settings: {
      src: "public/images/screen_settings.png",
      tag: "SECURITY",
      title: "Hardware Keystore & Account Controls",
      desc: "Configure biometric lock, customize UPI VPA, and access permanent data erasure anytime."
    }
  };

  const wtTabs = document.querySelectorAll(".wt-tab");
  const wtScreenImg = document.getElementById("wt-screen-img");
  const wtCaptionTag = document.getElementById("wt-caption-tag");
  const wtCaptionTitle = document.getElementById("wt-caption-title");
  const wtCaptionDesc = document.getElementById("wt-caption-desc");

  wtTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const screenKey = tab.dataset.screen;
      const data = walkthroughData[screenKey];
      if (!data) return;

      // Update active state
      wtTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      // Animate image swap
      if (wtScreenImg) {
        wtScreenImg.style.opacity = "0";
        setTimeout(() => {
          wtScreenImg.src = data.src;
          wtScreenImg.alt = data.title;
          wtScreenImg.style.opacity = "1";
        }, 150);
      }

      // Update caption texts
      if (wtCaptionTag) wtCaptionTag.textContent = data.tag;
      if (wtCaptionTitle) wtCaptionTitle.textContent = data.title;
      if (wtCaptionDesc) wtCaptionDesc.textContent = data.desc;
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Comprehensive FAQ Accordion Controller
  // ---------------------------------------------------------------------------
  const faqItems = document.querySelectorAll(".faq-accordion-item");

  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question-btn");
    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close other accordions
      faqItems.forEach((other) => {
        other.classList.remove("active");
        const otherBtn = other.querySelector(".faq-question-btn");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });

      // Toggle current accordion
      if (!isActive) {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 7. GSAP ScrollTrigger Section Animations
  // ---------------------------------------------------------------------------
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined" && !prefersReducedMotion) {
    // Hero Entrance
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" })
          .from(".hero-headline", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" }, "-=0.3")
          .from(".hero-description", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "-=0.4")
          .from(".hero-cta-group", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "-=0.4")
          .from(".hero-trust-row", { opacity: 0, duration: 0.6 }, "-=0.2")
          .from("#hero-phone-wrap", { opacity: 0, scale: 0.9, y: 50, duration: 1, ease: "power3.out" }, "-=0.8")
          .from(".floating-glass-pill", { opacity: 0, scale: 0.7, stagger: 0.15, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4");

    // Metric items
    gsap.utils.toArray(".metric-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Step cards
    gsap.utils.toArray(".step-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: i * 0.12,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Feature Showcase Rows
    gsap.utils.toArray(".showcase-row").forEach((row) => {
      const content = row.querySelector(".showcase-content");
      const mockup = row.querySelector(".showcase-mockup");

      gsap.from(content, {
        opacity: 0,
        x: row.classList.contains("reverse") ? 40 : -40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(mockup, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Debt Simplification Box
    gsap.from(".simplification-box", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".simplification-box",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Pricing Cards
    gsap.utils.toArray(".pricing-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Security Bento Cards
    gsap.utils.toArray(".bento-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 25,
        duration: 0.6,
        delay: i * 0.08,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Download Card Glow
    gsap.from(".download-card", {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".download-card",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }
})();
