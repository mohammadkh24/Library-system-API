const db = require("../db.json");
const fs = require("fs");
const { dbConnection } = require("../configs/db");
const { ObjectId } = require("mongodb");

const findUsers = async () => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const users = usersCollection.find({}).toArray();
  return users;
};

const findUserByEmailOrUsername = (email, userName) => {
  return db.users.find(
    (user) => user.email === email || user.username === userName
  );
};

const registerUser = async (newUser) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const users = usersCollection.insertOne(newUser);

  return { message: "Register User Successfully" };
};

const foundUser = async (email, userName) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const user = await usersCollection.findOne({email , userName});
  
  if (!user) {
    return { message : "User not found" }
  }

  return user;
};

const upgradeUser = async (userID) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const result = usersCollection.updateOne(
    {
      _id: new ObjectId(userID),
    },
    { $set: { role: "ADMIN" } }
  );

  if (result.matchedCount === 0) {
    return { message: "User not found" };
  }

  return { message: "User upgrade successfully" };
};

const crimeUser = async (userID, crime) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const result = await usersCollection.updateOne(
    {
      _id: new ObjectId(userID),
    },
    { $set: {crime} }
  );

  if (result.matchedCount === 0) {
    return { message : "User NotFound" }
  }

  return { message : "Crime Set Successfully" }

};

module.exports = {
  findUsers,
  findUserByEmailOrUsername,
  registerUser,
  foundUser,
  upgradeUser,
  crimeUser
};
