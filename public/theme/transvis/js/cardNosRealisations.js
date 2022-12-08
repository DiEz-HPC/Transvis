document.addEventListener("DOMContentLoaded", function () {
    var cards = document.querySelectorAll(".cardOuterContainer");
    cards.forEach(function (card) {
        modal = card.querySelector(".modalYoutube");
        video = modal.querySelector("video");
        video.addEventListener('seeked', function(){
            canvas.width = 1920;
            canvas.height = 1080;
        
            let ctx = canvas.getContext('2d');
            ctx.drawImage( video, 0, 0, canvas.width, canvas.height );
        
            image = canvas.toDataURL('image/jpeg');
        });
        
        video.currentTime = 10;
       /* setTimeout(function () {
        captureImage(video, card);
        }, 250);*/
    });
});

// Fonction qui permet de capturer l'image de la vidéo et de l'afficher dans la card
let captureImage = (video, card) => {
    let canvas = card.querySelector("#cardImage");
    if (canvas) {
        let context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        video.currentTime = 0;
        return canvas.toDataURL("image/png");
    }else{
        return null;
    }
};

