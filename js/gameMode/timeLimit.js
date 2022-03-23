const timeLimitModeStartBtn = document.getElementById('timeLimitModeStartBtn')

// user sets time with input box
let TIME = 0

// this flag is for stopping timer(stop setInterval)
let timerFlag = false


function startTimer(){
  const timer = document.getElementById('timer')
  timerFlag = !timerFlag
  const countdown = setInterval(function() {
    timer.textContent = --TIME + ' SECONDS'
    if(TIME <= 0 || timerFlag == false) {
        clearInterval(countdown)
        finish('lose')
    }
  }, 1000)
}




// --------------------------------------------------------------



timeLimitModeStartBtn.addEventListener('click', function() {
  startTimeLimitMode()
})

function startTimeLimitMode(){
  TIME = parseInt(document.getElementById('time').value) + 1 // number(seconds) from input box
  document.getElementById('timeLimit-wrapper').style.display = 'none'
  showKeydown()
  keydownEvent()
  startTimer()
}