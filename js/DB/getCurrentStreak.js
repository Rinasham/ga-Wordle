function getCurrentStreak(callBack, allGameCount){
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

      callBack(prevLostTime, allGameCount)
    })

    // store = table(objectStore)
    let store = transaction.objectStore(storeName)

    let prevLostTimeArr = []

    const request = store.index('resultIndex').openCursor('lose', 'prev')
    request.onsuccess = function (e) {
      const cursor = request.result
      if (cursor){
        prevLostTimeArr.push(cursor.value.id)
        cursor.continue();
      } else {
        console.log('last time you lost 検索終了 serch done');
      }
    }
  }
}

// call it when the page is loaded
// getCurrentStreak(getStreak)



function getStreak(prevLostTime, allGameCount){
  let database = indexedDB.open(dbName)
  database.onsuccess = function (event) {
    console.log('2回目のDBオープン')
    console.log(`The ID of the game you lost is "${prevLostTime}", which means DB doesn't have any data and this is your first game.`)
    let db = event.target.result
    let transaction = db.transaction(storeName, "readonly")

    transaction.addEventListener("complete",function(e){
      getMaxStreak(streak)
      // main(streak)
    })

    // store = table
    let store = transaction.objectStore(storeName)
    let streak = 0

    if (typeof prevLostTime === 'undefined'){
      // This is for when user hasn't any lost game, which can't calculate the current streak
      // allGameCount == how many times user has played
      streak = allGameCount
    } else {
      let range = store.getAll(IDBKeyRange.lowerBound(prevLostTime, true)) // range to search in
      range.onsuccess = function(data) {
        console.log(data.target.result)
        streak = Object.keys(data.target.result).length
        console.log(streak)
      }
    }
    db.close()
    console.log('DB for current streak closed properly.')
  }
}


function getMaxStreak(currentStreak){
  let database = indexedDB.open(dbName)
  database.onsuccess = function (event) {
    console.log('3回目のDBオープン')
    console.log(currentStreak)
    let db = event.target.result
    let transaction = db.transaction(maxStreakStoreName, "readonly")

    transaction.addEventListener("complete",function(e){
      main(currentStreak, maxStreak)
    })

    let store = transaction.objectStore(maxStreakStoreName)

    const maxStreakArr = []
    let maxStreak = 0

    store.getAll().onsuccess = function (data){
      const dataObj = data.target.result
      // console.log(dataObj)

      // take max number out of maxStreakArr (that is max streak)
      for (let i=0; i < dataObj.length; i++){
        maxStreakArr.push(dataObj[i].maxStreak)
      }
      const aryMax = function (a, b) {return Math.max(a, b);}
      maxStreak = maxStreakArr.reduce(aryMax)
    }
    db.close()
    console.log('DB closed properly. Ready for game!')
  }
}

