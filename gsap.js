
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

  (function() {

    /* this one doesn't work in a linear fashion */
    let visionBlockOne = document.getElementById("vision-block-one");
    TweenMax.to(visionBlockOne, 3, { x: `+=${40}`, yoyo: true, repeat: -1 });
    TweenMax.to(visionBlockOne, 5, { y: `+=${70}`, yoyo: true, repeat: -1 });
    TweenMax.to(visionBlockOne, 3, { y: `+=${60}`, yoyo: true, repeat: -1 });
    TweenMax.to(visionBlockOne, 5, { x: `+=${50}`, yoyo: true, repeat: -1 });

    let visionBlockTwo = document.getElementById("vision-block-two");
    TweenMax.to(visionBlockTwo, 5, { x: `+=${50}`, yoyo: true, repeat: -1 });
    TweenMax.to(visionBlockTwo, 3, { y: `+=${60}`, yoyo: true, repeat: -1 });
    TweenMax.to(visionBlockTwo, 4, { y: `+=${30}`, yoyo: true, repeat: -1 });
    TweenMax.to(visionBlockTwo, 7, { x: `+=${40}`, yoyo: true, repeat: -1 });

    let visionBlockThree = document.getElementById("vision-block-three");
    TweenMax.to(visionBlockThree, 4, { x: `+=${40}`, yoyo: true, repeat: -1 });
    TweenMax.to(visionBlockThree, 5, { y: `+=${70}`, yoyo: true, repeat: -1 });
    TweenMax.to(visionBlockThree, 7, { y: `+=${50}`, yoyo: true, repeat: -1 });
    TweenMax.to(visionBlockThree, 5, { x: `+=${55}`, yoyo: true, repeat: -1 })

    let visionBlockFour = document.getElementById("vision-block-four");
    TweenMax.to(visionBlockFour, 8, { x: `+=${60}`, yoyo: true, repeat: -1 });
    TweenMax.to(visionBlockFour, 6, { y: `+=${40}`, yoyo: true, repeat: -1 });
    TweenMax.to(visionBlockFour, 5, { y: `+=${55}`, yoyo: true, repeat: -1 });
    TweenMax.to(visionBlockFour, 8, { x: `+=${49}`, yoyo: true, repeat: -1 })


    // Vision highlight category and change text while scrolling
    const categoriesAll = Array.from(document.querySelectorAll(".vision-category"));
    const headersAll = Array.from(document.querySelectorAll(".vision-text"));

    const categories = categoriesAll.slice(3);
    const headers = headersAll.slice(1);
    console.log(headers)
    console.log(categories)


    function makeItemActive(idx) {
      categories.forEach(category => {
        category.classList.remove("vision-category-active");
      });
      categories[idx]?.classList.add("vision-category-active");


      headers.forEach(header => {
        header.classList.remove("vision-text-active");
      });
      headers[idx]?.classList.add("vision-text-active");

    };

    makeItemActive(0);

    categories.forEach((category, idx) => {
      ScrollTrigger.create({
        trigger: category,
        start: "left center",
        end: "right center",
        markers: true,
        onToggle: (self) => {
          if (self.isActive) {
            makeItemActive(idx);
          }
        }
      });
    });


    /* const categories = document.getElementsByClassName("vision-mobile-category-container");
    const header = document.getElementsByClassName("vision-text");
    
        categories.forEach(category => {
          ScrollTrigger.create({
            trigger: category,
            start: "left center",
            end: "right center",
            onEnter: () => {
    //          header.textContent = category.getAttribute("data-header");
            header.textContent = "Test"
            },
            onLeaveBack: () => {
              // Optionally reset the header text or handle differently when scrolling back
              header.textContent = category.previousElementSibling ? category.previousElementSibling.getAttribute("data-header") : "Default Header Text";
            }
          });
        });
    */
  })()
