const guessesArr = [
  [],
  [],
  [],
  [],
  [],
  [],
]

// Boolean 'state' controls the acceptance of keypress
let state = false

// Variable for counting HOW MANY TIMES you answered
let answerCount = 0


// start buttons variable
const startBtns = document.getElementsByClassName('startBtn')
const InputStartBtn = document.getElementById('InputStartBtn')
const onscreenStartBtn = document.getElementById('OnscreenStartBtn')
const keyboardStartBtn = document.getElementById('KeyboardStartBtn')


// main
for (let startBtn of startBtns){
  startBtn.addEventListener('click', function(e){
    const whichBtn = e.target.id
    console.log(whichBtn)
    // parameter == which button was pressed to start
    startGame(whichBtn)
  })
}


// START GAME
function startGame(startBtn){
  // change screen
  // 後でコメントアウト　↓
  document.getElementById('gameArea').style.display = 'block'
  document.getElementById('startArea').style.display = 'none'
  if (startBtn === 'InputStartBtn'){
    document.getElementById('InputGameArea').style.display = 'block'
  } else if (startBtn === 'OnscreenStartBtn'){
    document.getElementById('onscreenArea').style.display = 'block'
  } else {
    document.querySelector('h3').style.display = 'block'
  }

  // accept keypress
  state = !state
}



// FOR INPUT EVENT
document.getElementById('answerBtn').addEventListener('click', function(){
  let answerInputArea = document.querySelector('input')
  // if the value in the input box == 5,
  // put the answer into guessArr
  // add 1 to answerCount variable
  if (answerInputArea.value.length !== 5){
    ;
  } else {
    console.log('ok')
  }
  // when answerCount variable gets up to 6, function finish fires
})




// FOR ONSCREEN KEYBOARD INPUT
const keys = document.getElementsByClassName('keys')
for (let key of keys){
  key.addEventListener('click', function(){
    if (key.dataset['letter'] === 'enter'){
      console.log('ENTER dayooooo')
    } else if (key.dataset['letter'] === 'backspace'){
      console.log('BACKSPACE dayooooo')
    } else {
      // 文字がアルファベットだった時の処理
    }
  })
}





// FOR KEYPRESS EVENT
document.addEventListener('keydown',keyDown);
function keyDown(e) {
    // if(!state) return;
    // Shiftキーが押されたら何もしないまま次へ
    if(e.keyCode === 16) {
        ;
    }else{
        // if(e.key === splitWord[0].textContent){
        //     splitWord[0].className = 'after-input';
        //     //　正解数＋１
        //     correct = correct + 1;
        //     correctText.text('正解数：' + correct);
        //     console.log('correct'+correct);
        //     // 正解したら次の文字へ行く
        //     splitWord.shift();
        //     if(!splitWord.length) createQuestion();
        // }else{
        // incorrect = incorrect + 1;
        // incorrectText.text('不正解数：' + incorrect);
        // console.log('incorrect'+incorrect);
        // }
        console.log(e.key)
    }
}