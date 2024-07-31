function OnChainNumbers() {
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const headings = gsap.utils.toArray(".onchain-heading");
  const imageContainers = gsap.utils.toArray(".onchain-image-container");
  const MAPPING = [
    "marketcap",
    "total_transactions",
    "active_wallets",
    "active_contract_count",
  ];

  $.ajax({
    url: "https://api-homepage.kaia.io/analytics",
  }).done(function(response) {
    const responseData = response.data;
    function formatNumber(num, suffix = "") {
      return Number(num) + suffix;
    }

    headings.map((heading, headingIdx) => {
      let content = responseData[MAPPING[headingIdx]];
      let suffix = "";
      if (
        MAPPING[headingIdx] === "marketcap" ||
        MAPPING[headingIdx] === "total_transactions" ||
        MAPPING[headingIdx] === "active_wallets"
      ) {
        content = (Math.abs(Number(content)) / 1.0e6).toFixed(2);
        suffix = "M+";
      }
      if (MAPPING[headingIdx] === "active_contract_count") {
        content = (Number(content) / 1000).toFixed(2);
        suffix = "K+";
      }
      const loadingIndicators = gsap.utils.toArray(".loading-spinner");
      loadingIndicators.forEach((indicator) => indicator.remove());

      heading.style.display = "block";
      gsap.to(
        {
          value: 0,
        },
        {
          value: content,
          scrollTrigger: heading,
          duration: 5,
          snap: {
            value: 1,
          },
          onUpdate: function() {
            heading.innerHTML = formatNumber(this.targets()[0].value, suffix);
          },
        }
      );
    });
  });

  imageContainers.map((imageContainer) => {
    const imageTimeline = gsap.timeline({});
    imageTimeline.to(imageContainer.children, {
      opacity: 1,
      ease: "power3.out",
      // stagger: randomIntFromInterval(5, 8),
      repeat: -1,
      yoyo: true,
    });
  });
}

$(document).ready(OnChainNumbers);
