// CHECK THE GUESS
// THIS FUNCTION IS CALLED EVERYTIME USER PRESS ENTER AT THE END OF EACH ROW

// parameter == user's guess (strings)



function checkAnswer(guess){
  // validation 後でコメントアウト戻す
  console.log(guess.toUpperCase())
  if (validWordsSet.has(guess.toUpperCase())){
    console.log('そのワードあるよ')
    checkLetters(guess)
  } else {
    // 画面にそんなワードは有効じゃないと表示させる
    console.log('そのワードはありません')
  }
checkLetters(guess)
}

const correctLetters = []
const correctKeys = []

// guess == aguessesArr[answerCount]
function checkLetters(guess){
  // 5 boxes in a row
  // the index of a row is `row${answerCount + 1}`(it starts from 1, not 0)
  let boxesInRow = document.getElementById(`row${answerCount + 1}`).children
  // get all keys in onscreen keyboard
  const screenKeys = document.getElementsByClassName('keys')


  for (let letter of question){
    correctLetters.push(letter)
  }
  console.log(correctLetters)

  // guessを一文字ずつcheck
  function checkGreen(guess){
    for (let i=0; i<guess.length; i++){
      if(question[i] === guess[i]){
        correctKeys.push(guess[i])
      }
    }
  }

  // this Set contains characters in answer
  // but can have less characters than 5
  const correctLettersSet = new Set([...correctLetters])


  for (let i=0; i<guess.length; i++){
    checkGreen(guess)

// 正解の中に含まれているパターン
    if (correctLettersSet.has(guess[i])){
      if (question[i] === guess[i]){
        // ボックス緑
        boxesInRow[i].style.backgroundColor = 'rgba(0,128,0,0.75)'
        boxesInRow[i].style.color = 'white'
        boxesInRow[i].classList.add('green')
        correctLetters.splice(i, 1, '')
        // キーも緑
        for (let key of screenKeys){
          if(key.textContent === guess[i]){
            key.style.backgroundColor = 'rgba(0,128,0,0.75)'
            key.style.color = 'white'
            key.classList.add('greenKey')
            console.log('グリーーーーーん')
          }
        }
        // 正解arrの中に含まれている、けど順番が違う
      } else {
        // ボックスは黄色
        boxesInRow[i].style.backgroundColor = 'rgba(241,202,43,0.85)'
        boxesInRow[i].style.color = 'white'
        for (let key of screenKeys){
          if(key.textContent === guess[i]){
            if(key.classList.contains('greenKey')){
              ;
            }else{
              key.style.backgroundColor = 'rgba(241,202,43,0.85)'
              key.style.color = 'white'
            }
          }
        }
      }
      //正解の中に含まれていないパターン
    } else {
        boxesInRow[i].style.backgroundColor = 'rgba(128,128,128,0.85)'
        boxesInRow[i].style.color = 'white'
        for (let key of screenKeys){
          if(key.textContent === guess[i]){
            key.style.backgroundColor = 'rgba(128,128,128,0.85)'
            key.style.color = 'white'
          }
        }
    }
  }


  let targetRow = document.getElementById(`row${answerCount + 1}`)
  console.log(answerCount)
  console.log(targetRow)
  let correctAnswersNum = targetRow.getElementsByClassName('green')
  if (correctAnswersNum.length === 5){
    timerFlag = !timerFlag
    prevStreak += 1
    finish('win')
  }
}
