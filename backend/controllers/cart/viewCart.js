const cartProductModel = require("../../models/cartProductModel");
const userModel = require("../../models/userModel");

async function viewCart(req, res) {
  try {
    const userId = req.userId;
    const cart = await cartProductModel.find({ user: userId, checkout: false }).populate("product");
    res.status(200).json({ status: true, data: cart, message: "Cart" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = viewCart;
