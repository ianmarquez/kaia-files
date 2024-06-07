gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

Observer.create({
	target: window,
	type: "wheel",
	onChangeY: (self) => {
		if (window.innerWidth <= 523) return;
		document.documentElement.scrollLeft += self.deltaY;
	},
});

const colors = {
	neonLime500: "#bff009",
};

window.onload = function () {
	const isMobile = window.innerWidth;
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
									roadmapText[idx + 1]?.classList.add(
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

	//! <------------------------------------ Partners Section ------------------------------------>
	// const partnersLogoWrapper = document.querySelector(
	// 	".partners .collection-list-wrapper"
	// );
	// const partnersLogoContainer = document.querySelector(
	// 	".partners .collection-list"
	// );
	// const partnersLogos = document.querySelectorAll(".partner-icon-item");
	//
	// partnersLogoWrapper.classList.add("swiper");
	// partnersLogoContainer.classList.add("swiper-wrapper");
	//
	// function handleClick(event) {}
	//
	// function handleHover(event) {}
	//
	// function handleHoverLeave(event) {}
	//
	// partnersLogos.forEach((logo) => {
	// 	logo.classList.add("swiper-slide");
	// });
	//
	// const swiper = new Swiper(".swiper", {
	// 	direction: "vertical",
	// 	loop: true,
	// 	centeredSlides: true,
	// 	slidesPerView: 2.5,
	// 	spaceBetween: 1,
	// 	on: {
	// 		init: function () {
	// 			const activeSlide = this.slides[this.activeIndex];
	// 			activeSlide.children[0].style.backgroundColor = colors.neonLime500;
	// 			activeSlide.children[0].children[0].style.filter = "invert(1)";
	// 		},
	// 		slideChange: function () {
	// 			const previousSlide = this.slides[this.previousIndex];
	// 			previousSlide.children[0].style.backgroundColor = "";
	// 			previousSlide.children[0].children[0].style.filter = "";
	//
	// 			const activeSlide = this.slides[this.activeIndex];
	// 			activeSlide.children[0].style.backgroundColor = colors.neonLime500;
	// 			activeSlide.children[0].children[0].style.filter = "invert(1)";
	// 		},
	// 	},
	// });
	//
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
			.fromTo(
				category,
				{
					opacity: 0.24,
				},
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
					duration: 1.5,
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
				x: -categoryWidth - convertRemToPixels(6),
			});
	});

	//! <------------------------------------ Logo Blocks Lottie Section ------------------------------------>

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

	//! <------------------------------------ Partners Section Infinite Marquee Scroll  ------------------------------------>

	const partnersLogoCollection = document.querySelector(
		".partners .collection-list-wrapper"
	);
	const partnersLogoContainer = document.querySelector(
		".partners .collection-list"
	);
	const partnersLogoItems = document.querySelectorAll(".partner-icon-item");

	partnersLogoCollection.classList.add("marquee");
	partnersLogoContainer.classList.add("marquee__inner");
	partnersLogoItems.forEach((item) => {
		item.classList.add("marquee__part");
	});

	let currentScroll = 0;
	let isScrollingDown = true;

	let tween = gsap
		.to(".marquee__part", {
			yPercent: -400,
			repeat: -1,
			duration: 5,
			ease: "linear",
		})
		.totalProgress(0.5);

	gsap.set(".marquee__inner", { yPercent: 0 });

	// Change direction on scroll
	window.addEventListener("scroll", function () {
		if (window.scrollY > currentScroll) {
			isScrollingDown = true;
		} else {
			isScrollingDown = false;
		}

		gsap.to(tween, {
			timeScale: isScrollingDown ? 1 : -1,
		});

		currentScroll = window.scrollY;
	});

	partnersLogoItems.forEach((item, idx) => {
		const circle = item.children[0];
		gsap.timeline({
			scrollTrigger: {
				trigger: item,
				start: "top center",
				end: "bottom center",
				// onUpdate: (self) => {
				// 	const progress = self.progress;
				// 	const opacity = 1 - Math.abs(progress - 0.5) * 2; // Calculate opacity
				// 	gsap.to(item, { opacity: opacity });
				// },
			},
		});
	});
};
