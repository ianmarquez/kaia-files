const heroBanner = () => {
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
}


$(document).ready(heroBanner)
