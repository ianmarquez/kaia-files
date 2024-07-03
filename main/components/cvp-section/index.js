gsap.registerPlugin(ScrollTrigger);

function CVPSection() {
  const cvpContent = gsap.utils.toArray('.cvp-items')
  const cvpTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.cvp-section',
      scrub: 1,
      start: "left center",
      end: "right-=200 center",
    },
  });

  cvpContent.map((content, index) => {
    if (index > 0) {
      cvpTimeline.to(cvpContent[index - 1], {
        opacity: 0,
        duration: 200,
        x: 10
      }, "<")
    }
    cvpTimeline.to(content, {
      opacity: 100,
    })
  })
}


$(window).on("load", CVPSection)
