const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callBack) => {
  mongoClient
    .connect(
      "mongodb+srv://class-project:2011102778@cluster0.m9lxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callBack();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
