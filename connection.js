var url         = process.env.CONNECTION_STRING;
var MongoClient = require('mongodb').MongoClient;
var db          = null;

module.exports = function(cb){
  if(db){
    cb(db);
    return;
  }

  MongoClient.connect(url, function(err, conn) {
    if(err){
      console.log(err.message);
      throw new Error(err);
    } else {
      db = conn; 
      cb(db);
    }
  });
}