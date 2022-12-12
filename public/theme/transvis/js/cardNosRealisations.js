window.addEventListener("load", function () {
    var cards = document.querySelectorAll(".cardOuterContainer");
    cards.forEach(function (card, index) {
        var isCaptured = card.dataset.iscaptured;
        if(isCaptured == 0 || isCaptured == '0') {
            setTimeout(function(){
                modal = card.querySelector(".modalYoutube");
                video = modal.querySelector("video");
                var time = card.dataset.timerecord;
                var loop = card.dataset.loopindex;
                video.addEventListener("seeked", function () {
                    captureImage(video, card, loop)
                }, {once : true});
                video.currentTime = time;
                card.dataset.iscaptured = 1;
            }, index * 400)
        }
    });
});

// Fonction qui permet de capturer l'image de la vidéo et de l'afficher dans la card
var captureImage = (video, card, loop) => {
    var canvas = card.querySelector("#cardImage"+ loop);
    if (canvas) {
        var context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/png");
    } else {
        return null;
    }
};
