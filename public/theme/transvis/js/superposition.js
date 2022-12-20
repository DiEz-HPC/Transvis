document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.superposition').forEach(function (element) {
       element.querySelectorAll('.w-0').forEach(function (element) {
        setTimeout(function () {
              element.classList.remove('w-0');
        }, 250);
         });
    });
});
