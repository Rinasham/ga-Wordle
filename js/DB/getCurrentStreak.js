function getCurrentStreak(callBack){
  let database = indexedDB.open(dbName)
  database.onsuccess = function (event) {
    let db = event.target.result;
    let transaction = db.transaction(storeName, "readonly")
    // コールバック？？
    //トランザクションに対してイベントを登録する
    transaction.addEventListener("complete",function(e){
      console.log("Streak用トランザクションが終了。Transaction for Streak done")
      let prevLostTime = prevLostTimeArr.slice(0, 1)[0]
      // main(prevLostTime)

      db.close()
      console.log(`DB closed.`)

      callBack(prevLostTime)
    })

    // store = table(objectStore)
    let store = transaction.objectStore(storeName)

    let prevLostTimeArr = []

    const request = store.index('resultIndex').openCursor('lose', 'prev')
    request.onsuccess = function (e) {
      const cursor = request.result
      if (cursor){
        prevLostTimeArr.push(cursor.value.id)
        // console.log(e.target.result.value)
        // console.log('検索結果:', cursor.value);
        cursor.continue();
      } else {
        console.log('検索終了 serch done');
      }
    }
      // db.close()
      // console.log(`DB closed.`)
  }
}

// call it when the page is loaded
getCurrentStreak(getStreak)



function getStreak(prevLostTime){
  let database = indexedDB.open(dbName)
  database.onsuccess = function (event) {
    console.log('2回目のDBオープン')
    console.log(`The ID of the game you lost is "${prevLostTime}", which means DB doesn't have any data and this is your first game.`)
    let db = event.target.result
    let transaction = db.transaction(storeName, "readonly")

    transaction.addEventListener("complete",function(e){
      main(streak)
    })

    // store = table
    let store = transaction.objectStore(storeName)
    let streak = 0

    if (typeof prevLostTime === 'undefined'){
      ;
    } else {
      let range = store.getAll(IDBKeyRange.lowerBound(prevLostTime, true)) // range to search in
      range.onsuccess = function(data) {
        console.log(data.target.result)
        streak = Object.keys(data.target.result).length
        console.log(streak)
      }
    }
    db.close()
    console.log('DB closed properly. Ready for game!')
  }
}