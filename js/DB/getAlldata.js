
// CALLED BY finish() when game is over
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
      console.log(`all data : ${rows.length}`)
      if(callBack == 'callback1'){
        callBack(rows.length) // how many data is in DB?
      } else {
        callBack(getStreak, rows.length)
      }
    }
  }
}

/// This is the start of game
getAllData(getCurrentStreak)