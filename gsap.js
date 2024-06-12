gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);
gsap.registerPlugin(Draggable);

const colors = {
  neonLime500: "#bff009",
};

window.onload = function() {
  const isMobile = document.body.clientWidth <= 524;
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

  if (!isMobile) {
    Observer.create({
      target: window,
      type: "wheel",
      onChangeY: (self) => {
        document.documentElement.scrollLeft += self.deltaY;
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
        .repeat(-1);
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

  // Begin Vision Animation
  const visionBlocks = gsap.utils.toArray(".vision-block");
  visionBlocks.map((visionBlock, idx) => {
    backgroundTimeline(".vision").to(
      visionBlock,
      {
        x: `-${idx + 1 * 20}rem`,
      },
      {
        x: `${idx + 30 * 3}rem`,
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

  // Begin Footer Animation
  const footerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      scrub: 1,
      start: !isMobile ? "left center" : "-10% top",
      ...(!isMobile ? { end: "center center" } : {}),
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

  //! <------------------------------------ Partners Section ------------------------------------>
  gsap.from(".partners-cards", {
    rotationX: 90,
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".partners-cards",
      start: "left 50%",
      end: "left 20%",
      scrub: true,
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
          let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 + // Change to x
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
        (parseFloat(config.paddingRight) || 0); // Change to paddingRight

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
                (curY - distanceToLoop + totalHeight - curY) / pixelsPerSecond,
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

    let isDragging = false;
    let dragTimeout;
    let isScrollingDown = true;

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
          type: "x", // Change to "x" for horizontal dragging

          onPressInit() {
            let x = this.x; // Change to x for horizontal dragging
            gsap.killTweensOf(tl);
            wasPlaying = !tl.paused();
            tl.pause();
            startProgress = tl.progress();
            ratio = 1 / totalWidth; // Change to totalWidth for horizontal scrolling
            initChangeX = startProgress / -ratio - x; // Change to initChangeX and x
            gsap.set(proxy, { x: startProgress / -ratio }); // Change to x
            clearTimeout(dragTimeout); // Clear any existing timeout
          },
          onDrag: align,
          onThrowUpdate: align,
          overshootTolerance: 0,
          inertia: true,
          snap(value) {
            if (Math.abs(startProgress / -ratio - this.x) < 10) {
              // Change to x
              return lastSnap + initChangeX; // Change to initChangeX
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
            const direction = this.getDirection("x"); // Change to "x" for horizontal dragging
            dragTimeout = setTimeout(() => {
              gsap.to(tl, { timeScale: direction === "left" ? 1 : -1 }); // Adjust direction
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
            const direction = this.getDirection("y");
            dragTimeout = setTimeout(() => {
              gsap.to(tl, { timeScale: direction === "up" ? 1 : -1 });
              tl.play();
            }, 1000);
          },
        })[0];
      }
    }

    return tl;
  }

  const loop = verticalLoop(items, { repeat: -1, speed: 2, draggable: true });

  // Define debounce function
  function debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this,
        args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Change direction on scroll with debounce
  let lastScrollTop = window.scrollX || document.documentElement.scrollTop;
  const scrollHandler = debounce(() => {
    let currentScrollTop;
    if (isMobile) {
      currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    } else {
      currentScrollTop = window.scrollX || document.documentElement.scrollTop;
    }
    if (currentScrollTop > lastScrollTop) {
      gsap.to(loop, { timeScale: -1 });
    } else {
      gsap.to(loop, { timeScale: 1 });
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }, 20);

  window.addEventListener("scroll", scrollHandler);

  function detectScrollDirection() {
    let currentScroll = window.scrollX || document.documentElement.scrollTop;
    isScrollingDown = currentScroll > currentScroll || false;
    currentScroll = currentScroll <= 0 ? 0 : currentScroll;
  }

  window.addEventListener("scroll", detectScrollDirection);

  //! <------------------------------------ Vision Section ------------------------------------>
  const visionText = document.querySelectorAll(".vision .vision-text");
  const visionCategory = document.querySelectorAll(".vision .vision-category");
  const visionCategoryContainer = document.querySelector(
    ".vision .vision-category-container"
  );

  function convertRemToPixels(rem) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  visionCategory.forEach((category, idx) => {
    const offset = Math.ceil(category.offsetWidth / 4);
    const categoryWidth = category.offsetWidth;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: category,
          start: `left-16px 20%`,
          end: `right 20%`,
          horizontal: true,
          scrub: 1,
          anticipatePin: 1,
          ...(isMobile && { scroller: ".vision-container" }),
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
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 4,
          ease: "power2.inOut",
        },
        "<"
      )

      .to([category, visionText[idx]], {
        opacity: 0,
        y: 100,
        delay: 10,
      })
      .to(visionCategoryContainer, {
        x: `-=${categoryWidth + convertRemToPixels(6)}`,
        duration: 10,
        ease: "power2.inOut",
      });
  });

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
        start: "left 20%",
        end: "right 20%",
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
        start: "left 20%",
        end: "right 20%",
        horizontal: true,
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
        start: "left 20%",
        end: "right 20%",
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
        horizontal: true,
        start: "left 20%",
        end: "right 20%",
        scrub: 1,
        ...(isMobile && { scroller: ".roadmap-container" }),
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
            opacity: 1,
            y: 40,
            duration: 0.2,
          });
        },
        onEnterBack: () => {
          gsap.to(roadmapText[idx], {
            opacity: 1,
            y: 40,
          });
        },
        onLeave: () => {
          // Animate milestone
          gsap.to(milestone, {});

          // Animate text change back
          gsap.to(roadmapText[idx], {
            opacity: 0,
            y: -40,
            duration: 0.2,
          });
        },
        onLeaveBack: () => {
          gsap.to(milestone, {
            duration: 0.2,

            onComplete: () => {
              milestone.classList.remove("milestone-active");
              gsap.set(milestone, { clearProps: "backgroundColor" });
            },
          });

          gsap.to(roadmapText[idx], {
            opacity: 0,
            y: -40,
          });
        },
      },
    });
  });

  gsap.set(".roadmap-ring", { xPercent: -50 });

  const roadmapRings = document.querySelectorAll(".roadmap-ring");

  roadmapRings.forEach((ring, idx) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ring,
          scrub: 0.2,
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
        start: "left 80%",
        end: "left 50%",
        scrub: true,
        horizontal: true,
        ...(isMobile && { scroller: ".roadmap-container" }),
      },
    });
  });
  // //! <------------------------------------ Logo Blocks Lottie Section ------------------------------------>
  function LottieScrollTrigger(vars) {
    let playhead = { frame: 0 },
      target = gsap.utils.toArray(vars.target)[0],
      // speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
      st = {
        trigger: ".logo-blocks-container",
        pin: !isMobile,
        start: !isMobile ? "left -2%" : "top bottom",
        end: "right left",
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
      });
    for (let p in vars) {
      st[p] = vars[p];
    }
    animation.addEventListener("DOMLoaded", function() {
      let createTween = function() {
        animation.frameTween = gsap.to(playhead, {
          frame: animation.totalFrames - 1,
          ease: "none",
          onUpdate: () => animation.goToAndStop(playhead.frame, true),
          scrollTrigger: st,
        });
        return () => animation.destroy && animation.destroy();
      };
      ctx && ctx.add ? ctx.add(createTween) : createTween();
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return animation;
  }

  LottieScrollTrigger({
    target: !isMobile ? ".logo-blocks-lottie" : ".logo-blocks-lottie-mobile",
    path: !isMobile
      ? "https://uploads-ssl.webflow.com/666642b50954b5d26bc84836/6667cc6504782fca0e0e020a_LogoBlocksDesktop.json"
      : "https://uploads-ssl.webflow.com/666642b50954b5d26bc84836/666908b496152d20e5692a99_LogoBlocksMobile.json",
    speed: "slow",
    scrub: 2, // seconds it takes for the playhead to "catch up"
  });

  // Begin FAQ Animation
  const FAQ = () => {
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
      item.onclick = onAccordionClick;
    }

    faqFilterChip.map((filterChip, idx) => {
      filterChip.addEventListener("click", () => {
        attachGsapFAQEvents(idx);
      });
    });
    attachGsapFAQEvents(0);
  };
  FAQ();
};
