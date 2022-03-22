const guessesArr = ['','','','','','']

const questionsArr = ['quest', 'point', 'imply', 'agile', 'alloy']

// Boolean 'state' controls the acceptance of keypress
let state = false

// Variable for counting HOW MANY TIMES you answered
let answerCount = 0
let howManyLetters = 0



// start buttons variable
const startBtns = document.getElementsByClassName('startBtn')
const onscreenStartBtn = document.getElementById('OnscreenStartBtn')
const keyboardStartBtn = document.getElementById('KeyboardStartBtn')


// set a question
const question = createQuestion()
console.log(`Question is ${question}`) // 後でコメントアウト

// main
function main () {
  answerCount = 0
  document.getElementById('gameArea').style.display = 'none'
  document.getElementById('onscreenArea').style.display = 'none'
  document.querySelector('h3').style.display = 'none'
  document.querySelector('h1').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.getElementById('author').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.getElementById('startArea').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.getElementById('startArea').style.display = 'flex'



  for (let startBtn of startBtns){
    startBtn.addEventListener('click', function(e){
      const whichBtn = e.target.id
      // parameter == which button was pressed to start
      startGame(whichBtn)
    })
  }
}

main()



// START GAME
function startGame(startBtn){
  // change screen
  // 後でコメントアウト　↓
  document.getElementById('gameArea').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.getElementById('gameArea').style.display = 'block'
  document.getElementById('author').style.display = 'none'
  document.getElementById('startArea').style.display = 'none'
  // accept keypress
  state = !state
  if (startBtn === 'OnscreenStartBtn'){
    document.getElementById('onscreenArea').animate([{opacity: '0'}, {opacity: '1'}], 500)
    document.getElementById('onscreenArea').style.display = 'block'
    onScreen()
  } else {
    document.querySelector('h3').animate([{opacity: '0'}, {opacity: '1'}], 500)
    document.querySelector('h3').style.display = 'block'
    document.getElementById('onscreenArea').animate([{opacity: '0'}, {opacity: '1'}], 500)
    document.getElementById('onscreenArea').style.display = 'block'
    keydownEvent()
  }
}



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
            finish('lose')
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
          boxesInRow.children[howManyLetters].textContent = e.key
          howManyLetters += 1
          guessesArr[answerCount] += e.key
        }
      } else if(e.key === 'Backspace'){
        if (0 < howManyLetters.length < 5){
          boxesInRow.children[howManyLetters -1].textContent = ''
          howManyLetters -= 1
          guessesArr[answerCount] = guessesArr[answerCount].slice(0, -1)
        }
      } else if (e.code = 'Enter'){
        if(howManyLetters === 5){
          checkAnswer(guessesArr[answerCount])
          // 次の行に移動
          howManyLetters = 0

          // how many times has the user guessed? + 1
          answerCount += 1
          console.log(`Turn ${answerCount}`)

          if (answerCount === 6){
            finish('lose')
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
  // the index of a row is `row${answerCount + 1}`(it starts from 1, not 0)
  let boxesInRow = document.getElementById(`row${answerCount + 1}`).children
  // get all keys in onscreen keyboard
  const screenKeys = document.getElementsByClassName('keys')


  // guessを一文字ずつcheck
  for (let i=0; i<guess.length; i++){
    // Is that letter included?
    if(!question.includes(guess[i])){
      boxesInRow[i].style.backgroundColor = 'grey'
      boxesInRow[i].style.color = 'white'
      for (let key of screenKeys){
        if(key.textContent === guess[i].toUpperCase()){
          console.log(key)
          key.style.backgroundColor = 'grey'
          key.style.color = 'white'
        }
      }
    } else {
      // Is position correct?
      if (question[i] === boxesInRow[i].textContent){
        boxesInRow[i].style.backgroundColor = 'green'
        boxesInRow[i].style.color = 'white'
        boxesInRow[i].classList.add('green')
        for (let key of screenKeys){
          // console.log(key.textContent)
          if(key.textContent === guess[i].toUpperCase()){
            key.style.backgroundColor = 'green'
            key.style.color = 'white'
          }
        }
      } else {
        boxesInRow[i].style.backgroundColor = '#f1ca2b'
        boxesInRow[i].style.color = 'white'
        for (let key of screenKeys){
          if(key.textContent === guess[i].toUpperCase()){
            console.log(key.style.backgroundColor)
            if(key.style.backgroundColor === 'grey' || !key.style.backgroundColor){
              key.style.backgroundColor = '#f1ca2b'
              key.style.color = 'white'
            }
          }
        }
      }
    }
    let correctAnswersNum = document.getElementsByClassName('green')
    if (correctAnswersNum.length === 5){
      finish('win')
    }
  }
}

// FINISH
function finish(result){
  state = !state

  register(result)
  getAllData(callback1)

  // show modal with results (that code is in indexedDB.js)

  // make the modal invisible when clicked
  document.getElementById('close-modal').addEventListener('click', function(){
    document.getElementById('modal-wrapper').animate([{opacity: '1'}, {opacity: '0'}], 500)
    setTimeout(fadeoutModal, 500)
    function fadeoutModal(){
      document.getElementById('modal-wrapper').style.display = 'none'
    }
    clearBoxes()
    // set question
    const question = createQuestion()
    console.log(`Question is ${question}`)

    // reset arr
    // guessesArr = ['','','','','']
    for (let i=0; i< guessesArr.length ; i++) {
      guessesArr[i] = ''
    }
    console.log(guessesArr)

    console.log(howManyLetters)
    // console.log(state)
    // clear answerCount
    answerCount = 0
    console.log(answerCount)
    function screenFadeOut(){
      let screen = document.body
      screen.animate([{opacity: '1'}, {opacity: '0'}], 500) // ~ 1000ms
    }
    setTimeout(screenFadeOut, 600) // ~ 1000ms
    function invisibleGameArea(){
      document.getElementById('gameArea').style.display = 'none'
      document.getElementById('onscreenArea').style.display = 'none'
      document.querySelector('h1').style.display = 'none'
      document.querySelector('h3').style.display = 'none'
    }
    setTimeout(invisibleGameArea, 1080) // ~ 1000ms
    function reload(){
      document.location.reload()
    }
    setTimeout(reload, 1200)
  })
}


// CLEAR TEXTCONTENTS IN ALL THE BOXES
function clearBoxes(){
  const boxes = document.querySelectorAll('.box')
  for (let box of boxes) {
    box.textContent = ''
    if (box.classList.contains('green')){
      box.classList.remove('green')
    }
    box.style.backgroundColor = 'white'
  }
}
