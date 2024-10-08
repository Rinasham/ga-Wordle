// CHECK THE GUESS
// THIS FUNCTION IS CALLED EVERYTIME USER PRESS ENTER AT THE END OF EACH ROW

// parameter == user's guess (strings)

const countCharacters = {}; // key${guess[i]}
const exsistingLetters = [];

function checkAnswer(guess) {
  // validation 後でコメントアウト戻す
  console.log(guess.toUpperCase(), "guess");
  if (validWordsSet.has(guess.toUpperCase())) {
    console.log("そのワードあるよ");
    checkLetters(guess);
  } else {
    // 画面にそんなワードは有効じゃないと表示させる
    console.log("そのワードはありません");
    for (let i = 0; i < guess.length; i++) {
      document.getElementById(`row${answerCount + 1}`).children[i].textContent =
        "";
      guessesArr[answerCount] = [];
    }
    // if (answerCount > 0) {
    //   answerCount -= 1;
    // }
    checkLetters(guess);
    // return;
  }
}

const correctKeys = [];

// guess == guessesArr[answerCount]
function checkLetters(guess) {
  // 5 boxes in a row
  // the index of a row is `row${answerCount + 1}`(it starts from 1, not 0)
  let boxesInRow = document.getElementById(`row${answerCount + 1}`).children;
  // get all keys in onscreen keyboard
  const screenKeys = document.getElementsByClassName("keys");

  // guessを一文字ずつcheck
  function checkGreen(guess) {
    for (let i = 0; i < guess.length; i++) {
      if (question[i] === guess[i]) {
        correctKeys.push(guess[i]);
      }
    }
  }

  checkGreen(guess);

  // ------------------------

  if (answerCount == 0) {
    for (let i = 0; i < question.length; i++) {
      if (!exsistingLetters.includes(question[i])) {
        exsistingLetters.push(question[i]);
      }
    }
  }
  for (let i = 0; i < exsistingLetters.length; i++) {
    let count = 0;
    for (let j = 0; j < question.length; j++) {
      if (exsistingLetters[i] == question[j]) {
        count++;
      }
      countCharacters[`key${exsistingLetters[i]}`] = count;
    }
  }
  console.log(countCharacters, "カウント１");
  // }

  for (let i = 0; i < exsistingLetters.length; i++) {
    let greenCount = 0;
    for (let j = 0; j < guess.length; j++) {
      if (
        guess[j] == exsistingLetters[i] &&
        boxesInRow[j].textContent == question[j]
      ) {
        greenCount++;
      }
      countCharacters[`key${exsistingLetters[i]}`] -= greenCount;
    }
    if (countCharacters[`key${exsistingLetters[i]}`] > 0) {
      countCharacters[`key${exsistingLetters[i]}`] -= greenCount;
    }
  }

  console.log(countCharacters, "カウント");

  // ------------------------

  for (let i = 0; i < guess.length; i++) {
    // 正解の中に含まれているパターン
    if (question.includes(guess[i])) {
      if (question[i] === guess[i]) {
        // ボックス緑
        boxesInRow[i].style.backgroundColor = "rgba(0,128,0,0.75)";
        boxesInRow[i].style.color = "white";
        boxesInRow[i].classList.add("green");
        countCharacters[`key{guess[i]}`] -= 1;
        // キーも緑
        for (let key of screenKeys) {
          if (key.textContent === guess[i]) {
            key.style.backgroundColor = "rgba(0,128,0,0.75)";
            key.style.color = "white";
            key.classList.add("greenKey");
          }
        }
        // 正解arrの中に含まれている、けど順番が違う
      } else {
        // 正解に含まれてるがもう残ってない
        if (countCharacters[`key${guess[i]}`] > 0) {
          // ボックスは黄色
          boxesInRow[i].style.backgroundColor = "rgba(241,202,43,0.85)";
          boxesInRow[i].style.color = "white";
        } else {
          boxesInRow[i].style.backgroundColor = "rgba(128,128,128,0.85)";
          boxesInRow[i].style.color = "white";
        }
        for (let key of screenKeys) {
          if (key.textContent === guess[i]) {
            if (key.classList.contains("greenKey")) {
            } else {
              key.style.backgroundColor = "rgba(241,202,43,0.85)";
              key.style.color = "white";
            }
          }
        }
      }
      //正解の中に含まれていないパターン
    } else {
      boxesInRow[i].style.backgroundColor = "rgba(128,128,128,0.85)";
      boxesInRow[i].style.color = "white";
      for (let key of screenKeys) {
        if (key.textContent === guess[i]) {
          key.style.backgroundColor = "rgba(128,128,128,0.85)";
          key.style.color = "white";
        }
      }
    }
  }

  // let targetRow = document.getElementById(`row${answerCount + 1}`)
  // console.log(answerCount)
  // console.log(targetRow)
  let correctAnswersNum = document.getElementsByClassName("green");
  if (correctAnswersNum.length === 5) {
    timerFlag = !timerFlag;
    prevStreak += 1;
    finish("win");
  } else {
    answerFlag = true;
    for (let i = 0; i < guess.length; i++) {
      boxesInRow[i].classList.remove("green");
    }
  }
}
