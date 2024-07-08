let partnerMarqueeStarted = false;
function PartnerMarquee() {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.partner-showcase-section',
      start: "top-=300 center",
      end: "top-=300 center",
      onEnter: () => {
        if (partnerMarqueeStarted) return
        const firstItems = gsap.utils.toArray('.partner-showcase-item.first')
        const secondItems = gsap.utils.toArray('.partner-showcase-item.second')
        horizontalLoop(secondItems, { speed: 0.5 });
        horizontalLoop(firstItems, { reversed: true, speed: 0.5 });
        partnerMarqueeStarted = !partnerMarqueeStarted
      }
    },
  });
}
$(window).on("load", PartnerMarquee)

