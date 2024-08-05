let openedAccordionIdx = 0;

function hideAccordionContent(pill) {
	const [header, content] = gsap.utils.toArray(pill.children);
	const iconContainer = header.children[1];
	const verticalBar = iconContainer.children[1];
	const bounds = header.getBoundingClientRect();

	const hideTimeline = gsap.timeline({
		onStart: function () {
			// gsap.set(content, { clearProps: "padding" });
		},
	});
	hideTimeline.timeScale(2);
	hideTimeline
		.to(content.children, { opacity: 0 })
		.to(content, { height: 0, padding: 0 })
		.to(pill, {
			width: bounds.width,
			height: bounds.height,
		})
		.to(verticalBar, { rotation: 90 }, "<");
}

function showAccordionContent(pill) {
	const [header, content] = gsap.utils.toArray(pill.children);
	const iconContainer = header.children[1];
	const verticalBar = iconContainer.children[1];
	const showTimeline = gsap.timeline({
		onStart: function () {
			gsap.set(pill, { clearProps: "flex" });
			// gsap.set(content, { clearProps: "padding" });
		},
	});
	showTimeline.timeScale(2);

	showTimeline

		.to(content, {
			height: "auto",
			// padding: "var(--spacing--6) var(--spacing--8)",
		})
		.set(content, { clearProps: "padding" })
		.to(pill, {
			height: "auto",
		})
		.to(verticalBar, { rotation: 0 }, "<")
		.to(content.children, { opacity: 1 });
}

function resetAccordion() {
	openedAccordionIdx = 0;
	const pills = gsap.utils.toArray(".horizontal-pill-container");
	pills.map((pill) => {
		const [header, content] = gsap.utils.toArray(pill.children);
		const iconContainer = header.children[1];
		const verticalBar = iconContainer.children[1];

		gsap.set(pill, { clearProps: "all" });
		gsap.set(content, { clearProps: "all" });
		gsap.set(iconContainer, { clearProps: "all" });
		gsap.set(verticalBar, { clearProps: "all" });
		gsap.set(header, { clearProps: "all" });
	});
	Accordion();
}

function Accordion() {
	const pillsContainer = gsap.utils.toArray(".horizontal-pill-container");
	pillsContainer.forEach((pillContainer, idx) => {
		if (idx !== 0) {
			hideAccordionContent(pillContainer);
		}
	});

	pillsContainer.map((pillContainer, idx) => {
		const circleOutline = pillContainer.children[0].children[1];
		circleOutline.style.transition = "background-color 0.3s, color 0.3s";

		const icon = pillContainer.children[0].children[1];
		const iconColor = icon.style.color;
		pillContainer.onmouseover = () => {
			icon.style.backgroundColor = iconColor;
		};
		pillContainer.onmouseout = () => {
			icon.style.backgroundColor = "";
		};

		pillContainer.onclick = () => {
			if (idx !== openedAccordionIdx) {
				showAccordionContent(pillContainer);
				if (openedAccordionIdx !== null) {
					hideAccordionContent(pillsContainer[openedAccordionIdx]);
				}
				openedAccordionIdx = idx;
			} else {
				hideAccordionContent(pillContainer);
				openedAccordionIdx = null;
			}
		};
	});
}

let previousWidth = $(window).width();

$(window).on("resize", () => {
	let currentWidth = $(window).width();
	if (currentWidth !== previousWidth) {
		window.resizeTimeout = setTimeout(resetAccordion, 500);
		previousWidth = currentWidth;
	}
});

$(document).ready(() => {
	previousWidth = $(window).width();
	Accordion();
});
