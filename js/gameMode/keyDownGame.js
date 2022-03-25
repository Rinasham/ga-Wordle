// FOR KEYPRESS EVENT
function keydownEvent(){
  document.addEventListener('keydown',keyDown)

  function keyDown(e) {
      if(!state) return
      answerFlag = false
      document.querySelector('h4').style.display = 'none'
      let boxesInRow = document.getElementById(`row${answerCount + 1}`)
      if (e.code.startsWith('Key')){
        if(howManyLetters < 5) {
          boxesInRow.children[howManyLetters].textContent = e.key.toUpperCase()
          howManyLetters += 1
          let correctLetterGuess = e.key.toUpperCase()
          guessesArr[answerCount] += correctLetterGuess
          console.log(correctLetterGuess)
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
          console.log(answerFlag)

        // how many times has the user guessed? + 1
          answerCount += 1
          console.log(`Turn ${answerCount}`)
        
          if (answerCount === 6 && answerFlag == true){
            console.log(answerFlag)
            prevStreak = 0
            finish('lose')
          }
        } else {
          document.querySelector('h4').style.display = 'block'
        }
      }
  }
}