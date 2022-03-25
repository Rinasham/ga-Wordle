
// FINISH GAME AND CALL A FUNCTION THAT INSERTS DATA INTO DB


function finish(result){
  state = !state
  timerFlag = false

  // streak
  console.log(`streak is ${prevStreak}. Added 1 as you won this game.`)
  biggerThanMaxStreakOrNot()

  // call function that insert data
  register(result, prevStreak)
  // get past records and calculate winning rate, etc
  getAllData(callback1)

  // show modal with results (that code is in indexedDB.js)


  // make the modal invisible when clicked
  document.getElementById('close-modal').addEventListener('click', function(){
    document.getElementById('modal-wrapper').animate([{opacity: '1'}, {opacity: '0'}], 500)
    setTimeout(fadeoutModal, 500)
    restart()
  })

  // also able to close modal by clicking anywhere exccept the box area inside
  document.getElementById('modal-wrapper').addEventListener('click', function(){
    console.log(this)
    this.animate([{opacity: '1'}, {opacity: '0'}], 500)
    setTimeout(fadeoutModal, 500)
    restart()
    document.getElementById('modal-box').addEventListener('click', function(e){
      e.stopPropagation()
    })
  })
}

// ------------------------ functions to restart -------------------------


function fadeoutModal(){
  document.getElementById('modal-wrapper').style.display = 'none'
}


function restart(){
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
    setTimeout(displayNoneGameArea, 480 )
  }
  function displayNoneGameArea(){
    document.getElementById('gameArea').style.display = 'none'
    document.querySelector('h1').style.display = 'none'
    document.getElementById('onscreenArea').style.display = 'none'
    document.querySelector('h3').style.display = 'none'
  }
  setTimeout(invisibleGameArea, 500) // ~ 1000ms
  function reload(){
    document.location.reload()
  }
  setTimeout(reload, 550)
}


// -----------------------------------------------------------------


// CALLED BY 'finish()'
function register(result, streak){
  let turn = answerCount + 1
  let winOrLose = result
  let currentStreak = streak
  console.log(currentStreak)
  insertData(turn, winOrLose, currentStreak)
}

function biggerThanMaxStreakOrNot(){
  if (prevStreak > maxStreak){
    console.log('記録更新ですーー')
    maxStreak = prevStreak
    // console.log(maxStreak)
    insertStreak(prevStreak)
  } else {
    console.log('更新じゃないです')
  }
}

