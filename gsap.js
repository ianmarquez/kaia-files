gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);
gsap.registerPlugin(Draggable);

const colors = {
  neonLime500: "#bff009",
};

window.onload = function() {
  const isMobile = document.body.clientWidth <= 524;
  const isKorean = window.location.pathname.includes("/ko");
  const backgroundTimeline = (trigger, markers) => {
    return gsap.timeline({
      scrollTrigger: {
        trigger,
        scroller: ".view",
        scrub: 1,
        start: "left",
        end: "right",
        ...(!!markers ? { markers: true } : {}),
        horizontal: true,
      },
    });
  };

  if (!isMobile) {
    Observer.create({
      target: document.querySelector('.view'),
      type: "wheel",
      onChangeY: (self) => {
        console.log(self)
        self.target.scrollLeft += self.deltaY;
      },
    });
  }

  const WelcomeVideo = () => {
    const desktopVideo = document.getElementById("desktop-video-element");
    desktopVideo.playbackRate = 2;
    const tabletVideo = document.getElementById("tablet-video-element");
    tabletVideo.playbackRate = 2;
    const mobileVideo = document.getElementById("mobile-video-element");
    mobileVideo.playbackRate = 2;
    setTimeout(() => {
      document.body.style.overflow = "";
      gsap
        .timeline()
        .fromTo(
          "#scroll-cta-marker",
          {
            opacity: 0,
            scale: 1,
          },
          {
            opacity: 100,
            scale: 1.25,
          }
        )
        .to("#scroll-cta-marker", {
          scale: 1,
        })
        .repeat(2);
      gsap.to(desktopVideo, {
        backgroundColor: "transparent",
      });
    }, 5000);
  };
  WelcomeVideo();

  // Swiper Implementation

  // End Swiper Implementation

  const AboutSection = () => {
    const [top, baseline, bottom] = gsap.utils.toArray(".outline-container");
    const outlineTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".intro",
        scrub: 1,
        start: "right center",
        end: "+=700",
        scroller: ".view",
        horizontal: !isMobile,
      },
    });
    outlineTimeline
      .to(bottom, {
        y: () => (isMobile ? "-20rem" : "-10rem"),
        ease: "none",
      })
      .to(
        top,
        {
          y: () => (isMobile > 524 ? "20rem" : "10rem"),
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
      )
      .to(".about-text-container", {
        opacity: 100,
        ease: "power2.out",
      });

    const stagger = 2;
    const wordTimeline = gsap.timeline({
      repeat: -1,
    });

    wordTimeline.from(".word-rotation-list li", {
      y: isMobile ? -60 : -120,
      opacity: 0,
      stagger: stagger,
      ease: "bounce.out",
    });

    wordTimeline.to(
      ".word-rotation-list li",
      {
        y: isMobile ? 60 : 120,
        opacity: 0,
        stagger: stagger,
        ease: "power2.out",
      },
      stagger
    );

    const wordTimelineMobile = gsap.timeline({
      repeat: -1,
    });

    wordTimelineMobile.from(".word-rotation-list-mobile li", {
      y: isMobile ? -60 : -120,
      opacity: 0,
      stagger: stagger,
      ease: "bounce.out",
    });

    wordTimelineMobile.to(
      ".word-rotation-list-mobile li",
      {
        y: isMobile ? 60 : 120,
        opacity: 0,
        stagger: stagger,
        ease: "power2.out",
      },
      stagger
    );
  };

  AboutSection();

  // Start Build Section Animation
  const BuildSection = () => {
    const buildSectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".build",
        scrub: 1,
        start: "left center",
        end: "center center",
        scroller: ".view",
        horizontal: !isMobile,
      },
    });

    buildSectionTimeline
      .from(".build-left-component", { opacity: 0 })
      .from(".build-pills.one", { y: "-60rem", opacity: 0, ease: "bounce.out" })
      .from(
        ".build-circle",
        { y: "-50rem", opacity: 0, ease: "bounce.out" },
        "<"
      )
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
  };
  BuildSection();

  // End Build Section

  // Begin Hangout Animation
  backgroundTimeline(".hangout").fromTo(
    ".hangout-outline-background",
    { x: "-10rem", x: "10rem" },
    { x: 0, y: 0 }
  );
  // End Hangout Animation

  // Begin Footer Animation
  const footerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      scrub: 1,
      start: !isMobile ? "left 30%" : "-10% top",
      ...(!isMobile ? { end: "left 20%" } : {}),
      scroller: ".view",
      horizontal: !isMobile,
    },
  });
  const footerButtons = gsap.utils.toArray(".button.minimal.small.w-button");
  const footerIcons = gsap.utils.toArray(".footer-icon-characters");
  const footerFootnote = gsap.utils.toArray(".footer-link");

  if (!isMobile) {
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
  }

  // End Footer Animation

  const partners = () => {
    gsap.from(".partners-cards", {
      rotationX: 90,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".partners-cards",
        start: "left 50%",
        end: "left 20%",
        scrub: true,
        scroller: ".view",
        horizontal: true,
      },
    });

    const partnersLogoCollection = document.querySelector(
      ".partners .collection-list-wrapper"
    );
    const partnersLogoContainer = document.querySelector(
      ".partners .collection-list"
    );
    const partnersLogoItems = document.querySelectorAll(".partner-icon-item");

    // Add necessary classes to elements
    partnersLogoCollection.classList.add("marquee");
    partnersLogoContainer.classList.add("marquee__inner");
    partnersLogoItems.forEach((item) => {
      item.classList.add("marquee__part");
    });

    const items = gsap.utils.toArray(".marquee__part");

    // Function to create a seamless vertical loop
    function verticalLoop(items, config) {
      config = config || {};
      let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        scroller: ".view",
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
        length = items.length,
        startY = items[0].offsetTop,
        startX = items[0].offsetLeft,
        times = [],
        heights = [],
        widths = [],
        yPercents = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap =
          config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
        totalHeight,
        curY,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;

      if (isMobile) {
        gsap.set(items, {
          xPercent: (i, el) => {
            let w = (widths[i] = parseFloat(
              gsap.getProperty(el, "width", "px")
            ));
            xPercents[i] = snap(
              (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
              gsap.getProperty(el, "xPercent")
            );
            return xPercents[i];
          },
        });
        gsap.set(items, { x: 0 });

        totalWidth =
          items[length - 1].offsetLeft +
          (xPercents[length - 1] / 100) * widths[length - 1] -
          startX +
          items[length - 1].offsetWidth *
          gsap.getProperty(items[length - 1], "scaleX") +
          (parseFloat(config.paddingRight) || 0);

        for (i = 0; i < length; i++) {
          item = items[i];
          curX = (xPercents[i] / 100) * widths[i];
          distanceToStart = item.offsetLeft + curX - startX;
          distanceToLoop =
            distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

          tl.to(
            item,
            {
              xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
              duration: distanceToLoop / pixelsPerSecond,
            },
            0
          )
            .fromTo(
              item,
              {
                xPercent: snap(
                  ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
                ),
              },
              {
                xPercent: xPercents[i],
                duration:
                  (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false,
              },
              distanceToLoop / pixelsPerSecond
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
      } else {
        gsap.set(items, {
          yPercent: (i, el) => {
            let h = (heights[i] = parseFloat(
              gsap.getProperty(el, "height", "px")
            ));
            yPercents[i] = snap(
              (parseFloat(gsap.getProperty(el, "y", "px")) / h) * 100 +
              gsap.getProperty(el, "yPercent")
            );
            return yPercents[i];
          },
        });
        gsap.set(items, { y: 0 });

        totalHeight =
          items[length - 1].offsetTop +
          (yPercents[length - 1] / 100) * heights[length - 1] -
          startY +
          items[length - 1].offsetHeight *
          gsap.getProperty(items[length - 1], "scaleY") +
          (parseFloat(config.paddingBottom) || 0);

        for (i = 0; i < length; i++) {
          item = items[i];
          curY = (yPercents[i] / 100) * heights[i];
          distanceToStart = item.offsetTop + curY - startY;
          distanceToLoop =
            distanceToStart + heights[i] * gsap.getProperty(item, "scaleY");

          tl.to(
            item,
            {
              yPercent: snap(((curY - distanceToLoop) / heights[i]) * 100),
              duration: distanceToLoop / pixelsPerSecond,
            },
            0
          )
            .fromTo(
              item,
              {
                yPercent: snap(
                  ((curY - distanceToLoop + totalHeight) / heights[i]) * 100
                ),
              },
              {
                yPercent: yPercents[i],
                duration:
                  (curY - distanceToLoop + totalHeight - curY) /
                  pixelsPerSecond,
                immediateRender: false,
              },
              distanceToLoop / pixelsPerSecond
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
      }

      function toIndex(index, vars) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 &&
          (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
          vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
      }

      tl.next = (vars) => toIndex(curIndex + 1, vars);
      tl.previous = (vars) => toIndex(curIndex - 1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true);

      if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }

      let dragTimeout;

      // Make the timeline draggable
      if (config.draggable && typeof Draggable === "function") {
        let proxy = document.createElement("div");
        let wrap = gsap.utils.wrap(0, 1);
        let ratio,
          startProgress,
          draggable,
          dragSnap,
          lastSnap,
          initChangeY,
          initChangeX,
          wasPlaying;

        const align = () => {
          if (isMobile) {
            tl.progress(
              wrap(startProgress + (draggable.startX - draggable.x) * ratio)
            );
          } else {
            tl.progress(
              wrap(startProgress + (draggable.startY - draggable.y) * ratio)
            );
          }
        };
        const syncIndex = () => {
          let currentTime = tl.time(); // Get the current time of the timeline
          let closestTimeIndex = 0;
          let closestTimeDifference = Math.abs(currentTime - times[0]);

          // Loop through all the times in the timeline
          for (let i = 1; i < times.length; i++) {
            let timeDifference = Math.abs(currentTime - times[i]);
            // Check if the current time is closer to this time
            if (timeDifference < closestTimeDifference) {
              closestTimeDifference = timeDifference;
              closestTimeIndex = i;
            }
          }

          // Update the current index of the timeline to the closest time index
          curIndex = closestTimeIndex;
        };

        if (isMobile) {
          draggable = Draggable.create(proxy, {
            trigger: items[0].parentNode,
            type: "x",

            onPressInit() {
              let x = this.x;
              gsap.killTweensOf(tl);
              wasPlaying = !tl.paused();
              tl.pause();
              startProgress = tl.progress();
              ratio = 1 / totalWidth;
              initChangeX = startProgress / -ratio - x;
              gsap.set(proxy, { x: startProgress / -ratio });
              clearTimeout(dragTimeout);
            },
            onDrag: align,
            onThrowUpdate: align,
            overshootTolerance: 0,
            inertia: true,
            snap(value) {
              if (Math.abs(startProgress / -ratio - this.x) < 10) {
                return lastSnap + initChangeX;
              }
              let time = -(value * ratio) * tl.duration(),
                wrappedTime = gsap.utils.wrap(0, tl.duration())(time),
                snapTime = times[getClosest(times, wrappedTime, tl.duration())],
                dif = snapTime - wrappedTime;
              Math.abs(dif) > tl.duration() / 2 &&
                (dif += dif < 0 ? tl.duration() : -tl.duration());
              lastSnap = (time + dif) / tl.duration() / -ratio;
              return lastSnap;
            },
            onRelease() {
              syncIndex();
              draggable.isThrowing && (curIndex = tl.current());
              dragTimeout = setTimeout(() => {
                gsap.to(tl, { timeScale: -1 });
                tl.play();
              }, 1000);
            },
          })[0];
        } else {
          draggable = Draggable.create(proxy, {
            trigger: items[0].parentNode,
            type: "y",

            onPressInit() {
              let y = this.y;
              gsap.killTweensOf(tl);
              wasPlaying = !tl.paused();
              tl.pause();
              startProgress = tl.progress();
              ratio = 1 / totalHeight;
              initChangeY = startProgress / -ratio - y;
              gsap.set(proxy, { y: startProgress / -ratio });
              clearTimeout(dragTimeout); // Clear any existing timeout
            },
            onDrag: align,
            onThrowUpdate: align,
            overshootTolerance: 0,
            inertia: true,
            snap(value) {
              if (Math.abs(startProgress / -ratio - this.y) < 10) {
                return lastSnap + initChangeY;
              }
              let time = -(value * ratio) * tl.duration(),
                wrappedTime = gsap.utils.wrap(0, tl.duration())(time),
                snapTime = times[getClosest(times, wrappedTime, tl.duration())],
                dif = snapTime - wrappedTime;
              Math.abs(dif) > tl.duration() / 2 &&
                (dif += dif < 0 ? tl.duration() : -tl.duration());
              lastSnap = (time + dif) / tl.duration() / -ratio;
              return lastSnap;
            },
            onRelease() {
              syncIndex();
              draggable.isThrowing && (curIndex = tl.current());
              dragTimeout = setTimeout(() => {
                gsap.to(tl, { timeScale: -1 });
                tl.play();
              }, 1000);
            },
          })[0];
        }
        gsap.to(tl, { timeScale: -1 });
      }

      return tl;
    }

    verticalLoop(items, { repeat: -1, speed: 2, draggable: true });
  };
  partners();

  //! <------------------------------------ Vision Section ------------------------------------>
  const vision = () => {
    const visionText = document.querySelectorAll(".vision .vision-text");
    const visionCategory = document.querySelectorAll(
      ".vision .vision-category"
    );
    const visionCategoryContainer = document.querySelector(
      ".vision .vision-category-container"
    );
    const visionBlocks = gsap.utils.toArray(".vision-block");

    function convertRemToPixels(rem) {
      return (
        rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
      );
    }

    visionCategory.forEach((category, idx) => {
      const categoryWidth = category.offsetWidth;

      if (!isMobile) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: category,
              start: "left",
              end: "+=800",
              horizontal: true,
              scrub: 1,
              scroller: ".view",
              anticipatePin: 1,
            },
          })
          .to(
            category,

            {
              opacity: 1,
              ease: "power2.inOut",
            }
          )
          .fromTo(
            visionText[idx],
            {
              clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              duration: 40,
            },
            {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              duration: 4,
              ease: "power2.inOut",
              duration: 40,
            },
            "<"
          )

          .to([category, visionText[idx]], {
            opacity: 0,
            y: 100,
            delay: 100,
            duration: 20,
          })
          .to(visionCategoryContainer, {
            x: `-=${categoryWidth + convertRemToPixels(6)}`,
            duration: 20,
          });
      } else {
        const tl = gsap
          .timeline({
            scrollTrigger: {
              trigger: category,
              start: "left 25%",
              end: "right 25%",
              horizontal: true,
              scroller: ".view",
              scrub: 1,
              anticipatePin: 1,
              scroller: ".vision-container",
            },
          })
          .to(
            category,

            {
              opacity: 1,
              ease: "power2.inOut",
            }
          );
        if (idx !== 0) {
          tl.fromTo(
            visionText[idx],
            {
              opacity: 0,
              y: 100,
              duration: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 4,
              ease: "power2.inOut",
              duration: 40,
            },
            "<"
          );
        }

        tl.to([category, visionText[idx]], {
          opacity: 0,
          y: 100,
          delay: 100,
          duration: 20,
        });
      }
    });

    const backgroundTimelineVision = (trigger, markers) => {
      return gsap.timeline({
        scrollTrigger: {
          trigger,
          scrub: 1,
          start: "left",
          end: "right",
          scroller: ".view",
          ...(!!markers ? { markers: true } : {}),
          horizontal: true,

          ...(isMobile && { scroller: ".vision-container" }),
        },
      });
    };

    visionBlocks.map((visionBlock, idx) => {
      backgroundTimelineVision(".vision").to(
        visionBlock,
        {
          x: `-${idx + 1 * 20}rem`,
        },
        {
          x: `${idx + 30 * 3}rem`,
        }
      );
    });

    backgroundTimelineVision(".vision").fromTo(
      ".vision-background",
      { x: "-25rem" },
      { x: "25rem" }
    );

    backgroundTimelineVision(".vision-background-mobile").to(
      ".vision-background-mobile",
      { x: "-25rem", duration: 0.5, ease: "power2.out" }
    );
  };
  vision();

  // //! <------------------------------------ Roadmap Section ------------------------------------>
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
  const checkIcons = document.querySelectorAll(".roadmap .check-icon");

  checkIcons.forEach((checkIcon) => {
    gsap.to(checkIcon, {
      scrollTrigger: {
        trigger: checkIcon,
        start: "left 10%",
        end: "right 10%",
        scroller: ".view",
        horizontal: true,
        scrub: 1,
        ...(isMobile && { scroller: ".roadmap-container" }),
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
  });

  shortVerticalLines.forEach((line) => {
    gsap.to(line, {
      scrollTrigger: {
        trigger: line,
        start: "left 10%",
        end: "right 10%",
        horizontal: true,
        scroller: ".view",
        scrub: 1,
        ...(isMobile && { scroller: ".roadmap-container" }),
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
        start: "left 10%",
        end: "right 10%",
        scroller: ".view",
        horizontal: true,
        scrub: 1,
        ...(isMobile && { scroller: ".roadmap-container" }),
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
        scroller: ".view",
        horizontal: true,
        start: "left 10%",
        end: "right 10%",
        scrub: 1,
        ...(isMobile && { scroller: ".roadmap-container" }),
        onEnter: () => {
          // Animate milestone
          gsap.timeline().to(milestone, {
            onComplete: () => {
              milestone.classList.add("milestone-active");
              gsap.set(milestone, { clearProps: "backgroundColor" });
            },
          }).to(roadmapText[idx], {
            opacity: 1,
            y: 40,
          }, "<");
        },
        onEnterBack: () => {
          gsap.to(roadmapText[idx], {
            opacity: 1,
            y: 40,
          });
        },
        onLeave: () => {
          // Animate milestone
          gsap.timeline().to(milestone, {}).to(roadmapText[idx], {
            opacity: 0,
            y: -40,
          }, "<");
        },
        onLeaveBack: () => {
          gsap.timeline().to(milestone, {
            onComplete: () => {
              milestone.classList.remove("milestone-active");
              gsap.set(milestone, { clearProps: "backgroundColor" });
            },
          }).to(roadmapText[idx], {
            opacity: 0,
            y: -40,
          }, "<");
        },
      },
    });
  });

  gsap.set(".roadmap-ring", { xPercent: -5 });

  const roadmapRings = document.querySelectorAll(".roadmap-ring");

  roadmapRings.forEach((ring, idx) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ring,
          scrub: 0.2,
          scroller: ".view",
          start: "left right",
          end: "+=10000",
          horizontal: true,
          ...(isMobile && { scroller: ".roadmap-container" }),
        },
      })
      .to(ring, {
        rotation: 360 * (idx + 5),
        duration: 1,
        ease: "none",
      });
  });

  gsap.fromTo(
    ".roadmap-rings",
    { x: "-100%", opacity: 0 },
    {
      x: "0%",
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".roadmap-rings",
        start: "left 50%",
        scroller: ".view",
        end: "left 20%",
        scrub: true,
        horizontal: !isMobile,
      },
    }
  );

  gsap.from(".roadmap-header", {
    opacity: 0,
    y: 100,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".roadmap-header",
      scroller: ".view",
      start: "left 80%",
      end: "left 50%",
      scrub: true,
      horizontal: !isMobile,
    },
  });

  const milestones = gsap.utils.toArray(".milestone-header");
  milestones.forEach((milestone) => {
    gsap.from(milestone, {
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: milestone,
        scroller: ".view",
        start: "left 80%",
        end: "left 50%",
        scrub: true,
        horizontal: true,
        ...(isMobile && { scroller: ".roadmap-container" }),
      },
    });
  });

  //! <------------------------------------ Logo Blocks Lottie Section ------------------------------------>
  const LogoBlocksLottie = () => {
    function LottieScrollTrigger(vars) {
      let playhead = { frame: vars.startFrameOffset || 0 },
        target = gsap.utils.toArray(vars.target)[0],
        st = {
          trigger: ".logo-blocks-container",
          // pin: !isMobile,
          pin: true,
          start: !isMobile ? "left -2%" : "top top",
          end: !isMobile ? "+=10000" : "+=3000",
          scrub: 1,
          horizontal: !isMobile,
        },
        ctx = gsap.context && gsap.context(),
        animation = lottie.loadAnimation({
          container: target,
          renderer: vars.renderer || "svg",
          loop: false,
          autoplay: false,
          path: vars.path,
          rendererSettings: vars.rendererSettings || {
            preserveAspectRatio: "xMidYMid slice",
          },
        }),
        frameAnimation;
      for (let p in vars) {
        // let users override the ScrollTrigger defaults
        st[p] = vars[p];
      }
      frameAnimation = vars.timeline || gsap.timeline({ scrollTrigger: st });
      if (vars.timeline && !vars.timeline.vars.scrollTrigger) {
        // if the user passed in a timeline that didn't have a ScrollTrigger attached, create one.
        st.animation = frameAnimation;
        ScrollTrigger.create(st);
      }
      animation.addEventListener("DOMLoaded", function() {
        let createTween = function() {
          animation.goToAndStop(playhead.frame, true);
          frameAnimation.to(
            playhead,
            {
              frame: animation.totalFrames - 1 - (vars.endFrameOffset || 0),
              ease: "none",
              duration: frameAnimation.duration() || 1,
              onUpdate: () => {
                animation.goToAndStop(playhead.frame, true);
              },
            },
            0
          );
          return () => animation.destroy && animation.destroy();
        };
        ctx && ctx.add ? ctx.add(createTween) : createTween();
        // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
      animation.frameAnimation = frameAnimation;
      return animation;
    }

    function getLottieFileURL() {
      if (isKorean) {
        if (isMobile) {
          return "https://uploads-ssl.webflow.com/666642b50954b5d26bc84836/666aa85ce43f3ece5a6fb037_LogoBlocksMobileKOR.json";
        }
        return "https://uploads-ssl.webflow.com/666642b50954b5d26bc84836/666aa85cd1e583caef4d27a2_LogoBlocksDesktopKOR.json";
      }
      if (isMobile) {
        return "https://uploads-ssl.webflow.com/666642b50954b5d26bc84836/666aa85cbb68bc32d13d4458_LogoBlocksMobileEN.json";
      }
      return "https://uploads-ssl.webflow.com/666642b50954b5d26bc84836/666aa85ccf3414dc69c8fe65_LogoBlocksDesktopEN.json";
    }

    LottieScrollTrigger({
      target: !isMobile ? ".logo-blocks-lottie" : ".logo-blocks-lottie-mobile",
      path: getLottieFileURL(),
      scrub: 2,
    });
  };
  // LogoBlocksLottie();

  //! <------------------------------------ FAQ Section ------------------------------------>
  const FAQ = () => {

    // const FAQAnimateTimeline = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".faq",
    //     start: "left center",
    //     end: `right${isMobile ? "+=100" : "-=500"} center`,
    //     horizontal: !isMobile,
    //     scrub: 1
    //   },
    // })
    //
    // FAQAnimateTimeline.from('.faq-container', {
    //   duration: 0.5,
    //   opacity: 0,
    //   scale: 0.9,
    //   onStart: () => {
    //     attachGsapFAQEvents(0);
    //   }
    // }).to(".faq-container", {
    //   duration: 9
    // }).to(".faq-container", {
    //   duration: 0.5,
    //   opacity: 0,
    //   scale: 0.9,
    // })
    let selectedIndex = 0;
    let faqFilterChip = gsap.utils.toArray(".faq-filter-chip");

    function attachGsapFAQEvents(faqIndex) {
      let faqList = gsap.utils.toArray(".faq-list");
      const children = gsap.utils.toArray(faqList[faqIndex].children);
      if (children.length > 0) {
        children.map((item, idx) => {
          FAQItemOnClick(item, idx, children);
        });
      }
    }

    if (isMobile) {
      let dropDownOpen = false;
      const tabsMenu = document.querySelector(".faq-tabs-menu");
      const faqFilterDropdown = document.querySelector(".faq-filter-dropdown");
      const faqDropdownFilterChips = gsap.utils.toArray(".faq-filter-chip");
      const [target, icon] = gsap.utils.toArray(faqFilterDropdown.children);
      faqFilterDropdown.onclick = () => {
        if (dropDownOpen) return closeDropdown();
        return openDropdown();
      };

      const closeDropdown = () => {
        dropDownOpen = false;
        gsap.to(tabsMenu, {
          display: "none",
          ease: "power2.in",
          duration: 0.2,
        });
        gsap.to(icon, {
          rotate: 0,
          duration: 0.2,
        });
      };

      const openDropdown = () => {
        dropDownOpen = true;
        gsap.to(tabsMenu, {
          display: "block",
          ease: "power2.in",
          duration: 0.2,
        });
        gsap.to(icon, {
          rotate: 180,
          duration: 0.2,
        });
      };

      faqDropdownFilterChips.forEach((chip) => {
        chip.addEventListener("click", () => {
          target.innerText = chip.innerText;
          closeDropdown();
        });
      });
    }

    function FAQItemOnClick(item, index, items) {
      let isOpen = false;
      console.log(item)
      const [container] = gsap.utils.toArray(item.children);
      const [header, content] = gsap.utils.toArray(container.children);
      const [title, icon] = gsap.utils.toArray(header.children);

      const openFAQ = () => {
        gsap.to(icon, {
          rotate: 270,
          duration: 0.2,
          ease: "power2.in",
        });
        gsap.to(header, { borderBottomWidth: 0 });
        gsap.to(content, {
          height: isMobile ? "400" : "250",
          duration: 0.3,
          ease: "power2.in",
        });
        items.map((faqItem, idx) => {
          if (idx !== index) {
            gsap.to(faqItem, {
              height: 0,
              duration: 0.2,
              ease: "power2.in",
            });
          }
        });
      };

      const closeFAQ = () => {
        gsap.to(icon, {
          rotate: 90,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(header, { borderBottomWidth: 1 });
        gsap.to(content, { height: "0", duration: 0.3, ease: "power2.out" });
        items.map((faqItem, idx) => {
          if (idx !== index) {
            gsap.to(faqItem, {
              height: "auto",
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });
      };
      const onAccordionClick = () => {
        if (isOpen) {
          closeFAQ();
          selectedIndex = 0;
        } else {
          selectedIndex = index;
          openFAQ();
        }
        isOpen = !isOpen;
      };
      title.onclick = onAccordionClick;
      icon.onclick = onAccordionClick;
    }

    faqFilterChip.map((filterChip, idx) => {
      filterChip.addEventListener("click", () => {
        attachGsapFAQEvents(idx);
      });
    });
  };
  FAQ();

  const HangoutWithUs = () => {
    const hangoutTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".hangout-container",
        scroller: ".view",
        horizontal: !isMobile,
        scrub: 2,
        start: `left-=${isMobile ? 100 : 300}px center`,
        end: "left center"
      }
    })
    hangoutTimeline.from('.hangout-container', {
      x: "-300px",
      opacity: 0,
      scale: 0.95,
      ease: "power2.in"
    }).from('.button.large', {
      scale: 0.9,
      ease: "bounce.out"
    })

  }
  HangoutWithUs()

  const MobileMenu = () => {
    //! <------------------------------------ Mobile Menu Section ------------------------------------>
    const mobileMenu = document.querySelector(".mobile-menu");
    const sticky = mobileMenu.offsetTop;

    window.onscroll = function() {
      if (window.scrollY >= sticky) {
        mobileMenu.classList.add("sticky");
      } else {
        mobileMenu.classList.remove("sticky");
      }
    };
  }
  MobileMenu()
};

