

let carouselDiv2 = document.querySelector("#carouselSlider");
let modal2 = document.querySelector("#modalYoutube-htmx");
console.log(carouselDiv2, modal2)
//initCarousel(carouselDiv2, modal2);

const initCarousel = (carouselDiv, modal) => {
    if (modal.dataset.alreadyOpened === "true") {
        return;
    }

    let carousel = new Splide(carouselDiv, {
        video: {
            loop: true,
            mute: true,
            autoplay: true,
            playerOptions: {
                htmlVideo: {
                    autoplay: true,
                    muted: true,
                    preload: "auto",
                },
            },
        },
        type: "loop",
        focus: "center",
        perPage: 1,
        gap: 50,
        lazyLoad: "nearby",
        autoplay: false,
        cover: true,
        height: 450 + "px",
        autoScroll: {
            speed: 0,
        },
        breakpoints: {
            1200: { perPage: 1, gap: "1rem" },
            640: { perPage: 1, gap: "5rem" },
        },
    });
    carousel.mount({ Video });

    setInnerCarouselSize(carouselDiv);

    carousel.on("move", function () {
        pauseVideo(carouselDiv);
    });

    modal.addEventListener("modalClosed", function () {
        carousel.go(0);
    });
};


const setInnerCarouselSize = (carouselDiv) => {
    let carouselItems = carouselDiv.querySelectorAll(".splide__slide");

    carouselItems.forEach(function (item) {
        item.style.height = 450 + "px";
    });
};