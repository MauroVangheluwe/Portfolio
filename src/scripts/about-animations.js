import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

// About image stack animations
const mm = gsap.matchMedia();

mm.add("(max-width: 39.9375rem)", () => {
  // Mobile - smallest screens
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-image-stack",
      start: "top 30%",
      end: "bottom 50%",
      scrub: true,
      markers: false,
    }
  });

  tl.to(".img-left", {
    y: -60,
    x: -150,
    rotation: -20,
    ease: "power1.out",
  }, 0);

  tl.to(".img-right", {
    y: -60,
    x: 150,
    rotation: 20,
    ease: "power1.out",
  }, 0);

  tl.to(".img-middle", {
    y: -60,
    ease: "power1.out",
  }, 0);
});

mm.add("(min-width: 40rem) and (max-width: 47.9375rem)", () => {
  // Tablet - medium screens
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-image-stack",
      start: "top 30%",
      end: "bottom 50%",
      scrub: true,
      markers: false,
    }
  });

  tl.to(".img-left", {
    y: -80,
    x: -200,
    rotation: -20,
    ease: "power1.out",
  }, 0);

  tl.to(".img-right", {
    y: -80,
    x: 200,
    rotation: 20,
    ease: "power1.out",
  }, 0);

  tl.to(".img-middle", {
    y: -80,
    ease: "power1.out",
  }, 0);
});

mm.add("(min-width: 48rem)", () => {
  // Desktop - largest screens
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-image-stack",
      start: "top 70%",
      end: "bottom 50%",
      scrub: true,
      markers: false,
    }
  });

  tl.to(".img-left", {
    y: -150,
    x: -300,
    rotation: -20,
    ease: "power1.out",
  }, 0);

  tl.to(".img-right", {
    y: -150,
    x: 300,
    rotation: 20,
    ease: "power1.out",
  }, 0);

  tl.to(".img-middle", {
    y: -150,
    ease: "power1.out",
  }, 0);
});

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
    duration: 0.03,
    stagger: 0.05, 

    scrollTrigger: {
      trigger: ".about-description",
      start: "top 60%",   
      end: "bottom 40%",   
      // *** FINAL FIX: Change scrub: true to scrub: 1 ***
      scrub: 1.5, 
      markers: false,
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
        markers: false,
      },
    }
  );
}