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
      } else if (e.code === 'Enter'){
        if(howManyLetters === 5){
          checkAnswer(guessesArr[answerCount])
          // 次の行に移動
          howManyLetters = 0

          // how many times has the user guessed? + 1
          answerCount += 1
          console.log(`Turn ${answerCount}`)

          if (answerCount === 6){
            prevStreak = 0
            finish('lose')
            // タイマーを止める
            // clearInterval(countdown)
          }
        } else {
          document.querySelector('h4').style.display = 'block'
        }
      }
  }
}