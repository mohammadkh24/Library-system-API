const http = require("http");
const fs = require("fs");
const url = require("url");
const db = require("./db.json");
const bookController = require("./controllers/bookController");
const userController = require("./controllers/userController");
const rentController = require("./controllers/rentController");
require("dotenv").config()

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url == "/api/users") {
    userController.getAllUsers(req, res);
  } else if (req.method == "GET" && req.url == "/api/books") {
    bookController.getAll(req, res);
  } else if (req.method == "DELETE" && req.url.startsWith("/api/books")) {
    bookController.removeOne(req, res);
  } else if (req.method == "POST" && req.url == "/api/books") {
    bookController.addOneBook(req, res);
  } else if (req.method == "PUT" && req.url.startsWith("/api/books/back")) {
    bookController.backedBook(req,res)
  } else if (req.method == "PUT" && req.url.startsWith("/api/books")) {
    bookController.updateBook(req,res)
  } else if (req.method == "POST" && req.url == "/api/users") {
    userController.addUser(req, res);
  } else if (req.method == "PUT" && req.url.startsWith("/api/users/upgrade")) {
    userController.upgradedUser(req,res)
  } else if (req.method == "PUT" && req.url.startsWith("/api/users")) {
    userController.crimedUser(req , res)
  } else if (req.method == "POST" && req.url == "/api/users/login") {
    userController.loginUser(req, res);
  } else if (req.method == "POST" && req.url == "/api/books/rent") {
    rentController.rentData(req, res);
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server Rinning On Port ${process.env.PORT}...`);
});
