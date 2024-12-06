const db = require("../db.json");
const fs = require("fs");
const { dbConnection } = require("../configs/db");




const rent = async (newRent) => {
  const db = await dbConnection();
  const bookCollection = db.collection("rents");
  const result = bookCollection.insertOne(newRent);

  if (!result) {
    return { message : "Book Reserve Faild" }
  }

  return({ message: "Book Reserved Successfully" });
};

module.exports = {
  rent
};
