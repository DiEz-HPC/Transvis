document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    type: "loop",
    drag: "free",
    focus: "center",
    perPage: 4,
    gap: 50,
    autoScroll: {
      speed: 1,
    },
    breakpoints: {
      1200: { perPage: 3, gap: "1rem" },
      640: { perPage: 2, gap: 0 },
    },
  });
  splide.mount(window.splide.Extensions);
  setLogoSize();
});

function setLogoSize() {
  var sliderWidth = document.querySelector(".splide__slide").offsetWidth;
  var logoSize = document.querySelectorAll(".splide__slide img");
  logoSize.forEach(function (logo) {
    logo.style.width = sliderWidth + "px";
  });
}
