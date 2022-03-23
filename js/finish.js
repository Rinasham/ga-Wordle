
// FINISH GAME AND CALL A FUNCTION THAT INSERTS DATA INTO DB


function finish(result){
  state = !state

  // streak
  console.log(`streak is ${prevStreak}. Added 1 as you won this game.`)


  // call function that insert data
  register(result, prevStreak)
  // get past records and calculate winning rate, etc
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

    // clear answerCount
    answerCount = 0
    console.log(answerCount)
    function invisibleGameArea(){
      document.getElementById('gameArea').animate([{opacity: '1'}, {opacity: '0'}], 500)
      document.querySelector('h1').animate([{opacity: '1'}, {opacity: '0'}], 500)
      document.getElementById('onscreenArea').animate([{opacity: '1'}, {opacity: '0'}], 500)
      document.querySelector('h3').animate([{opacity: '1'}, {opacity: '0'}], 500)
    }
    setTimeout(invisibleGameArea, 680) // ~ 1000ms
    function reload(){
      document.location.reload()
    }
    setTimeout(reload, 800)
  })
}


// -----------------------------------------------------------------


// CALLED BY 'finish()'
function register(result, streak){
  let turn = answerCount + 1
  let winOrLose = result
  let currentStreak = streak
  insertData(turn, winOrLose, currentStreak)
}

