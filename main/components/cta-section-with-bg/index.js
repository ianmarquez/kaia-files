function CTASectionWithBG() {
  const backgroundBlocks = gsap.utils.toArray('.background-blocks')
  const tlCan = gsap.timeline({ repeat: -1, yoyo: true });
  tlCan
    .to(backgroundBlocks, 3, { y: '-=5', x: '+=5', ease: Power1.easeInOut, stagger: 0.5 })
    .to(backgroundBlocks, 2, { y: '+=5', x: '-=5', ease: Power1.easeInOut, stagger: 0.5 })
    .to(backgroundBlocks, 3, { y: '-=5', ease: Power1.easeInOut, stagger: 0.5 })
    .to(backgroundBlocks, 3, { y: '+=5', ease: Power1.easeInOut, stagger: 0.5 })
}


$(document).ready(CTASectionWithBG);
