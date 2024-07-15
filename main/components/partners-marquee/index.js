let partnerMarqueeStarted = false;
let partnerMarqueeScrollTrigger;

function resetMarquee() {
	if (partnerMarqueeScrollTrigger) {
		partnerMarqueeScrollTrigger.kill();
	}

	gsap.killTweensOf(".partner-showcase-item");
	gsap.set(".partner-showcase-item", { clearProps: "all" }); // Reset the items' properties

	partnerMarqueeStarted = false;
	PartnerMarquee();
}

function PartnerMarquee() {
	if (partnerMarqueeStarted) return;

	const firstItems = gsap.utils.toArray(".partner-showcase-item.first");
	const secondItems = gsap.utils.toArray(".partner-showcase-item.second");

	horizontalLoop(secondItems, { speed: 0.5 });
	horizontalLoop(firstItems, { reversed: true, speed: 0.5 });

	partnerMarqueeScrollTrigger = gsap.timeline({
		scrollTrigger: {
			trigger: ".partner-showcase-section",
			start: "top-=300 center",
			end: "top-=300 center",
			onEnter: () => {
				partnerMarqueeStarted = true;
			},
		},
	});
}

let previousWidth = $(window).width();

$(window).on("resize", () => {
	clearTimeout(window.resizeTimeout);

	let currentWidth = $(window).width();
	if (currentWidth !== previousWidth) {
		window.resizeTimeout = setTimeout(resetMarquee, 200);
		resetMarquee();
		previousWidth = currentWidth;
	}
});

$(document).ready(() => {
	previousWidth = $(window).width();
	clearTimeout(window.resizeTimeout);
	window.resizeTimeout = setTimeout(PartnerMarquee, 200);
});
