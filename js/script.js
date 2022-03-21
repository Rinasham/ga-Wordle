const guessesArr = ['','','','','']

const questionsArr = ['quest', 'point', 'imply', 'agile', 'alloy']

// Boolean 'state' controls the acceptance of keypress
let state = false

// Variable for counting HOW MANY TIMES you answered
let answerCount = 0
let howManyLetters = 0

// set a question
const question = createQuestion()
console.log(`Question is ${question}`) // 後でコメントアウト


// start buttons variable
const startBtns = document.getElementsByClassName('startBtn')
const onscreenStartBtn = document.getElementById('OnscreenStartBtn')
const keyboardStartBtn = document.getElementById('KeyboardStartBtn')


// main
for (let startBtn of startBtns){
  startBtn.addEventListener('click', function(e){
    const whichBtn = e.target.id
    // parameter == which button was pressed to start
    startGame(whichBtn)
  })
}


// START GAME
function startGame(startBtn){
  // change screen
  // 後でコメントアウト　↓
  document.getElementById('gameArea').style.display = 'block'
  document.getElementById('startArea').style.display = 'none'
  // accept keypress
  state = !state
  if (startBtn === 'OnscreenStartBtn'){
    document.getElementById('onscreenArea').style.display = 'block'
    onScreen()
  } else {
    document.querySelector('h3').style.display = 'block'
    keydownEvent()
  }
}

// let guessedLetters = ''

// 5 boxes in a row
  // the number of a row is `row${answerCount + 1}`
  let boxesInRow = document.getElementById(`row${answerCount + 1}`).children










// FOR ONSCREEN KEYBOARD INPUT
function onScreen(){
  if(!state) return

  const keys = document.getElementsByClassName('keys')

  for (let key of keys){
    key.addEventListener('click', function(){

      document.querySelector('h4').style.display = 'none'
      let boxesInRow = document.getElementById(`row${answerCount + 1}`)

      if (key.dataset['letter'] === 'enter'){
        if(howManyLetters === 5){
          checkAnswer(guessesArr[answerCount])
          // 次の行に移動
          howManyLetters = 0
          // how many times has the user guessed? + 1
          answerCount += 1
          console.log(answerCount)
          if (answerCount === 6){
            finish()
            state = !state
          }
        } else {
          document.querySelector('h4').style.display = 'block'
        }
        // Backspace
      } else if (key.dataset['letter'] === 'backspace'){
        if (0 < howManyLetters.length < 5){
          boxesInRow.children[howManyLetters -1].textContent = ''
          howManyLetters -= 1
          guessesArr[answerCount] = guessesArr[answerCount].slice(0, -1)
          console.log(howManyLetters)
        }
      } else {
        // 文字がアルファベットだった時の処理
        if(howManyLetters < 5) {
          console.log(key.dataset['letter'])
          boxesInRow.children[howManyLetters].textContent = key.dataset['letter']
          howManyLetters += 1
          guessesArr[answerCount] += key.dataset['letter']
          console.log(guessesArr)
        }
      }
    })
  }
}






// FOR KEYPRESS EVENT
function keydownEvent(){
  document.addEventListener('keydown',keyDown)

  function keyDown(e) {
      if(!state) return
      document.querySelector('h4').style.display = 'none'
      let boxesInRow = document.getElementById(`row${answerCount + 1}`)
      if (e.code.startsWith('Key')){
        if(howManyLetters < 5) {
          // console.log(boxesInRow)
          boxesInRow.children[howManyLetters].textContent = e.key
          howManyLetters += 1
          guessesArr[answerCount] += e.key
        }
      } else if(e.key === 'Backspace'){
        if (0 < howManyLetters.length < 5){
          boxesInRow.children[howManyLetters -1].textContent = ''
          howManyLetters -= 1
          guessesArr[answerCount] = guessesArr[answerCount].slice(0, -1)
          console.log(howManyLetters)
        }
      } else if (e.code = 'Enter'){
        if(howManyLetters === 5){
          checkAnswer(guessesArr[answerCount])
          // 次の行に移動
          howManyLetters = 0
          // how many times has the user guessed? + 1
          answerCount += 1
          if (answerCount === 6){
            finish()
            state = !state
          }
        } else {
          document.querySelector('h4').style.display = 'block'
        }
      }
  }
}



function createQuestion(){
  let rnd = Math.floor(Math.random() * questionsArr.length);
  let question = questionsArr[rnd]
  return question
}



// CHECK THE GUESS
// parameter == user's guess (strings)
function checkAnswer(guess){
  // 5 boxes in a row
  // the number of a row is `row${answerCount + 1}`
  let boxesInRow = document.getElementById(`row${answerCount + 1}`).children

  // guessを一文字ずつcheck
  for (let i=0; i<guess.length; i++){
    // Is that letter included?
    if(!question.includes(guess[i])){
      boxesInRow[i].style.backgroundColor = 'grey'
      boxesInRow[i].style.color = 'white'
    } else {
      // Is position correct?
      if (question[i] === boxesInRow[i].textContent){
        boxesInRow[i].style.backgroundColor = 'green'
        boxesInRow[i].style.color = 'white'
        boxesInRow[i].classList.add('green')
      } else {
        boxesInRow[i].style.backgroundColor = 'yellow'
        boxesInRow[i].style.color = 'white'
      }
    }
    let correctAnswersNum = document.getElementsByClassName('green')
    if (correctAnswersNum.length === 5){
      finish()
    }
  }
}

// FINISH
function finish(){
  register()

  // show modal with results
  document.getElementById('modal-wrapper').style.display = 'block'
  document.getElementById('modal-wrapper').animate([{opacity: '0'}, {opacity: '1'}], 500)
}