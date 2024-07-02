function OnChainNumbers() {
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const headings = gsap.utils.toArray(".onchain-heading")
  const imageContainers = gsap.utils.toArray(".onchain-image-container")
  const MAPPING = ['transaction_per_sec', 'market_cap', 'average_block_time', 'average_tx_per_block']

  $.ajax({
    url: "https://klaytn.foundation/wp-json/klaytn/v1/main",
  }).done(function(response) {
    headings.map((heading, headingIdx) => {
      let content = response[MAPPING[headingIdx]];
      if (headingIdx === 1) {
        content = (Math.abs(Number(content)) / 1.0e+6).toFixed(2) + "M"
      }
      heading.innerText = content

    })
  });

  imageContainers.map(imageContainer => {
    const imageTimeline = gsap.timeline({})
    imageTimeline.to(imageContainer.children, {
      opacity: 1,
      ease: "power3.out",
      stagger: randomIntFromInterval(5, 8),
      repeat: -1,
      yoyo: true
    })
  })

}


$(document).ready(OnChainNumbers);
