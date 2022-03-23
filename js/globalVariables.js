const guessesArr = ['','','','','','']

const questionsArr = ['quest', 'point', 'imply', 'agile', 'alloy']

// Boolean 'state' controls the acceptance of keypress
let state = false

// current streak
let prevStreak = 0
let maxStreak = 0

// Variable for counting HOW MANY TIMES you answered
let answerCount = 0
let howManyLetters = 0



// start buttons variable
const startBtns = document.getElementsByClassName('startBtn')
const onscreenStartBtn = document.getElementById('OnscreenStartBtn')
const keyboardStartBtn = document.getElementById('KeyboardStartBtn')
const timeLimtStartBtn = document.getElementById('timeLimit-wrapper')


// set a question
const question = createQuestion()
console.log(`Question is ${question}`) // 後でコメントアウト

// 5 boxes in a row
  // the number of a row is `row${answerCount + 1}`
  let boxesInRow = document.getElementById(`row${answerCount + 1}`).children




// CREATE QUESTIONS
function createQuestion(){
  let rnd = Math.floor(Math.random() * questionsArr.length);
  let question = questionsArr[rnd]
  return question
}