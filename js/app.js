/*====================================
               ARRAYS
====================================*/
const phrases = [
'i really appreciate',
'that sounds great',
'never mind',
'thank you',
'nice to meet you',
'bored to death',
'get foot in the door',
'excellent',
'nicely done',
'awesome',
'nice job'
];

/*====================================
              VARIABLES
====================================*/
let lostHeart = 5;
let missed = 0;
const keyboard = document.querySelector('#qwerty');
const keyboardButton = keyboard.querySelectorAll('button')
const phrase = document.querySelector('#phrase');
const mainContainer = document.querySelector('.main-container');
const ul = document.querySelector('#phrase ul');
const listItems = ul.children;
const scoreBoard = document.querySelector('#scoreboardList');
const scoreboardList = scoreBoard.children;
const phraseArray = getRandomPhraseAsArray(phrases);
const div = document.createElement('div');
const heading = document.createElement('h1');
const playAgainButton = document.createElement('button');

/*====================================
               FUNCTIONS
====================================*/
// get a random phrase from an array function
function getRandomPhraseAsArray(array) {
  let randomPhrase = array[Math.floor(Math.random() * array.length)]; // gets random phrase from array
  let separateCharacters = []; // stores separate characters in an array
  for (i = 0; i < randomPhrase.length; i += 1) {
    separateCharacters.push(randomPhrase.charAt(i));
  }
  return separateCharacters;
}

// set  game display function
function addPhraseToDisplay(arrayOfLetters) {
  for (i = 0; i < arrayOfLetters.length; i += 1) {
    let li = document.createElement('li');
    li.textContent = arrayOfLetters[i];
    ul.appendChild(li);
    if (li.textContent === " ") {
      li.classList.add('space')
    } else {
      li.classList.add('letter');
    }
  }
}

addPhraseToDisplay(phraseArray);

// check letters with clicked buttons

function checkLetter(clickedButton) {
  let li = document.querySelectorAll('.letter');
  let letterFound;
  for (i = 0; i < li.length; i += 1) {
    const letter = li[i]; // store all li items
    let letterTextContent = letter.textContent; // store text content from letter to letterTextContent
    if (clickedButton.textContent == letterTextContent) {
      letter.classList.add('show');
      letterFound = letter;
    }
  }
  if (letterFound) {
    console.log('You are right!');
    return letterFound;
  } else {
    return null;
  }
}

// function removes one heart each time missed += 1
function removeHeart(lostHeart) {
  scoreboardList[lostHeart].classList.remove('tries');
  scoreboardList[lostHeart].classList.add('lost__heart');
}

// function checks wether game is won or lost
function checkWin() {
  const liLetter = document.querySelectorAll('.letter');
  const liShow = document.querySelectorAll('.show');
  if (liLetter.length === liShow.length) {
    playAgain();
    heading.textContent = 'You won!';
    div.id = 'win';
    div.classList.add('win');
    console.log('won!');
  }
  if (missed == 5) {
    playAgain();
    heading.textContent = 'Sorry, you lost..';
    div.id = 'lose';
    div.classList.add('lose');
    console.log('Lost...');
  }
}

// function creates playAgain button and adds it to the win/lose screen
function playAgain() {
  playAgainButton.textContent = 'Play again?';
  playAgainButton.classList.add('play__again');
  mainContainer.appendChild(div);
  div.appendChild(heading);
  div.appendChild(playAgainButton);
}

// reset function
function reset(resetSelection) {
  resetSelection.innerHTML = '';
}

/*====================================
               EVENTS
====================================*/
// removes start screen overlay
mainContainer.addEventListener('click', (e)=> {
  if (e.target.className == 'btn__reset') {
    let div = document.getElementById('overlay');
    mainContainer.removeChild(div);
  }
});

// keyboard event listener
keyboard.addEventListener('click', (e)=> {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    button.classList.add('chosen');
    button.disabled = true;
    const checked = checkLetter(button);
    if (checked === null) {
      missed += 1;
      console.log('Better luck next time! ' + missed + ' wrong answer(s).');
      lostHeart -= 1;
      setTimeout(removeHeart(lostHeart), 2000);
    }
    checkWin();
  }
});

playAgainButton.addEventListener('click', (e)=> {
  if (e.target.className == 'play__again') {
    div.classList.remove('win', 'lose'); // resets classes to win/lose screen
    mainContainer.removeChild(div); // removes 'win' or 'lose' screen
    reset(ul) // removes random generated name (li) elements
    const phraseArrayNew =  getRandomPhraseAsArray(phrases); // adds new phrase
    addPhraseToDisplay(phraseArrayNew);
    for (i = 0; i < keyboardButton.length; i++) { // resets keyboard
      let keyboards = keyboardButton[i];
      if (keyboards.disabled === true) {
        keyboards.disabled = false;
        keyboards.classList.remove('chosen');
      }
    }
    missed = 0; // resets missed
    lostHeart = 5; // resets lostHeart
    if (scoreboardList) {
      reset(scoreBoard);
    }
    for (i = 0; i < 5; i++) { // adds 5 tries
      const li = document.createElement('li');
      li.classList.add('tries');
      scoreBoard.appendChild(li);
    }
  }
})
