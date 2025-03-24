// BONUS DELIVERABLES js file
const characterBar = document.getElementById('character-bar');
const detailedInfo = document.getElementById('detailed-info');
const characterName = document.getElementById('name');
const characterImage = document.getElementById('image');
const voteCount = document.getElementById('vote-count');
const votesForm = document.getElementById('votes-form');
const resetBtn = document.getElementById('reset-btn');
const characterForm = document.getElementById('character-form');
const imageUrl = document.getElementById('image-url')
const characterInput = document.getElementById('add-character')
const newName = document.getElementById('name2')

let characters = [];
let currentCharacter = null;

function fetchCharacters() {
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(data => {
      characters = data;
      displayCharacters(data);
    })
    .catch(error => console.error('Error fetching characters:', error));
}


function displayCharacters(characters) {
  characterBar.innerHTML = '';
  characters.forEach(character => {
    const span = document.createElement('span');
    span.textContent = character.name;
    span.classList.add('character-item');
    span.dataset.id = character.id;
    
    span.addEventListener('click', () => 
      {
        currentCharacter = character;
        characterName.textContent = character.name;
        characterImage.src = character.image;
        characterImage.alt = character.name;
        voteCount.textContent = character.votes;
      }
    );
    
    characterBar.appendChild(span);
  });
}

function addVotes(event) {
  event.preventDefault();
  
  if (!currentCharacter) return;
  
  const votesInput = document.getElementById('votes');
  const additionalVotes = parseInt(votesInput.value);
  currentCharacter.votes += additionalVotes;
  voteCount.textContent = currentCharacter.votes;
  votesInput.value = '';
}


function resetVotes() {
  if (!currentCharacter) return;
  
  currentCharacter.votes = 0;
  voteCount.textContent = 0;
}

const characterDetails = {
  name: newName.value,
  image: imageUrl.value,
  votes: 0
}

function addCharacters(){
    fetch('http://localhost:3000/characters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(characterDetails)
    })
    .catch(error => console.error(error))


  characterInput.addEventListener('click', ()=>{
    const newSpan = document.createElement('span')
    const characterImage = document.createElement('img')
    newSpan.textContent = newName.value
    characterImage.src = imageUrl.value
    
    characterBar.appendChild(newSpan)

  })
}

function initialize() {
  fetchCharacters('http://localhost:3000/characters')
  
  votesForm.addEventListener('submit', addVotes);
  resetBtn.addEventListener('click', resetVotes);
}


document.addEventListener('DOMContentLoaded', initialize);