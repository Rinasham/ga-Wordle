// CHECK THE GUESS
// THIS FUNCTION IS CALLED EVERYTIME USER PRESS ENTER AT THE END OF EACH ROW

// parameter == user's guess (strings)



function checkAnswer(guess){


  // validation 後でコメントアウト戻す
//   console.log(guess.toUpperCase())
//   if (validWordsSet.has(guess.toUpperCase())){
//     console.log('そのワードあるよ')
//     checkLetters(guess)
//   } else {
//     // 画面にそんなワードは有効じゃないと表示させる
//     console.log('そのワードはありません')
//   }
checkLetters(guess)
}

// guess == aguessesArr[answerCount]
function checkLetters(guess){
  // 5 boxes in a row
  // the index of a row is `row${answerCount + 1}`(it starts from 1, not 0)
  let boxesInRow = document.getElementById(`row${answerCount + 1}`).children
  // get all keys in onscreen keyboard
  const screenKeys = document.getElementsByClassName('keys')
  console.log(guess) //capital
  console.log(screenKeys[0].textContent) // capital

  const correctLetters = []
  for (let letter of question){
    correctLetters.push(letter)
  }
  console.log(correctLetters)

  // guessを一文字ずつcheck
  function checkGreen(guess){
    for (let i=0; i<guess.length; i++){
      // Is position correct?
      if (question[i] === guess[i]){
        boxesInRow[i].style.backgroundColor = 'rgba(0,128,0,0.75)'
        boxesInRow[i].style.color = 'white'
        boxesInRow[i].classList.add('green')

        correctLetters.splice(i, 1, '')

        console.log(correctLetters)

        console.log(boxesInRow[i].textContent, guess[i])
        for (let key of screenKeys){
          // console.log(key.textContent)
          if(key.textContent === guess[i]){
            key.style.backgroundColor = 'rgba(0,128,0,0.75)'
            key.style.color = 'white'
            key.classList.add('greenKey')
          }
        }
      }
    }
  }

  checkGreen(guess)

  const correctLettersSet = new Set([...correctLetters])////////
  console.log(correctLettersSet)

  for (let i=0; i<guess.length; i++){
    if (boxesInRow[i].classList.contains('green')){
      ;
    } else if (!correctLettersSet.has(guess[i])){
        boxesInRow[i].style.backgroundColor = 'rgba(128,128,128,0.85)'
        boxesInRow[i].style.color = 'white'
        for (let key of screenKeys){
          if (key.textContent == guess[i]){
            key.style.backgroundColor = 'rgba(128,128,128,0.85)'
            key.style.color = 'white'
          }
        }
      } else {
        boxesInRow[i].style.backgroundColor = 'rgba(241,202,43,0.85)'
        boxesInRow[i].style.color = 'white'
        for (let key of screenKeys){
          if (key.textContent == guess[i]){
            key.style.backgroundColor = 'rgba(241,202,43,0.85)'
            key.style.color = 'white'
          }
        }
      }
// console.log(correctLettersSet)
//     for (let key of screenKeys){
//       if(key.classList.contains('greenKey')){
//         ;
//       }else{
//         if (!correctLettersSet.has(guess[i])){
//           key.style.backgroundColor = 'rgba(128,128,128,0.85)'
//           key.style.color = 'white'
//         } else {
//           key.style.backgroundColor = 'rgba(241,202,43,0.85)'
//           key.style.color = 'white'
//         }
//       }
//     }
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
