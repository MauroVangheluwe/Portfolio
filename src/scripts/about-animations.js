import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-image-stack",
    start: "top 80%",   // when top of stack hits 80% of viewport
    end: "bottom 20%",  // when bottom of stack hits 20%
    scrub: true,        // smooth animation tied to scroll
  }
});

// Animate left image
tl.to(".img-left", {
  y: -150,           // move up
  x: -300,           // move further left
  rotation: -20,     // rotate more
  ease: "power1.out"
}, 0); // start at time 0

// Animate right image
tl.to(".img-right", {
  y: -150,           // move up
  x: 300,            // move further right
  rotation: 20,      // rotate more
  ease: "power1.out"
}, 0);

// Animate middle image
tl.to(".img-middle", {
  y: -150,           // move up
  ease: "power1.out"
}, 0);


document.fonts.ready.then(() => {
  // 1. Split the text into words
  const split = new SplitText(".about-description", {
    type: "words",
    aria: "hidden",
  });

  // 2. Animate each word directly using gsap.from()
  gsap.from(split.words, {
    opacity: 0,
    y: 15,
    ease: "power3.out",
    
    // Maintain tiny duration and stagger to keep time duration near zero
    duration: 0.01,
    stagger: 0.01, 

    scrollTrigger: {
      trigger: ".about-description",
      start: "top 60%",   
      end: "bottom top",   
      // *** FINAL FIX: Change scrub: true to scrub: 1 ***
      scrub: 1, 
      // Add markers: true to definitively see your start/end points
      // markers: true,
    },
  });
});


// Signature fill reveal animation using mask
const signatureMaskPath = document.querySelector(".signature-mask-path");
if (signatureMaskPath) {
  const pathLength = signatureMaskPath.getTotalLength();
  
  // Animate to reveal full signature smoothly
  gsap.fromTo(".signature-mask-path", 
    {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    },
    {
      strokeDashoffset: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".signature",
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
        markers: true,
      },
    }
  );
}