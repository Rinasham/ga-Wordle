const dbName = 'wordleDB'
const storeName = 'wordleStore'
const dbVersion = 3

// create and connect to DB
// this will be executed one time when DB is upgated
let database = indexedDB.open(dbName, dbVersion);

  // create a table (objectStore)
database.onupgradeneeded = function (event) {
  let db = event.target.result;
  // main key = id
  const table = db.createObjectStore(storeName, { keyPath: "id" });
  //create another index (result)
  table.createIndex("resultIndex","result",{
    unique:false,	// multiple data can have the same result
    multiEntry:false,	// data can't have both 'win' and 'lose'
  });
  // index for turn chart
  table.createIndex("turnIndex","turn",{
    unique:false,	// multiple data can have the same result
    multiEntry:false,	// data can't have both 'win' and 'lose'
  });
  console.log("データベースを新規作成しました");
}

//データベースに接続に成功した時に発生するイベント
database.onsuccess = function (event) {
  let db = event.target.result;
   // 接続を解除する
  db.close();
  console.log("データベースに接続できました。既に閉じています。");
}
database.onerror = function (event) {
  console.log("データベースに接続できませんでした");
}



// -----------------------------------------------------------------


// CALLED BY 'finish()'
function register(result){
  let turn = answerCount + 1
  let winOrLose = result
  insertData(turn, winOrLose)
}

// INSERT DATA
function insertData (turn, result) {
  // get current dateTime to make an unique ID for the data
  // convert the dateTime to Strings to insert into the DB
  let uniqueID = new Date().getTime().toString();
  // create data object with unique ID
  let data = {
    id : uniqueID,
    turn : turn,
    result : result
  }

  // open DB
  // assign hte opened DB to a variable to manipulate it later
  let database = indexedDB.open(dbName, dbVersion)

  // if fail to open DB
  database.onerror = function (event) {
    console.log("データベースに接続できませんでした");
  }

  //データベースを開いたらデータの登録を実行
  database.onsuccess = function (event) {
    let db = event.target.result

    // which database to transact
    // storeName = 'wordleStore'
    let transaction = db.transaction(storeName, "readwrite")
    // if successful
    transaction.oncomplete = function (event) {
        console.log("トランザクション完了 transaction completed");
    }
    // if fail
    transaction.onerror = function (event) {
        console.log("トランザクションエラー transaction error");
    }

    // assign objectStore to a variable
    let store = transaction.objectStore(storeName)
    // insert data into the table (onjectStore) and it returns success/ fail
    console.log(data)
    let addData = store.add(data);
    addData.onsuccess = function () {
        console.log("データが登録できました data was inserted");
    }
    addData.onerror = function () {
        console.log("データが登録できませんでした could not insert the data");
    }
    db.close()
  }
}

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
        if (recordOfTurn < 7){
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


// GET DATA FROM DB
function getAllData(callBack){
  let database = indexedDB.open(dbName);
  database.onsuccess = function (event) {
    let db = event.target.result;
    let transaction = db.transaction(storeName, "readonly");
    // store = table
    let store = transaction.objectStore(storeName);


    // GET ALL DATA
    // storeAll method gets all the records in the table
    // data contains all those data (in object form)
    store.getAll().onsuccess = function (data) {
      // rows == object that coutain all data object in DB
      let rows = data.target.result;
      // console.log(rows.length)
      callBack(rows.length) // how many data is in DB?
    }
  }
}


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



/*
1. run get all data count func (getAllData(callback1))
2. pass the all data count to callback1, which calls win count func(getWinData())
3. winCount func calls callback2 with 'win count' and 'all game count'
*/

// callback functions
//all data
function callback1(allDataCount){
  console.log(`the number of total data is !{allDataCount}`)
  getWinData(allDataCount, callback2)
}

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



