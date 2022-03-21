// // FOR INPUT EVENT
// function inputGame(){
//   if(!state) return

//   let inputBox = document.querySelector('input')

//   inputBox.addEventListener('keyup', function(e){
//     if (!state) return
//     let boxesInRow = document.getElementById(`row${answerCount + 1}`).children
//     guessedLetters = e.target.value //input formに入っているリアルタイムの文字列、 delete処理いらない
//     // sync the input form value with the letters in cells
//     if(e.key === 'Backspace'){
//       // if the input form value's length is less than 5,
//       // and the event key is 'backSpace',
//       // delete matching letter in the cells
//       if (0 < guessedLetters.length < 5){
//         console.log(boxesInRow)
//         console.log(guessedLetters)
//         boxesInRow[howManyLetters -1].textContent = ''
//         howManyLetters -= 1
//         guessesArr[answerCount] = guessesArr[answerCount].slice(0, -1)
//         console.log(guessesArr)
//       }
//       // show typed letters in the cells
//       //if pressed any of meta keys(?)
//     } else if (!e.code.startsWith('Key')){
//       ;
//       // if the key is something able to input in the input box
//       //(to get it consistent with letter index)
//     } else if (e.code == /(Period|Slash)/){
//       console.log('ダメー')
//     }else {
//       if(howManyLetters < 5) {
//         // console.log(boxesInRow)
//         boxesInRow[howManyLetters].textContent = guessedLetters[howManyLetters]
//         howManyLetters += 1
//         guessesArr[answerCount] += e.key
//         // console.log(guessesArr)
//       }
//     }
//   })



//   document.getElementById('answerBtn').addEventListener('click', function(){
//     // reset the letter index in rows so that you can move on to the next guess
//     howManyLetters = 0

//     let answerInputArea = document.querySelector('input')

//     // clear the input box automatically so as not to make the same answer by accident
//       answerInputArea.value = ''
//     // check the guess, parameter is the user's guess
//       checkAnswer(guessesArr[answerCount], question)
//     // how many times has the user guessed? + 1
//       answerCount += 1
//     // // when answerCount variable gets up to 6, function finish fires
//     if (answerCount === 6){
//       finish()
//       state = !state
//     }
//   })
// }

