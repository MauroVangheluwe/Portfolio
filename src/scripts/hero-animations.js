import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Fallback: Remove loading state after 3 seconds if animations fail
setTimeout(() => {
  if (document.body.classList.contains('loading')) {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    const overlay = document.getElementById("loading-overlay");
    if (overlay) overlay.remove();
  }
}, 3000);

window.addEventListener("load", () => {
  // Check if animation should be skipped (set by index.astro when back navigation detected)
  const skipEntrance = sessionStorage.getItem('skipHomeAnimation') === 'true';
  
  const vh = window.innerHeight;

  const firstEl = document.querySelector(".first-word");
  let startY = -vh * 0.4;
  if (firstEl) {
    const r = firstEl.getBoundingClientRect();
    const elCenter = r.top + r.height / 2;
    const viewportCenter = vh / 2;
    startY = viewportCenter - elCenter;
  }

  // Determine current font-size for first-word to grow towards
  const computedSize = firstEl
    ? window.getComputedStyle(firstEl).fontSize
    : "35rem";

  // Remove loading overlay to show animation
  const overlay = document.getElementById("loading-overlay");
  if (overlay) overlay.style.opacity = "0";
  
  if (skipEntrance) {
    // Skip animation, show everything immediately
    gsap.set(".first-word.animated", { y: 0, opacity: 1 });
    gsap.set(".skills-marquee", { y: 0, opacity: 1 });
    gsap.set(".hero-top-title", { opacity: 1 });
    gsap.set(".second-word.animated", { y: 0, opacity: 1 });
    gsap.set(".heroimages", { y: 0, opacity: 1 });
    gsap.set(".heroimage", { y: 0, opacity: 1 });
    gsap.set(".work-title", { opacity: 0 });
    gsap.set(".work-subtitle", { opacity: 0 });
    
    document.body.classList.add("entrance-done");
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
    if (overlay) overlay.remove();
    return; // Exit early, skip timeline
  }
  
  gsap.set(".first-word.animated", { y: startY, opacity: 0, fontSize: "0rem", scale: 1 });
  gsap.set(".skills-marquee", { y: -140, opacity: 0 });
  gsap.set(".hero-top-title", { opacity: 0 });
  gsap.set(".second-word.animated", { y: 160, opacity: 0 });
  gsap.set(".heroimages", { y: 180, opacity: 0 });
  gsap.set(".heroimage", { y: 45, opacity: 0 });
  gsap.set(".work-title", { opacity: 0 });
  gsap.set(".work-subtitle", { opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(".first-word.animated", { fontSize: computedSize, opacity: 1, duration: 1, ease: "bounce.out" })
    .to(".first-word.animated", { y: 0, duration: 0.5, ease: "bounce.out" })
    .to(".skills-marquee", { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }, "-=0.4")
    .to(".second-word.animated", { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
    .to(".hero-top-title", { opacity: 1, duration: 0.5 }, "-=0.5")
    .to(".heroimages", { y: 0, opacity: 1, duration: 0.8 }, "-=0.8")
    .to(
      ".heroimage",
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, overwrite: false },
      "-=0.45"
    )
    // Mark entrance complete so mouse-follow transforms can begin
    .eventCallback("onComplete", () => {
      document.body.classList.add("entrance-done");
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");
      // Remove overlay from DOM
      const overlay = document.getElementById("loading-overlay");
      if (overlay) overlay.remove();
    });
});

// Setup ScrollTrigger animations outside load event
gsap.registerPlugin(ScrollTrigger);

function setupScrollTriggers() {
  // Kill existing triggers to avoid duplicates
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.trigger === ".work-title" || trigger.vars.trigger === ".work-subtitle") {
      trigger.kill();
    }
  });

  gsap.to(".work-title", {
    opacity: 1,
    y: 0,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".work-title",
      start: "bottom 60%",
      end: "bottom 30%",
      scrub: true,
    }
  });

  gsap.to(".work-subtitle", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    delay: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".work-subtitle",
      start: "bottom 60%",
      end: "bottom 30%",
      scrub: true,
      markers: false,
    }
  });
}

// Run on initial load
window.addEventListener("load", setupScrollTriggers);

// Run on pageshow (handles bfcache restoration)
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // Page was restored from bfcache
    setupScrollTriggers();
  }
});