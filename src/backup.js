const characterBar = document.getElementById('character-bar');

const apiUrl = "http://localhost:3000/characters";

function fetchAndRenderCharacters() {
    fetch(apiUrl)
        .then(response => response.json())
        .then((data) => characterInformation(data))
        .catch(err => {
            console.error(`Error ${err} occurred. Try next time.`);
        });
}

const detailedInfo = document.getElementById('detailed-info')
// detailedInfo.innerHTML = '';

function characterInformation(characters) {
    characters.forEach(character => {
        
        const charactersSpan = document.createElement('span');
        charactersSpan.textContent = character.name; 
        charactersSpan.dataset.id = character.id; 
        characterBar.appendChild(charactersSpan);

        const characterImage = document.createElement('img');
        characterImage.src = character.image;
        characterImage.classList.add('image-info');

        charactersSpan.addEventListener('click', () => {
            detailedInfo.appendChild(characterImage);
        
        });
    });

}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderCharacters();
});