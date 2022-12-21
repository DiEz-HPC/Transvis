document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".superposition").forEach(function (element) {
        createImage(element);
    });
});

const createImage = (element) => {

    var images = element.querySelectorAll("img");

    var image1 = images[0];
    var image2 = images[1];
    var width = image1.width;
    var height = image1.height;

    // On crée un canvas
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    context.drawImage(image1, 0, 0, width, height);
    context.globalCompositeOperation = "destination-atop";
    context.drawImage(image2, 0, 0, width, height);
    // On crée une nouvelle image
    var image = new Image();
    // On définit la source de l'image
    image.src = canvas.toDataURL();
    // On supprime les images
    image1.remove();
    image2.remove();
    // On ajoute l'image au DOM
    element.appendChild(image);

    // On supprime la classe w-0
    element.classList.remove("d-none");
};
