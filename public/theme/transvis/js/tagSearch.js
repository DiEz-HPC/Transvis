document.addEventListener('DOMContentLoaded', function() {
    const tagList = document.getElementById('nosRealisationSection').dataset.recordsTag;
    // json to array
    const tagArray = JSON.parse(tagList);
    const words = tagArray
    const formEl = document.querySelector('#search')
    const dropEl = document.querySelector('.drop')
    let alreadyOpen = false
    const formHandler = (e) => {
        const userInput = e.target.value.toLowerCase()
    
        if(userInput.length === 0) {
            dropEl.style.height = 0
            return dropEl.innerHTML = ''              
        }
    
        const filteredWords = words.filter(word => word.toLowerCase().includes(userInput)).sort().splice(0, 5)
        
        dropEl.innerHTML = ''
        filteredWords.forEach(item => {
            const listEl = document.createElement('li')
            listEl.classList.add('tag-li')
            
            listEl.textContent = item
            dropEl.appendChild(listEl)
        })
    
        if(dropEl.children[0] === undefined) {
            return dropEl.style.height = 0
        }
    
        let totalChildrenHeight = dropEl.children[0].offsetHeight * filteredWords.length
        dropEl.style.height = totalChildrenHeight + 'px'
    
    }
 /*   
    formEl.addEventListener('pointerdown', (e) => {
        if(!alreadyOpen) {
        let randomWords = words.sort(() => Math.random() - 0.5).splice(0, 2)
        randomWords.push('Tapez votre recherche');
        randomWords.forEach(item => {
            const listEl = document.createElement('li')
            listEl.classList.add('tag-li')
            listEl.textContent = item
            dropEl.appendChild(listEl)
        });
        alreadyOpen = true
    }
    })*/

    formEl.addEventListener('input', formHandler)
});