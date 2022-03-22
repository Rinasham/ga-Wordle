// CHECK THE GUESS
// THIS FUNCTION IS CALLED EVERYTIME USER PRESS ENTER AT THE END OF EACH ROW

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