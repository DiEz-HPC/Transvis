import * as AOS from 'aos';

const matchesEffect = [
    {
        selector: ".aos-up",
        data: "fade-up",
    },
    {
        selector: ".aos-down",
        data: "fade-down",
    },
    {
        selector: ".aos-left",
        data: "fade-left",
    },
    {
        selector: ".aos-right",
        data: "fade-right",
    },
];

const handleDuration = (element) => {
    // On récupère, dans la class, la valeur de la durée sous la forme "aos-duration-1000"
    var duration = element.classList.value.match(/aos-duration-\d+/g);
    if (duration) {
        element.dataset.aosDuration = duration[0].replace("aos-duration-", "");
    }
};

const handleDelay = (element) => {
    // On récupère, dans la class, la valeur du délai sous la forme "aos-delay-1000"
    var delay = element.classList.value.match(/aos-delay-\d+/g);
    if (delay) {
        element.dataset.aosDelay = delay[0].replace("aos-delay-", "");
    }
}

const handleOffset = (element) => {
    // On récupère, dans la class, la valeur de l'offset sous la forme "aos-offset-250"
    var offset = element.classList.value.match(/aos-offset-\d+/g);
    if (offset) {
        element.dataset.aosOffset = offset[0].replace("aos-offset-", "");
    }
}
const handleAOS = () => {
    matchesEffect.forEach((match) => {
        document.querySelectorAll(match.selector).forEach((element) => {
            element.dataset.aos = match.data;
            handleDuration(element);
            handleDelay(element);
            handleOffset(element);
        });
    });
    AOS.init();
}

const handleImageLoad = () => {
    document.querySelectorAll(".superposition").forEach((element) => {
        var images = element.querySelectorAll("img");
        if(images.length == 1) {
           element.classList.remove("d-none");
        }
    });
}


handleAOS();
handleImageLoad();