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

const handleAOS = () => {
    matchesEffect.forEach((match) => {
        document.querySelectorAll(match.selector).forEach((element) => {
            element.dataset.aos = match.data;
            handleDuration(element);
            handleDelay(element);
        });
    });
    AOS.init();
}