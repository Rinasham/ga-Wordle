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

// main
document.getElementById('startBtn').addEventListener('click', function(){
  startGame()
})

// START GAME
function startGame(){
  // change screen
  // 後でコメントアウト　↓
  // document.getElementById('startArea').style.display = 'none'
  // document.getElementById('gameArea').style.display = 'block'

  state = !state

}



// FOR INPUT EVENT
document.getElementById('answerBtn').addEventListener('click', function(){
  let answerInputArea = document.querySelector('input')
  // if the value in the input box == 5, 
  if (answerInputArea.value.length !== 5){
    ;
  } else {
    console.log('ok')
  }
})

// FOR ONSCREEN KEYBOARD INPUT
const keys = document.getElementsByClassName('keys')
for (let key of keys){
  key.addEventListener('click', function(){
    console.log(key.dataset['letter'])
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