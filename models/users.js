const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    crime : {
      type : Number,
      required : false,
      default : 0
    }
  },
  { timestamps: true }
);

const model = mongoose.model("User", schema);

module.exports = model;
