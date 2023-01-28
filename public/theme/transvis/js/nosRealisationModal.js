import { Splide } from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css";
import { Video } from "@splidejs/splide-extension-video";

document.addEventListener("DOMContentLoaded", function () {
    let modal = document.querySelector("#modalYoutube-htmx");
    let cards = document.querySelectorAll(".cardNosRealisations");
    let body = document.querySelector("body");
    handleModal(cards, modal, body);
    modal.addEventListener("htmx:load", function () {
        initCarousel(modal.querySelector("#carouselSlider"), modal);
        closeModal(modal, body);
    });
});

const handleModal = (cards, modal, body) => {
    cards.forEach(function (card) {
        let playButton = card.querySelector(".play-video");
        let seeMoreButton = card.querySelector(".btn-link-more");
        let buttons = [playButton, seeMoreButton];
        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                openModal(modal, body);
            });
            button.addEventListener("touchend", function () {
                openModal(modal, body);
            });
        });
    });
};

const openModal = (modal, body) => {
    let splideDiv = modal.querySelector("#logoSliderModal");

    if (hasVideo(modal)) {
        // init logo slider
        initLogoSlider(splideDiv, modal);
        modal.style.display = "flex";
        body.style.overflow = "hidden";
        modal.style.zIndex = "10000";
    }
};

const initCarousel = (carouselDiv, modal) => {
    if (modal.dataset.alreadyOpened === "true") {
        //    return;
    }
    if (carouselDiv.classList.contains("is-active")) {
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
            1200: {
                perPage: 1,
                gap: "1rem",
            },
            640: {
                perPage: 1,
                gap: "5rem",
            },
        },
    });
    carousel.mount({ Video });

    setInnerCarouselSize(carouselDiv);

    carousel.on("move", function () {
        pauseVideo(carouselDiv);
    });
};

const setInnerCarouselSize = (carouselDiv) => {
    let carouselItems = carouselDiv.querySelectorAll(".splide__slide");

    carouselItems.forEach(function (item) {
        item.style.height = 450 + "px";
    });
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
        modal.querySelector("#htmx-result").innerHTML = `<div class="">
        <div class="modalHeader row justify-content-center align-items-center">
            <h1 class="text-center modalTitle col-11">
                CHARGEMENT
            </h1>
            <button type="button" class="btn-close-modal">
               
            </button>
        </div>
    </div>
    <div class="modalBody mt-4">
        <div class="row justify-content-center">
            <div class="col-10">
                Le contenu est en cours de chargements ...
            </div>
        </div>
        <div class="video-player mt-4 d-flex justify-content-center align-items-center">
            <div class="col-10 video-player-inner">
                <div class="splide slider-slide col-12 col-md-12 col-xl-12" id="carouselSlider">
                    <div class="splide__track">
                        <ul class="splide__list">
                            <li class="splide__slide  d-flex align-items-center justify-content-center">
                                <img data-splide-lazy="{{ asset("images/Transvis800px.png.webp") }}" alt="logo transvis" class="img-responsive" style="object-fit: contain;">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center my-4">
            
        </div>
    </div>
</div>`;
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
