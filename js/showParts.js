function showStartArea(){
  document.getElementById('startArea').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.getElementById('startArea').style.display = 'flex'
}

function removeStartArea(){
  document.getElementById('startArea').animate([{opacity: '1'}, {opacity: '0'}], 500)
  document.getElementById('startArea').style.display = 'none'

}

function showTitles(){
  document.querySelector('h1').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.getElementById('author').animate([{opacity: '0'}, {opacity: '1'}], 500)
}

function removeTitles(){
  document.querySelector('h1').animate([{opacity: '1'}, {opacity: '0'}], 500)
  document.getElementById('author').animate([{opacity: '1'}, {opacity: '0'}], 500)
}


// -----------------------------------------------------

function showGameArea(){
  document.getElementById('gameArea').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.getElementById('gameArea').style.display = 'block'

}

function removeGameArea(){
  document.getElementById('gameArea').animate([{opacity: '1'}, {opacity: '0'}], 500)
  document.getElementById('gameArea').style.display = 'none'
}

// -----------------------------------------------------

// show each game area

function showOnscreen(){
  document.getElementById('onscreenArea').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.getElementById('onscreenArea').style.display = 'block'
}

function removeOnscreen(){
  document.getElementById('onscreenArea').animate([{opacity: '1'}, {opacity: '0'}], 500)
  document.getElementById('onscreenArea').style.display = 'none'
}

function showKeydown(){
  document.querySelector('h3').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.querySelector('h3').style.display = 'block'
  document.getElementById('onscreenArea').animate([{opacity: '0'}, {opacity: '1'}], 500)
  document.getElementById('onscreenArea').style.display = 'block'
}

function removeKeyDown(){
  document.querySelector('h3').animate([{opacity: '1'}, {opacity: '0'}], 500)
  document.querySelector('h3').style.display = 'none'
  document.getElementById('onscreenArea').animate([{opacity: '1'}, {opacity: '0'}], 500)
  document.getElementById('onscreenArea').style.display = 'none'
}