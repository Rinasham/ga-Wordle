const timeLimitModeStartBtn = document.getElementById('timeLimitModeStartBtn')

let TIME = 0



function startTimer(){
  const timer = document.getElementById('timer');
  const countdown = setInterval(function() {
    timer.textContent = --TIME + ' SECONDS';
    if(TIME <= 0) {
        clearInterval(countdown);
        finish();
    }
  }, 1000);
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