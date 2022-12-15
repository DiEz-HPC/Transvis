window.addEventListener("load", function () {
    const cards = document.querySelectorAll(".cardOuterContainer");
    cards.forEach(function (card, index) {
        const isCaptured = card.dataset.iscaptured;
        if(isCaptured === '0') {
            setTimeout(function(){
                modal = card.querySelector(".modalYoutube");
                const video = modal.querySelector("video");
                const time = card.dataset.timerecord;
                const loop = card.dataset.loopindex;
                video.addEventListener("seeked", function () {
                    captureImage(video, card, loop)
                }, {once : true});
                video.currentTime = parseInt(time);
                const capt = 1;
                card.dataset.iscaptured = capt.toString();
            }, index * 400)
        }
    });
});

// Fonction qui permet de capturer l'image de la vidéo et de l'afficher dans la card
const captureImage = (video, card, loop) => {
    const canvas = card.querySelector("#cardImage"+ loop);
    if (canvas) {
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/png");
    } else {
        return null;
    }
};
