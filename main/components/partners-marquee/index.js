$(window).on("load", () => setTimeout(() => {
  const firstItems = gsap.utils.toArray('.partner-showcase-item.first')
  const secondItems = gsap.utils.toArray('.partner-showcase-item.second')
  horizontalLoop(secondItems, { speed: 0.5 });
  horizontalLoop(firstItems, { reversed: true, speed: 0.5 });
}, 500))

