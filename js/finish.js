
// FINISH GAME AND CALL A FUNCTION THAT INSERTS DATA INTO DB


function finish(result){
  state = !state

  // call function that insert data
  register(result)
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


// -----------------------------------------------------------------


// CALLED BY 'finish()'
function register(result){
  let turn = answerCount + 1
  let winOrLose = result
  insertData(turn, winOrLose)
}

