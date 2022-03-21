const dbName = 'wordleDB'
const storeName = 'wordleStore'
const dbVersion = 1

// create and connect to DB
let database = indexedDB.open(dbName, dbVersion);

// create Object store
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
  console.log("データベースに接続できました");
}
database.onerror = function (event) {
  console.log("データベースに接続できませんでした");
}

function register(){
  let turn = answerCount + 1
  insertData(turn)
}

function insertData (turn) {
  // get current dateTime to make an unique ID for the data
  let uniqueID = new Date().getTime().toString();
  console.log(uniqueID);
}
