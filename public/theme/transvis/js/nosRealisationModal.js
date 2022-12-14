import { Splide } from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { Video } from "@splidejs/splide-extension-video";
import "@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css";

document.addEventListener("DOMContentLoaded", function () {
    let modals = document.querySelectorAll(".modalYoutube");
    let cards = document.querySelectorAll(".cardNosRealisations");
    let body = document.querySelector("body");
    handleModal(cards, modals, body);
});

const handleModal = (cards, modals, body) => {
    cards.forEach(function (card) {
        let playButton = card.querySelector(".play-video");
        let seeMoreButton = card.querySelector(".btn-link-more");
        let nbDiv = card.dataset.loopIndex;
        let buttons = [playButton, seeMoreButton];
        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                openModal(modals, body, nbDiv);
            });
            button.addEventListener("touchend", function () {
                openModal(modals, body, nbDiv);
            });
        });
    });
};

const openModal = (modals, body, nbDiv) => {
    let modal = modals[nbDiv - 1];
    let splideDiv = modal.querySelector("#logoSliderModal");
    let carouselDiv = modal.querySelector("#carouselSlider");
    if (hasVideo(modal)) {
        // init carousel
        initCarousel(carouselDiv, modal);
        // init logo slider
        initLogoSlider(splideDiv, modal);
        modal.style.display = "flex";
        body.style.overflow = "hidden";
        modal.style.zIndex = "10000";
        closeModal(modal, body);
    }
};

const setLogoSizeSlider = (splideDiv) => {
    let logoSize = splideDiv.querySelectorAll(".splide__slide img");
    logoSize.forEach(function (logo) {
        logo.style.width = 125 + "px";
    });
};

const closeModal = (modal, body) => {
    let close = modal.querySelector(".btn-close-modal");
    let customEvent = new Event("modalClosed");
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.dispatchEvent(customEvent);
        }
    });
    close.addEventListener("click", function () {
        modal.dispatchEvent(customEvent);
    });

    modal.addEventListener("modalClosed", function () {
        stopVideo(modal);
        modal.style.display = "none";
        body.style.overflow = "auto";
        modal.dataset.alreadyOpened = true;
    });
};

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

const initLogoSlider = (splideDiv, modal) => {
    if (modal.dataset.alreadyOpened === "true") {
        return;
    }
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
    }).mount({ AutoScroll });
    setLogoSizeSlider(splideDiv);
};

const pauseVideo = (modal) => {
    let videoPlayer = modal.querySelector("video");
    if (videoPlayer) {
        videoPlayer.pause();
    }
};
const stopVideo = (modal) => {
    const videoPlayer = modal.querySelector("video");
    if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }
};

const initVideo = (modal) => {
    const videoPlayer = modal.querySelector("video");
    if (videoPlayer) {
        videoPlayer.addEventListener(
            "play",
            function () {
                console.log("video played");
                videoPlayer.currentTime = 0;
            },
            { once: true }
        );
        videoPlayer.play().then();
    }
};

const hasVideo = (modal) => {
    let videoPlayer = modal.querySelector("video");
    let imageNotFound = modal.querySelector("#imageNotFound");
    if (videoPlayer) {
        return true;
    } else if (!imageNotFound) {
        return true;
    }
    return false;
};
