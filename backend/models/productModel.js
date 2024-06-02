const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
    productName: String,//
    level: String, //
    swingweight: String,//
    handleLength: String,//
    length: String,//
    stylePlay: String,//
    formatPlay: String,//
    stiffness: String,//
    balancePoint: String,//
    weight: String,//
    price: Number,//
    sellingPrice: Number,//
    quantity: Number,//
    productImage: [],//
    category: {//
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    }
},{
    timestamps: true,   
});

module.exports = mongoose.model("product", productModel)