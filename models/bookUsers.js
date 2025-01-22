const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    bookID: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("BookUsers", schema);

module.exports = model;
