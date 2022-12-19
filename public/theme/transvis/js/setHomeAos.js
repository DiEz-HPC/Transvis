const setHomeAos = () => {
/* HOME NOS SAVOIR FAIRE */
document.getElementById('homeNSFteaser').querySelectorAll("[class^=article-], [class*= article-]").forEach(function (element, keys) {
    element.dataset.aos = "fade-up";
    element.dataset.aosDelay = 250 + (keys * 250);
});


/* HOME NOS VALEURS */
var count = 0;
document.getElementById('homeNosValeurs').querySelectorAll("[class^=article-], [class*= article-], [class^=superposition").forEach(function (element, keys) {
    // Les elements sont par groupe de 3 dans cette section
    if (keys % 3 == 0) {
        count++;
    }
    element.dataset.aos = "fade-up";
    element.dataset.aosDuration = 250 + (count * 250);
 });
}

setHomeAos();
AOS.refreshHard();
