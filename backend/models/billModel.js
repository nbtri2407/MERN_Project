const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billModel = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    name : String,
    email: String,
    phone: String,
    address: String,
    carts: [
      {
        type: Schema.Types.ObjectId,
        ref: "cartProduct",
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    payment: String,
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bill", billModel);
