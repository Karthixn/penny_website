/* ========================================
   PENNY — Scroll-Driven Animations
   GSAP + ScrollTrigger + Lenis
   ======================================== */

(function () {
  "use strict";

  // ── Lenis smooth scroll ──
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

  // Sync Lenis with ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ── Register plugin ──
  gsap.registerPlugin(ScrollTrigger);

  // ── Nav scroll state ──
  const nav = document.getElementById("nav");
  ScrollTrigger.create({
    start: 80,
    onUpdate: (self) => {
      nav.classList.toggle("scrolled", self.direction === 1 && self.scroll() > 80 || self.scroll() > 80);
    },
  });
  // Simple fallback
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 80);
  }, { passive: true });

  // ── Hero particles ──
  const particleContainer = document.getElementById("hero-particles");
  function spawnParticle() {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 6 + 2;
    const x = Math.random() * 100;
    const dur = Math.random() * 4 + 3;
    const delay = Math.random() * 2;
    p.style.cssText = `
      width:${size}px;height:${size}px;
      left:${x}%;bottom:-10px;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      opacity:0;
    `;
    particleContainer.appendChild(p);
    setTimeout(() => p.remove(), (dur + delay) * 1000);
  }
  // Spawn particles periodically
  setInterval(spawnParticle, 300);
  for (let i = 0; i < 15; i++) setTimeout(spawnParticle, i * 200);

  // ── Hero entrance ──
  const heroTl = gsap.timeline({ delay: 0.3 });

  heroTl.to(".hero-logo-icon", {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: "back.out(1.7)",
    from: { scale: 0.3, opacity: 0 },
  });

  document.querySelectorAll(".hero-word").forEach((word, i) => {
    heroTl.to(word, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power3.out",
    }, 0.4 + i * 0.15);
  });

  heroTl.to(".hero-sub", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
  }, 0.9);

  // ── Problem section — chaos items ──
  const chaosItems = document.querySelectorAll(".chaos-item");
  const positions = [
    { x: "8%", y: "15%" }, { x: "75%", y: "10%" },
    { x: "15%", y: "40%" }, { x: "80%", y: "35%" },
    { x: "5%", y: "65%" }, { x: "70%", y: "60%" },
    { x: "25%", y: "80%" }, { x: "85%", y: "78%" },
    { x: "40%", y: "12%" }, { x: "55%", y: "70%" },
    { x: "35%", y: "50%" }, { x: "60%", y: "25%" },
  ];

  chaosItems.forEach((item, i) => {
    const pos = positions[i % positions.length];
    item.style.left = pos.x;
    item.style.top = pos.y;

    const speed = parseFloat(item.dataset.speed) || 1;
    const rot = parseFloat(item.dataset.rot) || 0;

    gsap.fromTo(item,
      {
        opacity: 0,
        scale: 0.5,
        rotation: rot * 2,
        z: -200,
      },
      {
        opacity: 0.7,
        scale: 1,
        rotation: rot,
        z: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".problem",
          start: "top 80%",
          end: "center center",
          scrub: speed,
        },
      }
    );

    // Float animation after appearing
    gsap.to(item, {
      y: `random(-20, 20)`,
      x: `random(-15, 15)`,
      rotation: `random(${rot - 5}, ${rot + 5})`,
      duration: `random(2, 4)`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.2,
    });
  });

  // Problem text
  gsap.to(".problem-headline", {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".problem",
      start: "top 40%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.to(".problem-sub", {
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    scrollTrigger: {
      trigger: ".problem",
      start: "top 35%",
      toggleActions: "play none none reverse",
    },
  });

  // ── Solution — phone mockup ──
  gsap.from("#phone-solution", {
    y: 200,
    opacity: 0,
    scale: 0.8,
    rotation: 8,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".solution",
      start: "top 60%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(".solution-headline", {
    x: -60,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".solution",
      start: "top 50%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(".solution-sub", {
    x: -60,
    opacity: 0,
    duration: 0.8,
    delay: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".solution",
      start: "top 50%",
      toggleActions: "play none none reverse",
    },
  });

  // Expense items slide in
  document.querySelectorAll(".expense-item").forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".solution",
        start: "top 40%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ── Features — staggered cards ──
  document.querySelectorAll(".feature-card").forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ── Pro features ──
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
    y: 40,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".pro",
      start: "top 55%",
      toggleActions: "play none none reverse",
    },
  });

  document.querySelectorAll(".pro-feature").forEach((feat, i) => {
    gsap.to(feat, {
      opacity: 1,
      y: 0,
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

  // Pro glow pulse
  gsap.to(".pro-glow", {
    scale: 1.2,
    opacity: 0.6,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // ── Download section ──
  gsap.from("#phone-download", {
    y: 100,
    rotation: -5,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".download",
      start: "top 60%",
      toggleActions: "play none none reverse",
    },
  });

  // Phone float
  gsap.to("#phone-download", {
    y: -15,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.from(".download-title", {
    x: 60,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".download",
      start: "top 55%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(".download-sub", {
    x: 60,
    opacity: 0,
    duration: 0.8,
    delay: 0.1,
    scrollTrigger: {
      trigger: ".download",
      start: "top 50%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(".download-btn", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: 0.3,
    scrollTrigger: {
      trigger: ".download",
      start: "top 45%",
      toggleActions: "play none none reverse",
    },
  });

  // ── Parallax depth on mouse for hero ──
  const hero = document.querySelector(".hero");
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(".hero-logo-icon", {
      rotateY: x * 20,
      rotateX: -y * 20,
      duration: 0.6,
      ease: "power2.out",
    });
  });

  // ── Smooth anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) lenis.scrollTo(target, { offset: -64 });
    });
  });
})();
