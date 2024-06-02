const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryName: String,
  description: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

module.exports = mongoose.model("category", categorySchema);
