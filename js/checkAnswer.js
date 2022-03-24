// CHECK THE GUESS
// THIS FUNCTION IS CALLED EVERYTIME USER PRESS ENTER AT THE END OF EACH ROW

// parameter == user's guess (strings)



function checkAnswer(guess){


  // validation
  console.log(guess.toUpperCase())
  if (validWordsSet.has(guess.toUpperCase())){
    console.log('そのワードあるよ')
    checkLetters(guess)
  } else {
    // 画面にそんなワードは有効じゃないと表示させる
    console.log('そのワードはありません')
  }
}

function checkLetters(guess){
  // 5 boxes in a row
  // the index of a row is `row${answerCount + 1}`(it starts from 1, not 0)
  let boxesInRow = document.getElementById(`row${answerCount + 1}`).children
  // get all keys in onscreen keyboard
  const screenKeys = document.getElementsByClassName('keys')

  // guessを一文字ずつcheck
  for (let i=0; i<guess.length; i++){
    // Is that letter included?
    if(!question.includes(guess[i])){
      boxesInRow[i].style.backgroundColor = 'rgba(128,128,128,0.85)'
      boxesInRow[i].style.color = 'white'
      for (let key of screenKeys){
        if(key.textContent === guess[i].toUpperCase()){
          key.style.backgroundColor = 'rgba(128,128,128,0.85)'
          key.style.color = 'white'
        }
      }
    } else {
      // Is position correct?
      if (question[i] === boxesInRow[i].textContent){
        boxesInRow[i].style.backgroundColor = 'rgba(0,128,0,0.75)'
        boxesInRow[i].style.color = 'white'
        boxesInRow[i].classList.add('green')
        // console.log(boxesInRow[i])
        for (let key of screenKeys){
          // console.log(key.textContent)
          if(key.textContent === guess[i].toUpperCase()){
            key.style.backgroundColor = 'rgba(0,128,0,0.75)'
            key.style.color = 'white'
          }
        }
      } else {
        // if(boxesInRow[i].classList.contains('green') == true){
        //   boxesInRow[i].classList.remove('green')
        // }
        boxesInRow[i].style.backgroundColor = 'rgba(241,202,43,0.85)'
        boxesInRow[i].style.color = 'white'
        for (let key of screenKeys){
          if(key.textContent === guess[i].toUpperCase()){
            // console.log(key.style.backgroundColor)
            if(key.style.backgroundColor === 'rgba(128,128,128,0.85)' || !key.style.backgroundColor){
              key.style.backgroundColor = 'rgba(241,202,43,0.85)'
              key.style.color = 'white'
            }
          }
        }
      }
    }
    // console.log(boxesInRow[i])
  }
  let correctAnswersNum = document.getElementsByClassName('green')
  if (correctAnswersNum.length === 5){
    timerFlag = !timerFlag
    prevStreak += 1
    finish('win')
  } else {
    for(let i=0; i<guess.length; i++){
      boxesInRow[i].classList.remove('green')
    }
  }
}