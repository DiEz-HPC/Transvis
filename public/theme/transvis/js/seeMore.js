addEventListener("DOMContentLoaded", function () {
    reduceText();
});

let reduceText = () => {
    let motivationsContainer = document.querySelectorAll(".card-body");
    motivationsContainer.forEach(function (motivationContainer, index) {
        // On selectionne le premier paragraphe de la card
        motivationParagraphe = motivationContainer.querySelector(".candidature");
        
        // On véfifie si est plus long que 500 caractères
        if (motivationParagraphe && motivationParagraphe.innerText.length > 500) {
            // On récupère le texte
            let text = motivationParagraphe.innerText;
            // On réduit le texte
            motivationParagraphe.innerText = text.substring(0, 500) + "...";

            setHiddenText(motivationContainer, index, text);
            createReadMoreLink(motivationContainer, index);
        }
    });
};

let setHiddenText = (element, index, text) => {
    // On crée un paragraphe
    let moreText = document.createElement("p");
    moreText.classList.add("moreText", "d-none");
    moreText.id = "hiddenText" + index;
    // On ajoute le texte
    moreText.innerText = text;
    // On ajoute l'élément
    element.appendChild(moreText);
};

let createReadMoreLink = (element, index) => {
    let readMoreLink = document.createElement("a");
    // On ajoute une icone
    let moreTextIcon = document.createElement("i");
    moreTextIcon.classList.add("fas", "fa-caret-down");
    // On saute une ligne avant le lien
    element.appendChild(document.createElement("br"));

    readMoreLink.classList.add("readMore", "text-center");
    readMoreLink.id = "readMore" + index;
    readMoreLink.innerText = "Lire la suite";
    readMoreLink.setAttribute("href", "#");
    readMoreLink.addEventListener("click", function (e) {
        e.preventDefault();
        toggleText(index);
    });
    readMoreLink.appendChild(moreTextIcon);
    element.appendChild(readMoreLink);
};


let toggleText = (index) => {
    let moreText = document.getElementById("hiddenText" + index);
    moreText.classList.toggle("d-none");
    let readMore = document.getElementById("readMore" + index);
    if (moreText.classList.contains("d-none")) {
        readMore.innerText = "Lire la suite";
        let moreTextIcon = document.createElement("i");
        moreTextIcon.classList.add("fas", "fa-caret-down");
        readMore.appendChild(moreTextIcon);
    } else {
        readMore.innerText = "Lire moins";
        let moreTextIcon = document.createElement("i");
        moreTextIcon.classList.add("fas", "fa-caret-up");
        readMore.appendChild(moreTextIcon);
    }
};
