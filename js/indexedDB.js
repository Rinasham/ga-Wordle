const dbName = 'wordleDB'
const storeName = 'wordleStore'
const dbVersion = 1

// create and connect to DB
// this will be executed one time when DB is upgated
let database = indexedDB.open(dbName, dbVersion);

  // create a table (objectStore)
database.onupgradeneeded = function (event) {
  let db = event.target.result;

  db.createObjectStore(storeName, { keyPath: "id" });
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
function register(){
  let turn = answerCount + 1
  insertData(turn)
}

// INSERT DATA
function insertData (turn) {
  console.log(turn)
  // get current dateTime to make an unique ID for the data
  // convert the dateTime to Strings to insert into the DB
  let uniqueID = new Date().getTime().toString();
  // create data object with unique ID
  let data = {
    id : uniqueID,
    turn : turn
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
        console.log("トランザクション完了");
    }
    // if fail
    transaction.onerror = function (event) {
        console.log("トランザクションエラー");
    }

    // assign objectStore to a variable
    let store = transaction.objectStore(storeName)
    // insert data into the table (onjectStore) and it returns success/ fail
    console.log(data)
    let addData = store.add(data);
    addData.onsuccess = function () {
        console.log("データが登録できました");
    }
    addData.onerror = function () {
        console.log("データが登録できませんでした");
    }
    db.close()
  }
}
