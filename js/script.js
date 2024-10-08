// main
function main(streakParam, maxStreakParam) {
  // get current streak at the beginning of a game
  prevStreak = streakParam;
  maxStreak = maxStreakParam;
  console.log(`Your current streak is ${prevStreak}!`);
  console.log(`Your max streak is ${maxStreak}!`);

  answerCount = 0;
  document.getElementById("gameArea").style.display = "none";
  document.getElementById("onscreenArea").style.display = "none";
  document.querySelector("h3").style.display = "none";
  showTitles();
  showStartArea();
  showStartArea();

  for (let startBtn of startBtns) {
    startBtn.addEventListener("click", function (e) {
      const whichBtn = e.target.id;
      // parameter == which button was pressed to start
      startGame(whichBtn);
    });
  }
}

// START GAME
function startGame(startBtn) {
  // change screen
  showGameArea();
  removeStartArea();
  document.getElementById("author").style.display = "none";

  // accept keypress
  state = !state;
  if (startBtn === "OnscreenStartBtn") {
    showOnscreen();
    onScreen();
  } else if (startBtn === "KeyboardStartBtn") {
    showKeydown();
    keydownEvent();
  } else {
    document
      .getElementById("timeLimit-wrapper")
      .animate([{ opacity: "0" }, { opacity: "1" }], 500);
    document.getElementById("timeLimit-wrapper").style.display = "block";
    document.getElementById("time").focus();
    // accept Enter button to start a game after setting time limit
    document.addEventListener("keydown", StartTimerWithEnterBtn);
  }
}

const StartTimerWithEnterBtn = function (e) {
  if (e.code === "Enter") {
    if (!document.getElementById("time").value == "") {
      startTimeLimitMode();
      console.log("timer発動");
      document.removeEventListener("keydown", StartTimerWithEnterBtn);
    }
  }
};
