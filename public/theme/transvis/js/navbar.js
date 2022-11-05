document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded with JavaScript');
    toggleNavbar();
});

function toggleNavbar() {
    document.getElementById('burger-toggler').addEventListener('click', function() {
        document.getElementById('burgerMenu').classList.toggle('appears');
        if(document.getElementById('burgerMenu').classList.contains('appears')) {
            document.body.style.overflow = 'hidden !important';
            document.body.style.position = 'fixed';
            checkForDnone();
            toggleButton('open');
        }else{
            toggleButton('close');
            document.body.style.overflow = 'auto';
            document.body.style.position = 'relative';
        }
    });
}

function checkForDnone() {
    if(document.getElementById('burgerMenu').classList.contains('d-none')) {
        document.getElementById('burgerMenu').classList.remove('d-none');
    }
}


function toggleButton(status) {
    if(status == 'open') {
        document.getElementById('burger-toggler').classList.add('open');
    }else{
        document.getElementById('burger-toggler').classList.remove('open');
    }
}