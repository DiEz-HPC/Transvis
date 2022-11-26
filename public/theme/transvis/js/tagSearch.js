document.addEventListener('DOMContentLoaded', function() {
    // On récupère la list des tags et slug
    const tagList = document.getElementById('buttonFilterContainer').dataset.recordsTag;
    const taxonomy = document.getElementById('buttonFilterContainer').dataset.recordsTaxonomies;



    // On parse en JSON
    const wordsArr = JSON.parse(tagList);
    const words = Object.keys(wordsArr);

    const formEl = document.querySelector('#search')
    const dropEl = document.querySelector('.drop')
    const seeAllEl = document.querySelector('#buttonSeeAll')

    const formHandler = (e) => {
        // On récupère la valeur du champ de recherche en minuscule
        const userInput = e.target.value.toLowerCase()

        // Si le contenu est vidé on cache la liste
        if(userInput.length === 0) {
            dropEl.style.height = 0
            return dropEl.innerHTML = ''
        }

        // On filtre les tags en fonction de la valeur du champ de recherche
        const filteredWords = words.filter(word => word.toLowerCase().includes(userInput)).sort().splice(0, 5)

        dropEl.innerHTML = ''

        // Pour chaque tag filtré on crée un élément li
        filteredWords.forEach(item => {
            const listEl = document.createElement('li')
            listEl.classList.add('tag-li')
            // On écoute le click sur l'élément li
            listEl.addEventListener('click', (e) => {
                // On récupère la valeur de l'élément li et on l'ajoute au champ de recherche
                formEl.value = e.target.innerText
                // On cache la liste
                dropEl.style.height = 0
                dropEl.innerHTML = ''

                // On récupère le slug du tag
                const slug = wordsArr[e.target.innerText]
                window.location.href = '/' + taxonomy + '/' + slug;
            })
            // On ajoute le tag au contenu de l'élément li
            listEl.textContent = item
            dropEl.appendChild(listEl)
        })

        // Si la recherche ne retourne aucun résultat on cache la liste
        if(dropEl.children[0] === undefined) {
            return dropEl.style.height = 0
        }

        // On gère la hauteur de la liste en fonction du nombre d'éléments
        let totalChildrenHeight = dropEl.children[0].offsetHeight * filteredWords.length
        dropEl.style.height = totalChildrenHeight + 'px'

    }

    const seeAllHandler = (e) => {
        // On récupere la valeurs du data attribute
        // On redirige vers la page du lien
        window.location.href = e.target.dataset.recordsAll
    }

    formEl.addEventListener('input', formHandler)

    seeAllEl.addEventListener('click', seeAllHandler)
});
