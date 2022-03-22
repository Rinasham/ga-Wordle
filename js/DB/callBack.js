
/*
1. run get all data count func (getAllData(callback1))
2. pass the all data count to callback1, which calls win count func(getWinData())
3. winCount func calls callback2 with 'win count' and 'all game count'
*/

// -----------------------------------------------------------------



// callback functions
//all data
function callback1(allDataCount){
  console.log(`the number of total data is !{allDataCount}`)
  getWinData(allDataCount, callback2)
}

// -----------------------------------------------------------------

//win data
function callback2(callbackArr,allDataCount){
  console.log(`win gameは${callbackArr.length}, all gameは${allDataCount}`)
  let winningRate = Math.trunc(callbackArr.length / allDataCount * 100)
  console.log(`won games ${callbackArr.length}`)
  console.log(`all games ${allDataCount}`)

  document.getElementById('gameCount').textContent = allDataCount
  document.getElementById('winRate').textContent = winningRate

  getPastRecords(allDataCount)

  // open modal
  console.log('モーダルオープン open modal')
  document.getElementById('modal-wrapper').style.display = 'block'
  document.getElementById('modal-wrapper').animate([{opacity: '0'}, {opacity: '1'}], 500)
}



