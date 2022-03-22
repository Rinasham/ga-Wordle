// CLEAR TEXTCONTENTS IN ALL THE BOXES


function clearBoxes(){
  const boxes = document.querySelectorAll('.box')
  for (let box of boxes) {
    box.textContent = ''
    if (box.classList.contains('green')){
      box.classList.remove('green')
    }
    box.style.backgroundColor = 'white'
  }
}