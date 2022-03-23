
// create and connect to DB
// this will be executed ONE TIME when DB is upgated


let database = indexedDB.open(dbName, dbVersion);

  // create a table (objectStore)
  // 'onupgradeneeded' will be executed only when DB needs to be updated 
  // or you don't have DB yet
database.onupgradeneeded = function (event) {
  let db = event.target.result;
  // primary key = 'id'
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
  table.createIndex('streakIndex', 'streak', {
    unique: false,
    multiEntry: false,
  })
  table.createIndex('dateIndex', 'date', {
    unique: false,
    multiEntry: false,
  })
  console.log("データベースを新規作成しました");
}

//データベースに接続に成功した時に発生するイベント
database.onsuccess = function (event) {
  let db = event.target.result;
  // 接続を解除する
  db.close();
  console.log("データベースに接続できました。既に閉じています。Checked if there's a DB on your browser. The connection is already closed.");
}
database.onerror = function (event) {
  console.log("データベースに接続できませんでした。Tried to check if there was a DB but couldn't connect to DB");
}