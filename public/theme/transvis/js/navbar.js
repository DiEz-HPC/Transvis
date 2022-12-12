document.addEventListener("DOMContentLoaded", function () {
    if (checkIfMobile()) {
        toggleMobileNavbar();
    } else {

        const initialNavbarHeight = document.querySelector("main").getBoundingClientRect().top;
        const initialLogoHeight = document.querySelector(".headerNavLogo").offsetHeight;
        hideOnScroll(initialNavbarHeight, initialLogoHeight);
    }
});

// Fonction qui vérifie si on est sur mobile ou non
var checkIfMobile = () => {
    return window.innerWidth < 768 ? true : false;
};

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

var checkForDnone = () => {
    if (document.getElementById("burgerMenu").classList.contains("d-none")) {
        document.getElementById("burgerMenu").classList.remove("d-none");
    }
};

var toggleButton = (status) => {
    if (status === "open") {
        document.getElementById("burger-toggler").classList.add("open");
    } else {
        document.getElementById("burger-toggler").classList.remove("open");
    }
};

var hideOnScroll = (initialNavbarHeight, initialLogoHeight) => {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        var header = document.querySelector("#burgerMenu");
        // On vérifie si on est sur la homePage
        var isHome = checkIfHomePage();
        // Si on scroll vers le haut
        if (prevScrollpos > currentScrollPos) {
            // On affiche la navbar
            setNavbarStyle(header, false);
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
    isTransparent,
    isTop = false,
    initialLogoHeight = 150
) => {
    var blackColor = getComputedStyle(document.documentElement).getPropertyValue("--dark-color");
    var whiteColor = getComputedStyle(document.documentElement).getPropertyValue("--light-color");
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
    if (isTransparent) {
        css.background = "transparent";
        css.boxShadow = "none";
        css.backdropFilter = "none";
        css.webkitBackdropFilter = "none";
    }
    if (!isTop) {
        document.querySelector(".headerNavLogo").style.height = "100px";
        document.querySelector(".headerNavLogo").style.width = "auto";
        document.querySelector(".headerNavLogo").style.marginTop = "0px";
        
    } else {
        document.querySelector(".headerNavLogo").style.height = initialLogoHeight + "px";
        document.querySelector(".headerNavLogo").style.marginTop = "25px";
        css.padding = "0";
    }
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
    // Si l'utilisateur est en haut de la page alors on enleve le blur effect
    if (window.pageYOffset === 0) {
        setNavbarStyle(
            document.querySelector("#burgerMenu"),
            true,
            true,
            initialLogoHeight
        );
    }
};
