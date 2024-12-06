const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const dbConnection = new MongoClient(process.env.dbConnectionUrl);

const dbName = process.env.dbName;

// const main = async () => {
//   await dbConnection.connect();
//   console.log("MongoDB Connected");

//   const db = dbConnection.db(dbName);


// };

module.exports = {
  dbConnection : async () => {
    await dbConnection.connect();
    console.log("MongoDB Connected");

    const db = dbConnection.db(dbName);
    return db
  }
}
