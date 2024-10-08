// INSERT DATA
function insertData(turn, result, streak) {
  // get current dateTime to make an unique ID for the data
  // convert the dateTime to Strings to insert into the DB
  let uniqueID = new Date().getTime().toString();

  // create data object with unique ID
  let data = {
    id: uniqueID,
    turn: turn,
    result: result,
    streak: streak,
    date: new Date(),
  };

  // open DB
  // assign hte opened DB to a variable to manipulate it later
  let database = indexedDB.open(dbName, dbVersion);

  // if fail to open DB
  database.onerror = function (event) {
    console.log("データベースに接続できませんでした");
  };

  //データベースを開いたらデータの登録を実行
  database.onsuccess = function (event) {
    let db = event.target.result;
    console.log(db);

    // which database to transact
    // storeName = 'wordleStore'
    let transaction = db.transaction(storeName, "readwrite");
    // if successful
    transaction.oncomplete = function (event) {
      console.log("トランザクション完了 transaction completed");
    };
    // if fail
    transaction.onerror = function (event) {
      console.log("トランザクションエラー transaction error");
    };

    // assign objectStore to a variable
    let store = transaction.objectStore(storeName);
    // insert data into the table (onjectStore) and it returns success/ fail
    console.log(data, "データ");
    let addData = store.add(data);
    addData.onsuccess = function () {
      console.log("データが登録できました data was inserted");
    };
    addData.onerror = function () {
      console.log("データが登録できませんでした could not insert the data");
    };
    db.close();
  };
}
