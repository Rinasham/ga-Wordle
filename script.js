const guessesObj = []


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