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

          if (answerCount === 6){
            prevStreak = 0
            finish('lose')
            state = !state
          }
        } else {
          document.querySelector('h4').style.display = 'block'
        }
                // how many times has the user guessed? + 1
                answerCount += 1
                console.log(`Turn ${answerCount}`)

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
          boxesInRow.children[howManyLetters].textContent = key.dataset['letter'].toUpperCase()
          howManyLetters += 1
          guessesArr[answerCount] += key.dataset['letter'].toUpperCase()
          console.log(guessesArr)
        }
      }
    })
  }
}