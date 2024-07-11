function OnChainNumbers() {
	console.log("dsada");
	function randomIntFromInterval(min, max) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	const headings = gsap.utils.toArray(".onchain-heading");
	const imageContainers = gsap.utils.toArray(".onchain-image-container");
	const MAPPING = [
		"market_cap",
		"transaction_per_sec",
		"average_block_time",
		"average_tx_per_block",
	];

	$.ajax({
		url: "https://klaytn.foundation/wp-json/klaytn/v1/main",
	}).done(function (response) {
		console.log(response);
		headings.map((heading, headingIdx) => {
			let content = response[MAPPING[headingIdx]];
			if (MAPPING[headingIdx] === "market_cap") {
				content = (Math.abs(Number(content)) / 1.0e6).toFixed(2) + "M";
			}
			const loadingIndicators = gsap.utils.toArray(".loading-spinner");
			loadingIndicators.forEach((indicator) => indicator.remove());

			heading.style.display = "block";
			gsap.to(heading, {
				scrollTrigger: heading,
				innerText: content,
				duration: 5,
				snap: {
					innerText: 1,
				},
			});
		});
	});

	imageContainers.map((imageContainer) => {
		const imageTimeline = gsap.timeline({});
		imageTimeline.to(imageContainer.children, {
			opacity: 1,
			ease: "power3.out",
			stagger: randomIntFromInterval(5, 8),
			repeat: -1,
			yoyo: true,
		});
	});
}

$(document).ready(OnChainNumbers);
