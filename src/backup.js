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

function displayCharactersDetails(character){
  characterName.textContent = character.name
  characterImage.image = character.image
  characterImage.alt = character.name
  voteCount.textContent = character.votes
}


function addCharacters(event){
  event.preventDefault()
  
  const name = newName.value
  const image = imageUrl.value  

  const characterDetails = {
    name: newName.value,
    image: imageUrl.value,
    votes: 0
  }

    fetch('http://localhost:3000/characters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(characterDetails)
    })
    .then(response => response.json())
    .then(data => {
      characters.push(data)
      displayCharacters(characters)
      displayCharactersDetails(data)
    })
    .catch(error => console.error(error))


    characterForm.reset()
}

function initialize() {
  fetchCharacters()

  votesForm.addEventListener('submit', addVotes);
  resetBtn.addEventListener('click', resetVotes);
  characterForm.addEventListener('submit', addCharacters)
}


document.addEventListener('DOMContentLoaded', initialize);