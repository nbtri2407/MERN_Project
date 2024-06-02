const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: String,
    address: String,
    role: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userModel);
