const url = require("url");

const BookModel = require("./../models/Book");

const getAll = async (req, res) => {
  const books = await BookModel.find();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(books));
  res.end();
};

const removeOne = async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const bookID = parsedUrl.query.id;

    const removeBook = await BookModel.remove(bookID);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(removeBook));
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const addOneBook = async (req, res) => {
  let book = "";

  req.on("data", (data) => {
    book = book + data.toString();
  });

  req.on("end", async () => {
    const newBook = { id: crypto.randomUUID(), ...JSON.parse(book), free: 1 };

    const addedBook = await BookModel.addBook(newBook);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify(addedBook));
    res.end();
  });
};

const updateBook = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const bookID = parsedUrl.query.id;

  let book = "";

  req.on("data", (data) => {
    book = book + data;
  });

  req.on("end", async () => {
    const newDetails = JSON.parse(book);

    try {
      const result = await BookModel.updateBook(bookID, newDetails);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(result));
      res.end();
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({ message: "Failed to update book", error: err.message })
      );
      res.end();
    }
  });
};

const backedBook = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const bookID = parsedUrl.query.id;

  if (!bookID) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Book ID is required" }));
    return;
  }

  const result = await BookModel.backBook(bookID);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
};

module.exports = {
  getAll,
  removeOne,
  addOneBook,
  updateBook,
  backedBook
};
