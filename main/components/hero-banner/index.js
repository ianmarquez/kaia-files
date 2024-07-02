const heroBanner = () => {
  setTimeout(() => {

    var swiper = new Swiper(".hero-banner-swiper", {
      spaceBetween: 30,
      loop: true,
      autoplay: {
        pauseOnMouseEnter: true,
        delay: 5000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }, 200)
}


$(document).ready(heroBanner)
