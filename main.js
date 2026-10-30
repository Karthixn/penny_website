/* ==========================================================================
   PENNY — Modern Scroll-Driven & Interactive Landing Page
   GSAP + ScrollTrigger + Lenis
   ========================================================================== */

(function () {
  "use strict";

  // ── 1. Lenis Smooth Scrolling ──
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ── 2. Navigation Blur & Mobile Menu ──
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("nav-mobile-menu");

  ScrollTrigger.create({
    start: 50,
    onUpdate: (self) => {
      nav.classList.toggle("scrolled", self.scroll() > 50);
    },
  });

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }

  // ── 3. Ambient Floating Particles in Hero ──
  const particleContainer = document.getElementById("hero-particles");
  function spawnParticle() {
    if (!particleContainer) return;
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 5 + 3;
    const x = Math.random() * 100;
    const dur = Math.random() * 4 + 4;
    const delay = Math.random() * 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      bottom: -10px;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;
    particleContainer.appendChild(p);
    setTimeout(() => p.remove(), (dur + delay) * 1000);
  }

  setInterval(spawnParticle, 350);
  for (let i = 0; i < 12; i++) {
    setTimeout(spawnParticle, i * 200);
  }

  // ── 4. Hero Entrance Animations ──
  const heroTl = gsap.timeline({ delay: 0.2 });

  // Pill badge bounce in
  heroTl.fromTo("#hero-pill", 
    { scale: 0.8, opacity: 0, y: -20 },
    { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.8)" }
  );

  // Words stagger ("Track. Split. Save.")
  document.querySelectorAll(".hero-word").forEach((word, i) => {
    heroTl.to(word, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "power3.out",
    }, 0.35 + i * 0.14);
  });

  // Subtitle & actions
  heroTl.to(".hero-sub", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
  }, 0.8);

  heroTl.to(".hero-actions", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
  }, 0.95);

  // Phone Mockup Rise with 3D Depth
  heroTl.fromTo("#hero-phone",
    { y: 140, opacity: 0, scale: 0.85, rotateX: 12 },
    { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1.2, ease: "power3.out" },
    0.7
  );

  // Floating Badges Elastic Pop
  heroTl.fromTo(["#chip-left", "#chip-right"],
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.7, stagger: 0.2, ease: "back.out(2)" },
    1.1
  );

  // Interactive 3D Cursor Tilt on Hero Phone
  const heroSection = document.getElementById("hero");
  const heroPhone = document.getElementById("hero-phone");
  if (heroSection && heroPhone) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(heroPhone, {
        rotateY: x * 16,
        rotateX: -y * 14,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5,
      });
    });

    heroSection.addEventListener("mouseleave", () => {
      gsap.to(heroPhone, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }

  // ── 5. Problem Section — Floating Chaos Tags ──
  const chaosItems = document.querySelectorAll(".chaos-item");
  const chaosCoords = [
    { x: "6%", y: "12%" },  { x: "74%", y: "14%" },
    { x: "12%", y: "38%" }, { x: "82%", y: "36%" },
    { x: "4%", y: "66%" },  { x: "70%", y: "62%" },
    { x: "20%", y: "82%" }, { x: "78%", y: "82%" },
    { x: "38%", y: "10%" }, { x: "56%", y: "76%" },
    { x: "32%", y: "52%" }, { x: "64%", y: "24%" },
  ];

  chaosItems.forEach((item, i) => {
    const coord = chaosCoords[i % chaosCoords.length];
    item.style.left = coord.x;
    item.style.top = coord.y;

    const speed = parseFloat(item.dataset.speed) || 1;
    const rot = parseFloat(item.dataset.rot) || 0;

    gsap.fromTo(item,
      {
        opacity: 0,
        scale: 0.5,
        rotation: rot * 1.5,
        z: -150,
      },
      {
        opacity: 0.85,
        scale: 1,
        rotation: rot,
        z: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".problem",
          start: "top 75%",
          end: "center center",
          scrub: speed,
        },
      }
    );

    // Subtle continuous floating
    gsap.to(item, {
      y: "random(-16, 16)",
      x: "random(-10, 10)",
      rotation: `random(${rot - 4}, ${rot + 4})`,
      duration: "random(2.5, 4.5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.15,
    });
  });

  // Problem headline reveal
  gsap.from(".problem-headline", {
    opacity: 0,
    y: 40,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".problem",
      start: "top 45%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(".problem-sub", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.15,
    scrollTrigger: {
      trigger: ".problem",
      start: "top 45%",
      toggleActions: "play none none reverse",
    },
  });

  // ── 6. Solution Section Animations ──
  gsap.from("#phone-solution", {
    y: 120,
    opacity: 0,
    scale: 0.88,
    rotation: -4,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".solution",
      start: "top 65%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(".solution-list-item", {
    opacity: 0,
    x: -30,
    stagger: 0.15,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".solution-list",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // ── 7. Interactive Feature Showcase Data & Tab Switcher ──
  const showcaseData = {
    home: {
      badge: "Feature 01",
      title: "Clean Daily Dashboard",
      desc: "See your total balance, monthly budget progress, and recent transactions at a glance without cluttered menus.",
      img: "public/images/screen_home.png",
      highlights: ["Real-time spend meter", "Category breakdown", "Quick 1-tap add"]
    },
    add: {
      badge: "Feature 02",
      title: "Lightning Fast Logging",
      desc: "Add expenses in under two seconds with smart auto-categorization, custom tags, and instant notes.",
      img: "public/images/screen_add_expense.png",
      highlights: ["Quick tags", "Dynamic keypad", "Auto-category detection"]
    },
    groups: {
      badge: "Feature 03",
      title: "Effortless Group Splits",
      desc: "Create trip or roommate groups, divide bills evenly or by exact share, and settle up without awkward discussions.",
      img: "public/images/screen_groups.png",
      highlights: ["Equal & custom splits", "Multi-person tracking", "1-tap settlement"]
    },
    insights: {
      badge: "Feature 04",
      title: "Deep Visual Analytics",
      desc: "Gain clarity on where your money actually goes with beautiful category charts, monthly comparisons, and trends.",
      img: "public/images/screen_insights.png",
      highlights: ["Monthly trends", "Visual category donuts", "Top spending alerts"]
    },
    reminders: {
      badge: "Feature 05",
      title: "Proactive Bill Reminders",
      desc: "Stay ahead of EMI dues, subscription renewals, and friend settlements before late fees accumulate.",
      img: "public/images/screen_reminders.png",
      highlights: ["Due date notifications", "Subscription tracker", "Zero missed payments"]
    }
  };

  const showcaseTabs = document.querySelectorAll(".showcase-tab");
  const showcaseBadge = document.getElementById("showcase-badge");
  const showcaseTitle = document.getElementById("showcase-title");
  const showcaseDesc = document.getElementById("showcase-desc");
  const showcaseHighlights = document.getElementById("showcase-highlights");
  const showcaseImg = document.getElementById("showcase-img");

  showcaseTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const screenKey = tab.dataset.screen;
      const data = showcaseData[screenKey];
      if (!data) return;

      // Update active tab styling
      showcaseTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Smooth transition for details card
      gsap.to("#showcase-card", {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
          showcaseBadge.textContent = data.badge;
          showcaseTitle.textContent = data.title;
          showcaseDesc.textContent = data.desc;

          showcaseHighlights.innerHTML = data.highlights
            .map((h) => `<div class="highlight-chip">${h}</div>`)
            .join("");

          gsap.to("#showcase-card", {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          });
        },
      });

      // Smooth transition for Phone screenshot
      gsap.to(showcaseImg, {
        opacity: 0.2,
        scale: 0.96,
        duration: 0.2,
        onComplete: () => {
          showcaseImg.src = data.img;
          gsap.to(showcaseImg, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
          });
        },
      });
    });
  });

  // ── 8. Interactive Split Calculator Sandbox ──
  const scenarioButtons = document.querySelectorAll(".scenario-btn");
  const demoTotal = document.getElementById("demo-total");
  const demoPeople = document.getElementById("demo-people");
  const demoEach = document.getElementById("demo-each");
  const demoSummary = document.getElementById("demo-summary");

  scenarioButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      scenarioButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const amt = parseInt(btn.dataset.amt, 10);
      const people = parseInt(btn.dataset.people, 10);
      const cat = btn.dataset.cat;
      const each = Math.round(amt / people);

      // Animate text changes
      gsap.fromTo([demoTotal, demoPeople, demoEach],
        { scale: 1.1, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      demoTotal.textContent = `₹${amt.toLocaleString("en-IN")}`;
      demoPeople.textContent = `${people} friends`;
      demoEach.textContent = `₹${each.toLocaleString("en-IN")}`;
      demoSummary.textContent = `${cat}: Each friend pays ₹${each.toLocaleString("en-IN")} • Settle instantly with 1 tap`;
    });
  });

  // ── 9. Core Features Grid Animation ──
  document.querySelectorAll(".feature-card").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.65,
      delay: (i % 2) * 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ── 10. Penny Pro Section Reveal ──
  gsap.from(".pro-badge", {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(2)",
    scrollTrigger: {
      trigger: ".pro",
      start: "top 60%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(".pro-title", {
    y: 35,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".pro",
      start: "top 55%",
      toggleActions: "play none none reverse",
    },
  });

  document.querySelectorAll(".pro-feature").forEach((feat, i) => {
    gsap.from(feat, {
      opacity: 0,
      x: -40,
      duration: 0.6,
      delay: i * 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".pro-features",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ── 11. Download / Play Store Coming Soon Section ──
  gsap.from("#phone-download", {
    y: 90,
    rotation: -4,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".download",
      start: "top 65%",
      toggleActions: "play none none reverse",
    },
  });

  // Floating bounce on download phone
  gsap.to("#phone-download", {
    y: -14,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.from(".download-title", {
    x: 40,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".download",
      start: "top 60%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(".playstore-coming-soon-badge", {
    y: 25,
    opacity: 0,
    duration: 0.6,
    delay: 0.2,
    scrollTrigger: {
      trigger: ".download",
      start: "top 55%",
      toggleActions: "play none none reverse",
    },
  });

  // Waitlist Form Submission Handling
  const waitlistForm = document.getElementById("waitlist-form");
  const waitlistInput = document.getElementById("waitlist-email");
  const waitlistMsg = document.getElementById("waitlist-msg");
  const waitlistBtn = document.getElementById("waitlist-btn");

  // Check if previously subscribed
  const savedEmail = localStorage.getItem("penny_waitlist_email");
  if (savedEmail && waitlistMsg) {
    waitlistMsg.style.display = "block";
    waitlistMsg.textContent = `✓ You're already registered (${savedEmail}) for Google Play launch notifications!`;
    if (waitlistInput) waitlistInput.value = savedEmail;
  }

  if (waitlistForm && waitlistInput && waitlistMsg) {
    waitlistForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = waitlistInput.value.trim();
      if (!email) return;

      const originalBtnHtml = waitlistBtn.innerHTML;
      waitlistBtn.innerHTML = `<span>Saving...</span>`;
      waitlistBtn.disabled = true;

      // Save locally immediately
      localStorage.setItem("penny_waitlist_email", email);

      // Attempt to save to backend if server endpoint exists
      try {
        await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      } catch (err) {
        // Fallback gracefully on static hosts like GitHub Pages
      }

      // UI Feedback
      waitlistBtn.innerHTML = `<span>Saved!</span>`;
      waitlistBtn.style.background = "#10B981";
      waitlistBtn.disabled = false;

      gsap.fromTo(waitlistMsg,
        { opacity: 0, y: -10, display: "block" },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );

      waitlistMsg.innerHTML = `✓ <strong>${email}</strong> has been added! We'll email you the moment Penny launches on the Google Play Store.`;
    });
  }

  // ── 12. Smooth Anchor Navigation via Lenis ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;
      e.preventDefault();
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        lenis.scrollTo(targetElem, { offset: -70 });
      }
    });
  });

  // Also hook the hero pill badge to scroll down to #download
  const heroPill = document.getElementById("hero-pill");
  if (heroPill) {
    heroPill.addEventListener("click", () => {
      const downloadSec = document.querySelector("#download");
      if (downloadSec) lenis.scrollTo(downloadSec, { offset: -70 });
    });
  }

})();
