AOS.init();

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.superposition').forEach(function (element) {
            createImage(element);
    });

});
var createImage = (element) => {
       var overlayImg = document.createElement('img');
        overlayImg.src = "{{ asset('images/bloc-contour.png') }}";
        element.appendChild(overlayImg);
}

