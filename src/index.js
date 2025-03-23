const characterBar = document.getElementById('character-bar');
const detailedInfo = document.getElementById('detailed-info');
const characterName = document.getElementById('name');
const characterImage = document.getElementById('image');
const voteCount = document.getElementById('vote-count');
const votesForm = document.getElementById('votes-form');
const resetBtn = document.getElementById('reset-btn');

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
    
    // Add click event to display character details
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

function initialize() {
  fetchCharacters();
  
  
  votesForm.addEventListener('submit', addVotes);
  resetBtn.addEventListener('click', resetVotes);
}


document.addEventListener('DOMContentLoaded', initialize);