gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

Observer.create({
  target: window,
  type: "wheel",
  onChangeY: (self) => {
    document.documentElement.scrollLeft += self.deltaY;
  },
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
      },
    });
  };

  // Begin About Section Animations
  const [top, baseline, bottom] = gsap.utils.toArray(".outline-container");
  const outlineTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro",
      scrub: 1,
      start: "right center",
      end: "+=900",
      horizontal: true,
    },
  });
  outlineTimeline
    .to(bottom, {
      y: "-20rem",
      ease: "none",
    })
    .to(
      top,
      {
        y: "20rem",
        ease: "none",
      },
      "<"
    )
    .to(bottom, {
      opacity: 0,
      ease: "none",
    })
    .to(
      top,
      {
        opacity: 0,
        ease: "none",
      },
      "<"
    );

  const stagger = 1;
  const wordTimeline = gsap.timeline({
    repeat: -1,
  });

  wordTimeline.from(".word-rotation-list li", {
    y: 120,
    opacity: 0,
    stagger: stagger,
  });

  wordTimeline.to(
    ".word-rotation-list li",
    {
      y: -120,
      opacity: 0,
      stagger: stagger,
    },
    stagger
  );
  // End About Section Animation

  // Start Build Section Animation
  const buildSectionTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".build",
      scrub: 1,
      start: "left center",
      end: "center center",
      horizontal: true,
    },
  });

  buildSectionTimeline
    .from(".build-left-component", { opacity: 0 })
    .from(".build-pills.one", { y: "-60rem", opacity: 0, ease: "bounce.out" })
    .from(".build-circle", { y: "-50rem", opacity: 0, ease: "bounce.out" }, "<")
    .from(
      ".build-pills.pill-two",
      { y: "-40rem", opacity: 0, ease: "bounce.out" },
      "<"
    )
    .from(
      ".build-small-pointed-circle",
      { y: "-30rem", opacity: 0, ease: "bounce.out" },
      "<"
    )
    .from(
      ".semi-circle-container",
      { y: "-20rem", opacity: 0, ease: "bounce.out" },
      "<"
    );

  // End Build Section

  // Begin Vision Animation
  const visionBlocks = gsap.utils.toArray(".vision-block");
  visionBlocks.map((visionBlock, idx) => {
    backgroundTimeline(".vision").fromTo(
      visionBlock,
      {
        x: `-${idx + 5}rem`,
      },
      {
        x: `${idx + 5}rem`,
      }
    );
  });
  backgroundTimeline(".vision").fromTo(
    ".vision-background",
    { x: "-25rem" },
    { x: "25rem" }
  );
  // End Vision Animation

  // Begin Hangout Animation
  backgroundTimeline(".hangout").fromTo(
    ".hangout-outline-background",
    { x: "-10rem", x: "10rem" },
    { x: 0, y: 0 }
  );
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
    },
  });
  const footerButtons = gsap.utils.toArray(".button.minimal.small.w-button");
  const footerIcons = gsap.utils.toArray(".footer-icon-characters");
  const footerFootnote = gsap.utils.toArray(".footer-link");

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
    .from(footerFootnote[1], { opacity: 0, x: "-5rem" });

  // End Footer Animation

  //! <------------------------------------ Roadmap Section ------------------------------------>
  const roadmapText = document.querySelectorAll(".roadmap-subheader");
  const milestoneHeaders = document.querySelectorAll(
    ".roadmap .milestone-header"
  );
  const shortVerticalLines = document.querySelectorAll(
    ".roadmap .short-vertical-line"
  );
  const longVerticalLines = document.querySelectorAll(
    ".roadmap .long-vertical-line"
  );
  const checkIcon = document.querySelector(".roadmap .check-icon");

  gsap.to(checkIcon, {
    scrollTrigger: {
      trigger: checkIcon,
      start: "left 20%",
      end: "right 20%",
      horizontal: true,
      scrub: 1,
      onEnter: () => {
        gsap.to(checkIcon, {
          opacity: 1,
          duration: 0.2,
        });
      },
      onLeaveBack: () => {
        gsap.to(checkIcon, {
          opacity: 0,
          duration: 0.2,
        });
      },
    },
  });

  shortVerticalLines.forEach((line) => {
    gsap.to(line, {
      scrollTrigger: {
        trigger: line,
        start: "left 20%",
        end: "right 20%",
        horizontal: true,
        scrub: 1,
        onEnter: () => {
          line.style.opacity = 0.5;
        },
        onLeaveBack: () => {
          line.style.opacity = 0.24;
        },
      },
    });
  });
  longVerticalLines.forEach((line) => {
    gsap.to(line, {
      scrollTrigger: {
        trigger: line,
        start: "left 20%",
        end: "right 20%",
        horizontal: true,
        scrub: 1,
        onEnter: () => {
          gsap.to(line, {
            y: 10,
          });
        },
        onLeaveBack: () => {
          gsap.to(line, {
            y: 0,
          });
        },
      },
    });
  });

  milestoneHeaders.forEach((milestone, idx) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: milestone,
        start: "left 20%",
        end: "right 20%",
        horizontal: true,
        scrub: 1,
        onEnter: () => {
          // Animate milestone
          gsap.to(milestone, {
            duration: 0.2,
            onComplete: () => {
              milestone.classList.add("milestone-active");
              gsap.set(milestone, { clearProps: "backgroundColor" });
            },
          });

          // Animate text change
          gsap.to(roadmapText[idx], {
            opacity: 0,
            y: 40,
            duration: 0.2,
            onComplete: () => {
              roadmapText.forEach((text, textIdx) => {
                if (textIdx !== idx + 1) {
                  text.classList.remove("roadmap-subheader-active");
                }
              });
              gsap.to(roadmapText[idx + 1], {
                opacity: 0,
                y: -40,
                duration: 0.2,
                onComplete: () => {
                  roadmapText[idx + 1].classList.add(
                    "roadmap-subheader-active"
                  );
                  gsap.to(roadmapText[idx + 1], {
                    opacity: 1,
                    y: 0,
                    duration: 0.2,
                    onComplete: () => {
                      gsap.set(roadmapText[idx + 1], { clearProps: "all" });
                    },
                  });
                },
              });
            },
          });
        },
        onLeaveBack: () => {
          // Animate milestone
          gsap.to(milestone, {
            backgroundColor: "",
            duration: 0.2,
            onComplete: () => {
              milestone.classList.remove("milestone-active");
              gsap.set(milestone, { clearProps: "backgroundColor" });
            },
          });

          // Animate text change back
          gsap.to(roadmapText[idx], {
            opacity: 0,
            y: 40,
            duration: 0.2,
            onComplete: () => {
              roadmapText.forEach((text, textIdx) => {
                if (textIdx !== idx) {
                  text.classList.remove("roadmap-subheader-active");
                }
              });

              gsap.to(roadmapText[idx - 1], {
                opacity: 0,
                y: -40,
                duration: 0.2,
                onComplete: () => {
                  roadmapText[idx - 1].classList.add(
                    "roadmap-subheader-active"
                  );
                  gsap.to(roadmapText[idx - 1], {
                    opacity: 1,
                    y: 0,
                    duration: 0.2,
                    onComplete: () => {
                      gsap.set(roadmapText[idx - 1], { clearProps: "all" });
                    },
                  });
                },
              });
            },
          });
        },
      },
    });
  });

  //! <------------------------------------ Vision Section ------------------------------------>
  const visionText = document.querySelectorAll(".vision .vision-text");
  const visionCategory = document.querySelectorAll(".vision .vision-category");

  visionCategory.forEach((category, idx) => {
    const offset = Math.ceil(category.offsetWidth / 4)
    gsap.timeline({
      scrollTrigger: {
        trigger: category,
        start: `left left`,
        end: `center+=${offset} center`,
        horizontal: true,
        markers: true,
        scrub: 1,
      },
    }).to(category, {
      opacity: 100
    }, "<").fromTo(visionText[idx], {
      opacity: 0,
      y: 100,
    }, {
      opacity: 100,
      y: 0
    }, "<").to(visionText[idx], {
      opacity: 0,
    })

  });
};
