import { gsap } from "gsap";

window.addEventListener("load", () => {
  const vh = window.innerHeight;

  // Compute precise offset to start .first-word at viewport center
  const firstEl = document.querySelector(".first-word");
  let startY = -vh * 0.4;
  if (firstEl) {
    const r = firstEl.getBoundingClientRect();
    const elCenter = r.top + r.height / 2;
    const viewportCenter = vh / 2;
    // delta from current position to viewport center
    startY = viewportCenter - elCenter;
  }

  // Determine current font-size for first-word to grow towards
  const computedSize = firstEl
    ? window.getComputedStyle(firstEl).fontSize
    : "35rem";

  // Explicit initial states: start at viewport center with 0rem font-size
  gsap.set(".first-word", { y: startY, opacity: 0, fontSize: "0rem", scale: 1 });
  gsap.set(".skills-marquee", { y: -140, opacity: 0 });
  gsap.set(".second-word", { y: 160, opacity: 0 });
  gsap.set(".heroimages", { y: 180, opacity: 0 });
  gsap.set(".heroimage", { y: 45, opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // First-word: grow to its final font-size at center, then slide into place
  tl.to(".first-word", { fontSize: computedSize, opacity: 1, duration: 0.7, ease: "power2.out" })
    .to(".first-word", { y: 0, duration: 0.5, ease: "power3.out" })
    // Topscroll: slide in from top
    .to(".skills-marquee", { y: 0, opacity: 1, duration: 0.85 }, "-=0.35")
    // Second word: rise from below
    .to(".second-word", { y: 0, opacity: 1, duration: 0.9 }, "-=0.25")
    // Hero images container: rise, then items stagger (preserve rotate/stacking)
    .to(".heroimages", { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
    .to(
      ".heroimage",
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, overwrite: false },
      "-=0.45"
    )
    // Mark entrance complete so mouse-follow transforms can begin
    .eventCallback("onComplete", () => {
      document.body.classList.add("entrance-done");
    });
});