
// create and connect to DB
// this will be executed ONE TIME when DB is upgated


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