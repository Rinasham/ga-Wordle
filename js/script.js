
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
    showOnscreen()
    onScreen()
  } else if(startBtn === 'KeyboardStartBtn'){
    showKeydown()
    keydownEvent()
  } else {
    document.getElementById('timeLimit-wrapper').animate([{opacity: '0'}, {opacity: '1'}], 500)
    document.getElementById('timeLimit-wrapper').style.display = 'block'
    document.getElementById('time').focus()
    // accept Enter button to start a game after setting time limit
    document.addEventListener('keydown', StartTimerWithEnterBtn)
  }
}

const StartTimerWithEnterBtn = function(e){
  if(e.code === 'Enter'){
    if(!document.getElementById('time').value == ''){
      startTimeLimitMode()
      document.removeEventListener('keydown', StartTimerWithEnterBtn)
    }
  }
}



// -----------------------------------------------------

// show each game area

function showOnscreen(){
  document.getElementById('onscreenArea').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.getElementById('onscreenArea').style.display = 'block'
}

function showKeydown(){
  document.querySelector('h3').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.querySelector('h3').style.display = 'block'
  document.getElementById('onscreenArea').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.getElementById('onscreenArea').style.display = 'block'
}














