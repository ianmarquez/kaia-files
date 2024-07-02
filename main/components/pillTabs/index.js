const pillTabs = () => {
	//  convert px to rem
	const remToPx = (rem) => {
		const px = rem * 16;
		return px;
	};

	const pillTabs = $(".pill-container")[0].children;
	const pillTabsArr = gsap.utils.toArray(pillTabs);
	let openTab = 0;

	pillTabsArr.forEach((pillTab, idx) => {
		const pill = pillTab.children[0];
		const pillContent = pillTab.children[1];
		if (idx !== openTab) {
			gsap.to(`.${pill.classList[1]} .minus-vertical-icon`, {
				transform: "rotate(90deg)",
			});
		}

		$(pill).on("click", () => {
			const tl = gsap.timeline();

			if (idx !== openTab) {
				// icons animation
				tl.to(
					`.${pillTabsArr[openTab].children[0].classList[1]} .minus-vertical-icon`,
					{
						transform: "rotate(90deg)",
					}
				);
				tl.to(
					`.${pill.classList[1]} .minus-vertical-icon`,
					{
						transform: "rotate(0deg)",
					},
					"<"
				);

				// close the current tab
				tl.to(
					pillTabsArr[openTab],
					{
						width: remToPx(10),
					},
					"<"
				);
				tl.to(
					pillTabsArr[openTab].children[1],
					{
						opacity: 0,
					},
					"<"
				);

				// open the clicked tab
				tl.to(pillTab, {
					width: "100%",
				});
				tl.to(
					pillContent,
					{
						opacity: 1,
					},
					"<"
				);

				openTab = idx;
			}
		});
	});
};

$(document).ready(pillTabs);
