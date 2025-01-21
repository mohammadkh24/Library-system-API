const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  inventory: {
    type: Number,
    required: true,
  },
});

const model = mongoose.model("Book", schema);

module.exports = model;
