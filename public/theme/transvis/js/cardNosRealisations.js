document.addEventListener("DOMContentLoaded", function () {
    var cards = document.querySelectorAll(".cardOuterContainer");
    cards.forEach(function (card) {
        modal = card.querySelector(".modalYoutube");
        video = modal.querySelector("video");
        var time = card.dataset.timerecord;
            setTimeout(function () {
                captureImage(video, card);
                }, 250);
        video.currentTime = time;
    });
});

// Fonction qui permet de capturer l'image de la vidéo et de l'afficher dans la card
let captureImage = (video, card) => {
    let canvas = card.querySelector("#cardImage");
    if (canvas) {
        let context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/png");
    }else{
        return null;
    }
};

