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


  const visionBlocks = gsap.utils.toArray(".vision-block")
  visionBlocks.map((visionBlock, idx) => {
    backgroundTimeline(".vision").fromTo(visionBlock, {
      x: `-${idx + 5}rem`,
    }, {
      x: `${idx + 5}rem`,
    })
  })

  // Begin Vision Animation
  backgroundTimeline(".vision")
    .fromTo(".vision-background", { x: "-25rem" }, { x: "25rem" })
  // End Vision Animation


  // Begin Hangout Animation
  backgroundTimeline(".hangout").fromTo(".hangout-outline-background", { x: "-10rem", x: "10rem" }, { x: 0, y: 0 })
  // End Hangout Animation

  // Begin Footer Animation
  const footerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      scrub: 1,
      start: "left",
      end: "right center",
      horizontal: true,
    }
  })
  // End Footer Animation

  // Vision highlight category and change text while scrolling
  // const categoriesAll = Array.from(document.querySelectorAll(".vision-category"));
  // const headersAll = Array.from(document.querySelectorAll(".vision-text"));
  //
  // const categories = categoriesAll.slice(3);
  // const headers = headersAll.slice(1);
  //
  //
  // function makeItemActive(idx) {
  //   categories.forEach(category => {
  //     category.classList.remove("vision-category-active");
  //   });
  //   categories[idx]?.classList.add("vision-category-active");
  //
  //
  //   headers.forEach(header => {
  //     header.classList.remove("vision-text-active");
  //   });
  //   headers[idx]?.classList.add("vision-text-active");
  //
  // };
  //
  // makeItemActive(0);

}

