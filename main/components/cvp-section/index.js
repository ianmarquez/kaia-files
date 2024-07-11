let openedTabIndex = 0;

function hideContent(content, header) {
	const hideTimeline = gsap.timeline();
	hideTimeline.timeScale(2);

	hideTimeline
		.to(content, { opacity: 0, y: -20, duration: 1 })
		.to(header, { color: "var(--greyscale--fg--subtlest)" }, "<");
}

function showContent(content, header) {
	const color = getComputedStyle(header).borderBottomColor;

	const showTimeline = gsap.timeline({
		onStart: function () {
			gsap.set(header, { clearProps: "color" });
		},
	});

	showTimeline.timeScale(2);

	showTimeline
		.from(content, {
			y: -20,
		})
		.to(
			content,
			{
				opacity: 1,
				y: 0,
				duration: 1,
			},
			"<"
		)
		.to(header, { color: color }, "<");
}

function CVPSection() {
	const cvpTabs = gsap.utils.toArray(".cvp-tab-div");
	const cvpContent = gsap.utils.toArray(".cvp-items");
	const [contentOne, contentTwo, contentThree] = cvpContent;
	const [tabOne, tabTwo, tabThree] = cvpTabs;

	showContent(contentOne, tabOne);
	hideContent(contentTwo, tabTwo);
	hideContent(contentThree, tabThree);

	cvpTabs.map((tab, idx) => {
		const color = getComputedStyle(tab).borderBottomColor;
		tab.onmouseover = () => {
			tab.style.color = color;
		};
		tab.onmouseout = () => {
			if (idx !== openedTabIndex) {
				tab.style.color = "var(--greyscale--fg--subtlest)";
			}
		};
		tab.onclick = () => {
			if (idx !== openedTabIndex) {
				showContent(cvpContent[idx], tab);
				hideContent(cvpContent[openedTabIndex], cvpTabs[openedTabIndex]);
				openedTabIndex = idx;
			}
		};
	});
}

$(window).on("resize", () => {
	CVPSection();
});
$(document).ready(CVPSection);
