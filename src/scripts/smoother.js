import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

export function setupSmoother() {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // Detect mobile devices
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: isMobile ? 0.8 : 1.5,
    effects: true,
    normalizeScroll: true,
    ignoreMobileResize: true,
  });
}
