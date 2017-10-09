// <------   variables  ------>
const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startGameButton = document.querySelector('.main-container');
let missed = 0;

// <------   arrays   ------>
const phrases = ['I really appreciate', 'That sounds great', 'never mind', 'Thank you', 'Nice to meet you', 'Bored to death','Get foot in the door'];

// <------   functions   ------>

// get a random phrase from an array function
function getRandomPhraseAsArray(array) {
  let randomPhrase = array[Math.floor(Math.random() * array.length)]; // multiples with array's items count
  for (i = 0; i < randomPhrase.length; i += 1) {
    
  }
  randomPhrase.charAt();
}

// <------   events   ------>

// removes start screen overlay
startGameButton.addEventListener('click', (e)=> {
  if (e.target.className == 'btn__reset') {
    let div = document.getElementById('overlay')
    startGameButton.removeChild(div);
  }
});
