// Modified version of https://github.com/dalenguyen/firestore-import-export

// Usage:
// - to save all collections in "firestore-export.json":
//   node export.js
// - to save the collection "coll" in "firestore-export.json":
//   node export.js coll
    
const admin = require("firebase-admin");
const serviceAccount = require("../environments/serviceAccountKey.json");
const fs = require('fs');

let collectionName = process.argv[2];
let subCollection = process.argv[3];

// Initiate Firebase App
// You should replace databaseURL with your own
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://first-d6952.firebaseio.com"
});

let db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

if (collectionName === undefined){
  // get all collections
  const firestoreService = require('firestore-export-import');
  firestoreService
    .backups([]) // Array of collection's name is OPTIONAL
    .then(collections => {
      fs.writeFile("firestore-export.json", JSON.stringify(collections), function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
      });
  })
}
else {
  let data = {};
  data[collectionName] = {};

  let results = db.collection(collectionName)
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      data[collectionName][doc.id] = doc.data();
    })
    return data;
  })
  .catch(error => {
    console.log(error);
  })

  results.then(dt => {  
    getSubCollection(dt).then(() => {
      // Write collection to JSON file
      fs.writeFile("firestore-export.json", JSON.stringify(data), function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
      });
    })  
  })
}

async function getSubCollection(dt){
  for (let [key, value] of Object.entries([dt[collectionName]][0])){
    if(subCollection !== undefined){
      data[collectionName][key]['subCollection'] = {};
      await addSubCollection(key, data[collectionName][key]['subCollection']);            
    }          
  }  
}

function addSubCollection(key, subData){
  return new Promise(resolve => {
    db.collection(collectionName).doc(key).collection(subCollection).get()
    .then(snapshot => {
      snapshot.forEach(subDoc => {             
        subData[subDoc.id] = subDoc.data();
        resolve('Added data');                                                                 
      })
    })
  })
}
