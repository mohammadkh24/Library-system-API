const categoriesModel = require("../models/categories");
const booksModel = require("../models/books");
const { isValidObjectId } = require("mongoose");

exports.getAll = async (req, res) => {
  const categories = await categoriesModel.find({}).lean();

  return res.json(categories);
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "CategoryID is not valid !!",
    });
  }

  const isCategory = await categoriesModel.findOne({ _id: id });

  if (!isCategory) {
    return res.status(404).json({
      message: "Category not found !!",
    });
  }

  const category = await booksModel.find({ categoryID: id });

  return res.json(category);
};

exports.create = async (req, res) => {
  const { title, description } = req.body;

  const createCategory = await categoriesModel.create({
    title,
    description,
  });

  if (!createCategory) {
    return res.status(400).json({
      message: "Faild to create category !!",
    });
  }

  return res.status(201).json({
    message: "Category created successfully",
    createCategory,
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "CategoryID is not valid !!",
    });
  }

  const updateCategory = await categoriesModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
    }
  );

  if (!updateCategory) {
    return res.status(404).json({
      message: "Category not found !!",
    });
  }

  return res.json({
    message: "Category updated successfully",
    updateCategory,
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "CategoryID is not valid !!",
    });
  }

  const removeCategory = await categoriesModel.findOneAndDelete({ _id: id });

  if (!removeCategory) {
    return res.status(404).json({
        message : "Category not found !!"
    })
  }

  return res.status(201).json({
    message : "Category removed successfully",
    removeCategory
  })
};
