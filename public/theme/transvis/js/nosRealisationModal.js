document.addEventListener("DOMContentLoaded", function () {
    let modals = document.querySelectorAll(".modalYoutube");
    let cards = document.querySelectorAll(".cardNosRealisations");
    let body = document.querySelector("body");
    openModal(cards, modals, body);
});

const openModal = (cards, modals, body) => {
    cards.forEach(function (card) {
        let playButton = card.querySelector(".play-video");
        let seeMoreButton = card.querySelector(".btn-link-more");
        let nbDiv = card.dataset.loopIndex;
        let buttons = [playButton, seeMoreButton];
        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                let modal = modals[nbDiv - 1];
                let splideDiv = modal.querySelector("#logoSliderModal");
                let carouselDiv = modal.querySelector("#carouselSlider");
                // init carousel
                initCarousel(carouselDiv);
                // init logo slider
                initLogoSlider(splideDiv);
                modal.style.display = "flex";
                body.style.overflow = "hidden";
                pauseVideo(modal, false);
                closeModal(modal, body);
            });
        });
    });
};

const setLogoSizeSlider = (splideDiv) => {
    // A FAIRE \\
    let sliderWidth = splideDiv.querySelector(".splide__slide").offsetWidth;
    let logoSize = splideDiv.querySelectorAll(".splide__slide img");
    logoSize.forEach(function (logo) {
        logo.style.width = 125 + "px";
    });
};


const closeModal = (modal, body) => {
    let close = modal.querySelector(".btn-close-modal");
    modal.addEventListener("click", function (e) {
        if (e.target == modal) {
            pauseVideo(modal, true);
            modal.style.display = "none";
            body.style.overflow = "auto";
        }
    });
    close.addEventListener("click", function () {
        pauseVideo(modal, true);
        modal.style.display = "none";
        body.style.overflow = "auto";
    });
};

const initCarousel = (carouselDiv) => {
    let carousel = new Splide(carouselDiv, {
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
    carousel.mount();
    setInnerCarouselSize(carouselDiv);
};
const setInnerCarouselSize = (carouselDiv) => {
    let carouselItems = carouselDiv.querySelectorAll(".splide__slide");

    carouselItems.forEach(function (item) {
        item.style.height = 450 + "px";
    });
};

const initLogoSlider = (splideDiv) => {
    new Splide(splideDiv, {
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
    }).mount(window.splide.Extensions);
    setLogoSizeSlider(splideDiv);
};

const pauseVideo = (modal, wantStop) => {
    let videoPlayer = modal.querySelector("video");
    let arrowButton = modal.querySelectorAll(".splide__arrow");

    arrowButton.forEach(function (button) {
        button.addEventListener("click", function () {
            videoPlayer.pause();
            wantStop ? videoPlayer.currentTime = 0 : null;
        });
    });
};