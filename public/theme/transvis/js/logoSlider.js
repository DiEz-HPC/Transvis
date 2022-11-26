document.addEventListener("DOMContentLoaded", function () {
   const splideEl = document.querySelectorAll("#logoSlider");
    splideEl.forEach(function (splideDiv) {
        const splideObject = new Splide(splideDiv, {
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

        splideObject.mount(window.splide.Extensions);
        setLogoSize(splideObject);
    });
});

function setLogoSize(splideObject) {
  const splideDiv = splideObject.root;
  const sliderWidth = splideDiv.querySelector(".splide__slide").offsetWidth;
  const logoSize = splideDiv.querySelectorAll(".splide__slide img");
  logoSize.forEach(function (logo) {
    logo.style.width = sliderWidth / 2 + "px";
  });
}
