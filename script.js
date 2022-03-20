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
const InputStartBtn = document.getElementById('InputStartBtn')
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
  if (startBtn === 'InputStartBtn'){
    document.getElementById('InputGameArea').style.display = 'block'
    inputGame()
  } else if (startBtn === 'OnscreenStartBtn'){
    document.getElementById('onscreenArea').style.display = 'block'
  } else {
    document.querySelector('h3').style.display = 'block'
    keydownEvent()
  }
}

let guessedLetters = ''

// 5 boxes in a row
// the number of a row is `row${answerCount + 1}`
let boxesInRow = document.getElementById(`row${answerCount + 1}`).children

// FOR INPUT EVENT
function inputGame(){
  if(!state) return

  let inputBox = document.querySelector('input')
  inputBox.addEventListener('keyup', function(e){
    guessedLetters = e.target.value //input formに入っているリアルタイムの文字列、 delete処理いらない

    // sync the input form value with the letters in cells
    if(e.key === 'Backspace'){
      // if the input form value's length is less than 5,
      // and the event key is 'backSpace',
      // delete matching letter in the cells
      if (guessedLetters.length < 5){
        console.log(guessedLetters)
        boxesInRow[howManyLetters -1].textContent = ''
        howManyLetters -= 1
        guessesArr[answerCount] = guessesArr[answerCount].slice(0, -1)
        console.log(guessesArr)
      }
      // show typed letters in the cells
    } else {
      if(howManyLetters < 5) {
        boxesInRow[howManyLetters].textContent = guessedLetters[howManyLetters]
        howManyLetters += 1
        guessesArr[answerCount] += e.key
      }
    }
  })



  document.getElementById('answerBtn').addEventListener('click', function(){
    // reset the letter index in rows so that you can move on to the next guess
    howManyLetters = 0;

    let answerInputArea = document.querySelector('input')

    // clear the input box automatically so as not to make the same answer by accident
      answerInputArea.value = ''
    // check the guess, parameter is the user's guess
      checkAnswer(guessesArr[answerCount], question)
    // how many times has the user guessed? + 1
      answerCount += 1

    // // when answerCount variable gets up to 6, function finish fires
    if (answerCount === 6){
      finish()
    }
  })
}





// function 




// FOR ONSCREEN KEYBOARD INPUT
const keys = document.getElementsByClassName('keys')
for (let key of keys){
  key.addEventListener('click', function(){
    if (key.dataset['letter'] === 'enter'){
      console.log('ENTER dayooooo')
    } else if (key.dataset['letter'] === 'backspace'){
      console.log('BACKSPACE dayooooo')
    } else {
      // 文字がアルファベットだった時の処理
    }
  })
}





// FOR KEYPRESS EVENT
function keydownEvent(){
  document.addEventListener('keydown',keyDown);
  function keyDown(e) {
      // if(!state) return;
      // Shiftキーが押されたら何もしないまま次へ
      if(e.keyCode === 16) {
          ;
      }else{
          // if(e.key === splitWord[0].textContent){
          //     splitWord[0].className = 'after-input';
          //     //　正解数＋１
          //     correct = correct + 1;
          //     correctText.text('正解数：' + correct);
          //     console.log('correct'+correct);
          //     // 正解したら次の文字へ行く
          //     splitWord.shift();
          //     if(!splitWord.length) createQuestion();
          // }else{
          // incorrect = incorrect + 1;
          // incorrectText.text('不正解数：' + incorrect);
          // console.log('incorrect'+incorrect);
          // }
          // console.log(e.key)
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
  console.log(question)
  // guessを一文字ずつcheck
  for (let i=0; i<guess.length; i++){
    // Is that letter included?
    if(!question.includes(guess[i])){
      console.log(boxesInRow[i].textContent)
      boxesInRow[i].style.backgroundColor = 'grey'
      boxesInRow[i].style.color = 'white'
    } else {
      // Is position correct?
      const indexOfLetterQuestion = question.indexOf(boxesInRow[i].textContent)
      console.log(i)
      if (indexOfLetterQuestion === i){
        boxesInRow[i].style.backgroundColor = 'green'
        boxesInRow[i].style.color = 'white'
      } else {
        boxesInRow[i].style.backgroundColor = 'yellow'
        boxesInRow[i].style.color = 'white'
      }
    }
  }
}

// FINISH
function finish(){
  console.log('finishhhhhh')
}