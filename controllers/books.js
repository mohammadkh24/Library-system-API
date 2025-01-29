const { isValidObjectId } = require("mongoose");
const booksModel = require("../models/books");
const bookUsersModel = require("../models/bookUsers");
const categoriesModel = require("../models/categories");

exports.getAll = async (req, res) => {
  const books = await booksModel.find({}).lean();

  return res.json(books);
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "BookID is not valid !!",
    });
  }

  const book = await booksModel.findOne({ _id: id });

  if (!book) {
    return res.status(404).json({
      message: "Book not found !!",
    });
  }

  return res.json(book);
};

exports.create = async (req, res) => {
  const { title, description, author, inventory, categoryID  } = req.body;

  const category = await categoriesModel.findOne({_id : categoryID});

  if (!category) {
    return res.status(404).json({
        message : "Category not found !!"
    })
  }

  const createdBook = await booksModel.create({
    title,
    description,
    author,
    inventory,
    categoryID,
    cover: "image.jpg"
  });

  if (!createdBook) {
    return res.status(400).json({
      message: "Book created faild !!",
    });
  }

  return res.status(201).json({
    message: "Book created successfully",
    createdBook,
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "BookID is not valid !!",
    });
  }

  const removedBook = await booksModel.findOneAndDelete({ _id: id });

  if (!removedBook) {
    return res.status(404).json({
      message: "Book not found !!",
    });
  }

  return res.status(202).json({
    message: "Book removed successfully",
    removedBook,
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, description, author, inventory } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "BookID is not valid !!",
    });
  }

  const updatedBook = await booksModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      author,
      inventory,
    }
  );

  if (!updatedBook) {
    return res.status(404).json({
      message: "Book not found !!",
    });
  }

  return res.json({
    message: "Book updated successfully",
    updatedBook,
  });
};

exports.reserve = async (req, res) => {
  const { id } = req.params;

  const book = await booksModel.findOne({ _id: id });

  if (!book) {
    return res.status(404).json({
      message: "Book not found !!",
    });
  }

  if (book.inventory <= 0) {
    return res.status(409).json({
      message: "Book is out of stock or already reserved !!",
    });
  }

  const isBookUsers = await bookUsersModel.findOne({
    bookID: id,
    userID: req.user._id,
  });

  if (isBookUsers) {
    return res.status(409).json({
      message: "You have already reserved this book !!",
    });
  }

  const bookUsers = await bookUsersModel.create({
    bookID: id,
    userID: req.user._id,
  });

  book.inventory -= 1;
  await book.save();

  return res.status(201).json({
    message: "Book reserved successfully",
    bookUsers,
  });
};

exports.delivery = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "BookID is not valid !!",
    });
  }

  const book = await booksModel.findOne({ _id: id });

  const deliveryBook = await bookUsersModel.findOneAndDelete({
    bookID: id,
    userID: req.user._id,
  });

  if (!deliveryBook) {
    return res.status(404).json({
      message: "You have not booked this book !!",
    });
  }

  book.inventory += 1;
  await book.save();

  return res.status(202).json({
    message: "Book delivery successfully",
    deliveryBook,
  });
};
