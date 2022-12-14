document.addEventListener("DOMContentLoaded", function () {
    if (checkIfMobile()) {
        toggleMobileNavbar();
    } else {
        // On sauvegarde la hauteur initial de la navbar et du logo pour les réutilisé
        const initialNavbarHeight = getOffset(document.querySelector("main")).top;
        const initialLogoHeight = document.querySelector(".headerNavLogo").offsetHeight;
        hideOnScroll(initialNavbarHeight, initialLogoHeight);
    }
});

// Fonction qui vérifie si on est sur mobile ou non
var checkIfMobile = () => {
    return window.innerWidth < 768 ? true : false;
};

// Fonction qui permet de récupérer la position d'un élément
var getOffset = ( el ) => {
    var _y = 0;
    while( el && !isNaN( el.offsetTop ) ) {
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y};
}
// Fonction qui permet d'ouvrir et fermé le menu burger
var toggleMobileNavbar = () => {
    const header = document.querySelector(".headerHaveProject");
    document
        .getElementById("burger-toggler")
        .addEventListener("click", function () {
            document.getElementById("burgerMenu").classList.toggle("appears");
            if (
                document
                    .getElementById("burgerMenu")
                    .classList.contains("appears")
            ) {
                if (header) {
                    header.style.zIndex = "0";
                }

                document.body.style.overflow = "hidden !important";
                document.body.style.position = "fixed";
                checkForDnone();
                toggleButton("open");
            } else {
                toggleButton("close");
                document.body.style.overflow = "auto";
                document.body.style.position = "relative";
                if (header) {
                    setTimeout(function () {
                        header.style.zIndex = "999";
                    }, 500);
                }
            }
        });
};

// Fonction qui vérifie si la classe contien d-none
var checkForDnone = () => {
    if (document.getElementById("burgerMenu").classList.contains("d-none")) {
        document.getElementById("burgerMenu").classList.remove("d-none");
    }
};

// Fonction qui permet de changer l'icone du burger
var toggleButton = (status) => {
    if (status === "open") {
        document.getElementById("burger-toggler").classList.add("open");
    } else {
        document.getElementById("burger-toggler").classList.remove("open");
    }
};

var hideOnScroll = (initialNavbarHeight, initialLogoHeight) => {
    // On récupère la position du scroll
    var prevScrollpos = window.pageYOffset;
    // On écoute le scroll
    window.onscroll = function () {
        // On récupère la nouvelle position du scroll
        var currentScrollPos = window.pageYOffset;
        // On récupère la navbar
        var header = document.querySelector("#burgerMenu");
        // On vérifie si on est sur la homePage
        var isHome = checkIfHomePage();
        // Si on scroll vers le haut
        if (prevScrollpos > currentScrollPos) {
            // On affiche la navbar
            setNavbarStyle(header);
            // Si on est sur la homePage on enlève le margin-top du main pour ne pas casser le header
            isHome ? setPageMargin(0) : setPageMargin(initialNavbarHeight);
            // On vérifie si l'utilisateur est en haut de la page
            handleScrollTop(initialLogoHeight);
        } else {
            // Sinon on scroll vers le bas
            // On enlève la navbar
            header.style.top = "-250px";
        }
        prevScrollpos = currentScrollPos;
    };
};

var setNavbarStyle = (
    navbar,
    isTop = false,
    initialLogoHeight = 150
) => {
    // On récupère les couleurs du thème
    var blackColor = getComputedStyle(document.documentElement).getPropertyValue("--dark-color");
    var whiteColor = getComputedStyle(document.documentElement).getPropertyValue("--light-color");
    // On définit le style de la navbar
    var css = {
        background: checkIfHomePage() ? blackColor : whiteColor,
        backdropFilter: "blur(6.8px)",
        webkitBackdropFilter: "blur(6.8px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: "9999",
        padding: "1rem 0",
    };
    // Si on est pas en haut de page on réduit la taille et la marge du logo
    if (!isTop) {
        document.querySelector(".headerNavLogo").style.height = "100px";
        document.querySelector(".headerNavLogo").style.width = "auto";
        document.querySelector(".headerNavLogo").style.marginTop = "0px";
    } else {
        // Sinon on remet la taille et la marge du logo à l'initial
        css.background = "transparent";
        css.boxShadow = "none";
        css.backdropFilter = "none";
        css.webkitBackdropFilter = "none";
        css.padding = "0";
        document.querySelector(".headerNavLogo").style.height = initialLogoHeight + "px";
        document.querySelector(".headerNavLogo").style.marginTop = "25px";
    }
    // On applique le style à la navbar
    for (var key in css) {
        navbar.style[key] = css[key];
    }
};

var checkIfHomePage = () => {
    // On vérifie si on est sur la homePage
    return document.querySelector("#homePageHeader") ? true : false;
};

var setPageMargin = (navbarHeight) => {
    // On attribue un margin-top au main pour compenser la navbar
    document.querySelector("main").style.marginTop = navbarHeight + "px";
};

var handleScrollTop = (initialLogoHeight) => {
    // Si l'utilisateur est en haut de la page alors on enleve le style custom
    if (window.pageYOffset === 0) {
        setNavbarStyle(
            document.querySelector("#burgerMenu"),
            true,
            initialLogoHeight
        );
    }
};
