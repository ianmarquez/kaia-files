gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);
gsap.registerPlugin(Draggable);

Observer.create({
	target: window,
	type: "wheel",
	onChangeY: (self) => {
		if (window.innerWidth <= 524) return;
		document.documentElement.scrollLeft += self.deltaY;
	},
});

const colors = {
	neonLime500: "#bff009",
};

window.onload = function () {
	const isMobile = window.innerWidth <= 524;
	document.body.style.overflow = "hidden";
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
			horizontal: isMobile,
		},
	});
	outlineTimeline
		.to(bottom, {
			y: () => (isMobile ? "-20rem" : "-5rem"),
			ease: "none",
		})
		.to(
			top,
			{
				y: () => (isMobile > 524 ? "20rem" : "5rem"),
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
		y: isMobile ? 60 : 120,
		opacity: 0,
		stagger: stagger,
	});

	wordTimeline.to(
		".word-rotation-list li",
		{
			y: isMobile ? -60 : -120,
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
			horizontal: isMobile > 524,
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

	// Begin FAQ Animation

	// End FAQ Animation

	// Begin Footer Animation
	const footerTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: ".footer",
			scrub: 1,
			start: "left center",
			end: !isMobile ? "center center" : "+=100",
			horizontal: !isMobile,
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
	const checkIcons = document.querySelectorAll(".roadmap .check-icon");

	checkIcons.forEach((checkIcon) => {
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
				horizontal: true,
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
			horizontal: true,
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
			},
		});
	});

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

	const marquee = gsap.utils.toArray(".marquee__part");

	// Function to create a seamless vertical loop
	function verticalLoop(marquee, config) {
		config = config || {};
		let tl = gsap.timeline({
				repeat: config.repeat,
				paused: config.paused,
				defaults: { ease: "none" },
				onReverseComplete: () =>
					tl.totalTime(tl.rawTime() + tl.duration() * 100),
			}),
			length = marquee.length,
			startY = marquee[0].offsetTop,
			times = [],
			heights = [],
			yPercents = [],
			curIndex = 0,
			pixelsPerSecond = (config.speed || 1) * 100,
			snap =
				config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
			totalHeight,
			curY,
			distanceToStart,
			distanceToLoop,
			item,
			i;

		gsap.set(marquee, {
			yPercent: (i, el) => {
				let h = (heights[i] = parseFloat(gsap.getProperty(el, "height", "px")));
				yPercents[i] = snap(
					(parseFloat(gsap.getProperty(el, "y", "px")) / h) * 100 +
						gsap.getProperty(el, "yPercent")
				);
				return yPercents[i];
			},
		});

		gsap.set(marquee, { y: 0 });

		totalHeight =
			marquee[length - 1].offsetTop +
			(yPercents[length - 1] / 100) * heights[length - 1] -
			startY +
			marquee[length - 1].offsetHeight *
				gsap.getProperty(marquee[length - 1], "scaleY") +
			(parseFloat(config.paddingBottom) || 0);

		for (i = 0; i < length; i++) {
			item = marquee[i];
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

		return tl;
	}

	const loop = verticalLoop(marquee, { repeat: -1, speed: 2 });

	// Change direction on scroll
	let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
	window.addEventListener("scroll", () => {
		let currentScrollTop;
		if (isMobile) {
			currentScrollTop = window.scrollX || document.documentElement.scrollTop;
		} else {
			currentScrollTop = window.scrollY || document.documentElement.scrollTop;
		}
		if (currentScrollTop > lastScrollTop) {
			gsap.to(loop, { timeScale: 1 });
		} else {
			gsap.to(loop, { timeScale: -1 });
		}
		lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
	});

	let isDragging = false;
	let dragTimeout;

	Draggable.create(".marquee__inner", {
		type: "y",
		bounds: ".partners-container",
		inertia: true,
		onClick: function () {
			console.log("clicked");
		},
		onPress() {
			isDragging = true;
			gsap.to(loop, { timeScale: 0 });
		},
		onRelease() {
			clearTimeout(dragTimeout);
			dragTimeout = setTimeout(() => {
				isDragging = false;
				gsap.to(loop, { timeScale: isScrollingDown ? 1 : -1 });
			}, 1000);
		},
		onDrag() {
			clearTimeout(dragTimeout);
			let direction = this.getDirection("y");
			isScrollingDown = direction === "down";
			gsap.to(loop, { timeScale: direction === "down" ? 1 : -1 });
		},
	});

	let isScrollingDown = true;

	function detectScrollDirection() {
		let currentScroll = window.scrollY || document.documentElement.scrollTop;
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
	// //! <------------------------------------ Logo Blocks Lottie Section ------------------------------------>

	function LottieScrollTrigger(vars) {
		let playhead = { frame: 0 },
			target = gsap.utils.toArray(vars.target)[0],
			speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
			st = {
				trigger: target,
				pin: true,
				start: vars.name !== "mobile" ? "left -2%" : "top bottom",
				end: speeds[vars.speed] || "+=1000",
				scrub: 1,
				horizontal: vars.name !== "mobile",
				pin: true,
				pinSpacing: false,
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
		animation.addEventListener("DOMLoaded", function () {
			let createTween = function () {
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
	const element = document.querySelector(".logo-blocks-lottie");
	const computedStyle = window.getComputedStyle(element);
	const desktopDisplayProperty = computedStyle.display;

	LottieScrollTrigger({
		target:
			desktopDisplayProperty !== "none"
				? ".logo-blocks-lottie"
				: ".logo-blocks-lottie-mobile",
		path:
			desktopDisplayProperty !== "none"
				? "https://uploads-ssl.webflow.com/664eba067d215a74039c41ee/66626ab88788eb7edaed9e2e_KaiaMicrositeAnimation_Visual1_Desktop_v001.json"
				: "https://uploads-ssl.webflow.com/664eba067d215a74039c41ee/66629e30ef515045bfc77c00_KaiaMicrositeAnimation_Visual1_Mobile_v001.json",
		speed: "slow",
		scrub: 2, // seconds it takes for the playhead to "catch up"
		name: desktopDisplayProperty !== "none" ? "desktop" : "mobile",
	});

	let faqFilterChip = gsap.utils.toArray(".faq-filter-chip");

	function attachGsapEvents(faqIndex) {
		let faqList = gsap.utils.toArray(".faq-list");
		const children = gsap.utils.toArray(faqList[faqIndex].children);
		if (children.length > 0) {
			children.map((item, idx) => {
				openFAQItem(item, idx, children);
			});
		}
	}

	function openFAQItem(item, index, items) {
		let isOpen = false;
		const [container] = gsap.utils.toArray(item.children);
		const [header, content] = gsap.utils.toArray(container.children);
		const [text, icon] = gsap.utils.toArray(header.children);

		const openFAQ = () => {
			gsap.to(icon, {
				rotate: 270,
				duration: 0.2,
				ease: "power2.in",
			});
			gsap.to(header, { border: 0 });
			gsap.to(content, {
				height: isMobile ? "500" : "250",
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
			gsap.to(header, { border: 1 });
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
			} else {
				openFAQ();
			}
			isOpen = !isOpen;
		};
		item.onclick = onAccordionClick;
	}

	faqFilterChip.map((filterChip, idx) => {
		filterChip.onclick = () => attachGsapEvents(idx);
	});
	attachGsapEvents(0);
};
