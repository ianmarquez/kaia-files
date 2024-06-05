gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Observer)

Observer.create({
  target: window,
  type: "wheel",
  onChangeY: (self) => {
    document.documentElement.scrollLeft += self.deltaY;
  }
});

window.onload = function() {
  // Swiper Implementation

  // End Swiper Implementation

  const backgroundTimeline = (trigger, markers) => {
    return gsap.timeline({
      scrollTrigger: {
        trigger,
        scrub: 1,
        start: "left",
        end: "right",
        ...(!!markers ? { markers: true } : {}),
        horizontal: true,
      }
    })
  }

  // Begin About Section Animations 
  const [top, baseline, bottom] = gsap.utils.toArray('.outline-container')
  const outlineTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro",
      scrub: 1,
      start: "right center",
      end: "+=900",
      horizontal: true,
    }
  })
  outlineTimeline.to(bottom, {
    y: "-20rem",
    ease: "none",
  }).to(top, {
    y: "20rem",
    ease: "none"
  }, "<").to(bottom, {
    opacity: 0,
    ease: "none",
  }).to(top, {
    opacity: 0,
    ease: "none"
  }, "<")

  const stagger = 1;
  const wordTimeline = gsap.timeline({
    repeat: -1,
  });

  wordTimeline.from('.word-rotation-list li', {
    y: 120,
    opacity: 0,
    stagger: stagger
  })

  wordTimeline.to('.word-rotation-list li', {
    y: -120,
    opacity: 0,
    stagger: stagger
  }, stagger)
  // End About Section Animation

  // Start Build Section Animation
  const buildSectionTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".build",
      scrub: 1,
      start: "left center",
      end: "center center",
      horizontal: true,
    }
  })

  buildSectionTimeline
    .from(".build-left-component", { opacity: 0 })
    .from(".build-pills.one", { y: "-60rem", opacity: 0, ease: "bounce.out" })
    .from(".build-circle", { y: "-50rem", opacity: 0, ease: "bounce.out" }, "<")
    .from(".build-pills.pill-two", { y: "-40rem", opacity: 0, ease: "bounce.out" }, "<")
    .from(".build-small-pointed-circle", { y: "-30rem", opacity: 0, ease: "bounce.out" }, "<")
    .from(".semi-circle-container", { y: "-20rem", opacity: 0, ease: "bounce.out" }, "<")

  // End Build Section

  // Begin Vision Animation
  const visionBlocks = gsap.utils.toArray(".vision-block")
  visionBlocks.map((visionBlock, idx) => {
    backgroundTimeline(".vision").fromTo(visionBlock, {
      x: `-${idx + 5}rem`,
    }, {
      x: `${idx + 5}rem`,
    })
  })
  backgroundTimeline(".vision")
    .fromTo(".vision-background", { x: "-25rem" }, { x: "25rem" })
  // End Vision Animation


  // Begin Hangout Animation
  backgroundTimeline(".hangout").fromTo(".hangout-outline-background", { x: "-10rem", x: "10rem" }, { x: 0, y: 0 })
  // End Hangout Animation

  // Begin FAQ Animation

  // End FAQ Animation

  // Begin Footer Animation
  const footerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      scrub: 1,
      start: "left center",
      end: "center center",
      horizontal: true,
    }
  })
  const footerButtons = gsap.utils.toArray(".button.minimal.small.w-button")
  const footerIcons = gsap.utils.toArray(".footer-icon-characters")
  const footerFootnote = gsap.utils.toArray(".footer-link")

  footerTimeline
    .from(footerButtons[0], { opacity: 0, x: "-5rem" })
    .from(footerButtons[1], { opacity: 0, x: "-5rem" })
    .from(footerButtons[2], { opacity: 0, x: "-5rem" })
    .from(footerButtons[3], { opacity: 0, x: "-5rem" })
    .from(footerIcons[0], { opacity: 0, scale: 0.5 })
    .from(footerIcons[1], { opacity: 0, scale: 0.5 })
    .from(footerIcons[2], { opacity: 0, scale: 0.5 })
    .from(footerIcons[3], { opacity: 0, scale: 0.5 })
    .from(footerFootnote[0], { opacity: 0, x: "-5rem" })
    .from(footerFootnote[1], { opacity: 0, x: "-5rem" })


  // End Footer Animation
}

