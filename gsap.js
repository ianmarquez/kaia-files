
// Begin Word Rotation Animation
(function() {
  const stagger = 1;
  const tl = gsap.timeline({
    repeat: -1,
  });

  tl.from('.word-rotation-list li', {
    y: 120,
    opacity: 0,
    stagger: stagger
  })

  tl.to('.word-rotation-list li', {
    y: -120,
    opacity: 0,
    stagger: stagger
  }, stagger)
})()
// End Word Rotation Animation
