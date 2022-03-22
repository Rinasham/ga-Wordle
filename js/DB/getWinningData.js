const winCursorArr = []
// let arrLength = 0
function getWinData(allDataCount, callBack){
  let database = indexedDB.open(dbName);
  database.onsuccess = function (event) {
    // const cursorArr = []
    let db = event.target.result;
    let transaction = db.transaction(storeName, "readonly");
    // store = table
    let store = transaction.objectStore(storeName);
    // GET WIN RECORDS

    const request = store.index('resultIndex').openCursor('win', 'next')
    request.onsuccess = function (e) {
      const cursor = request.result
      if (cursor){
        winCursorArr.push(cursor.value.id)
        // console.log(e.target.result.value)
        // console.log('検索結果:', cursor.value);
        cursor.continue();
      } else {
        console.log('検索終了 serch done');
        // console.log(cursorArr)
        callBack(winCursorArr, allDataCount)
      }
    }
  }
}
