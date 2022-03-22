function getPastRecords(allDataCount){
  let database = indexedDB.open(dbName);
  database.onsuccess = function (event) {
    let db = event.target.result;
    let transaction = db.transaction(storeName, "readonly");
    // コールバック？？
    //トランザクションに対してイベントを登録する
    transaction.addEventListener("complete",function(e){
      console.log("トランザクションが終了しました。Transaction done");
      // console.log(pastArr) // array of in what turn user finished in each game
      const turnsRecordArr = [0,0,0,0,0,0] // each element means how many times the user has won in that turn

      for (let recordOfTurn of pastArr){
        if (0 < recordOfTurn < 7){
          turnsRecordArr[recordOfTurn - 1] = turnsRecordArr[recordOfTurn - 1] + 1
          // console.log(turnsRecordArr[recordOfTurn])
        }
      }
      // console.log(turnsRecordArr)
      let distributionCounts = document.getElementsByClassName('count')
      let percentageAreas = document.getElementsByClassName('percentage')
      // console.log()
      let distributionChart = document.getElementsByClassName('bar')
      // console.log(distributionCounts)
      for (let i=0; i<distributionCounts.length; i++) {
        distributionCounts[i].textContent = turnsRecordArr[i]
        // change percentage chart
        let percentage = Math.trunc(turnsRecordArr[i] / allDataCount * 100)
        // console.log(typeof percentage)
        distributionChart[i].style.width = `${percentage}%`
        // show percentage next to the chart
        percentageAreas[i].textContent = `${percentage}%`
      }

    });

    // store = table
    let store = transaction.objectStore(storeName);
    const request = store.index('turnIndex').openCursor(null, 'next')
    const pastArr = [] // array of in what turn user finished in each game
    request.onsuccess = function (e) {
      const cursor = request.result
      if (cursor){
        pastArr.push(cursor.value.turn)
        cursor.continue();
      } else {
        console.log('検索終了 search done');
      }
      db.close()
    }
  }
}