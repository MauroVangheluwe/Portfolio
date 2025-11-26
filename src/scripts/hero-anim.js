/* import { gsap } from "gsap";

window.addEventListener("load", () => {
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

  // Explicit initial states: start at viewport center with 0rem font-size
  gsap.set(".first-word", { y: startY, opacity: 0, fontSize: "0rem", scale: 1 });
  gsap.set(".skills-marquee", { y: -140, opacity: 0 });
  gsap.set(".hero-top-title", { opacity: 0 });
  gsap.set(".second-word", { y: 160, opacity: 0 });
  gsap.set(".heroimages", { y: 180, opacity: 0 });
  gsap.set(".heroimage", { y: 45, opacity: 0 });
  gsap.set(".work-title", { opacity: 0 });
  gsap.set(".work-subtitle", { opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(".first-word", { fontSize: computedSize, opacity: 1, duration: 1, ease: "bounce.out" })
    .to(".first-word", { y: 0, duration: 0.5, ease: "bounce.out" })
    .to(".skills-marquee", { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }, "-=0.35")
    .to(".second-word", { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.25")
    .to(".hero-top-title", { opacity: 1, duration: 0.5 }, "-=0.4")
    .to(".heroimages", { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
    .to(
      ".heroimage",
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, overwrite: false },
      "-=0.45"
    )
    .to(".work-title", { opacity: 1, duration: 0.3 }, "-=0.2")
    .to(".work-subtitle", { opacity: 1, duration: 0.3 }, "-=0.4")
    // Mark entrance complete so mouse-follow transforms can begin
    .eventCallback("onComplete", () => {
      document.body.classList.add("entrance-done");
    });
}); */