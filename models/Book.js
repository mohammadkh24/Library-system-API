const db = require("../db.json");
const fs = require("fs");
const { dbConnection } = require("../configs/db");
const { ObjectId } = require("mongodb");

const find = async () => {
  const db = await dbConnection();
  const bookCollection = db.collection("books");
  const books = bookCollection.find({}).toArray();
  return books;
}

const remove = async (bookID) => {
  const db = await dbConnection();
  const bookCollection = db.collection("books");
  const result = bookCollection.deleteOne({ _id : new ObjectId(bookID) });

  if (result) {
    return { message: "Book Removed Successfully" }
  } else {
    return { message: "Book Not Found" }
  }
};

const addBook = async (newBook) => {
    const db = await dbConnection();
    const bookCollection = db.collection("books");
    const result = bookCollection.insertOne(newBook);
  
    return { message: "New Book Added Successfully" }
};

const findBookByIdAndFreeStatus = async (bookID) => {
  const db = await dbConnection();  
  const booksCollection = db.collection("books");
  
  const book = await booksCollection.findOne({ 
    _id: new ObjectId(bookID), 
    free: 1
  });

  return book !== null; 
};

const updateBook = async (bookID, newDetails) => {
  const db = await dbConnection();
  const booksCollection = db.collection("books");
  const result = booksCollection.updateOne( {_id : new ObjectId(bookID)},{
    $set : {...newDetails}
  } )

  if (result.matchedCount === 0) {
    return { message : "Book not found" }
  }

  return { message : "Book status updated successfully" };

};

const findBook = (bookID) => {
  db.books.find((book) => book.id == Number(bookID));
};

const backBook = async (bookID) => {
  const db = await dbConnection();
  const booksCollection = db.collection("books");

  const result = await booksCollection.updateOne(
    { _id:new ObjectId(bookID)},
    { $set: { free: 1 } }  
  );

  if (result.matchedCount === 0) {
    return { message: "No books were updated. Either book does not exist or is already free." };
  }

  return { message : "Book backed successfully" }
}

module.exports = {
  find,
  remove,
  addBook,
  findBookByIdAndFreeStatus,
  updateBook,
  findBook,
  backBook
};
