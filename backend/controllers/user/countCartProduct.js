const cartProductModel = require("../../models/cartProductModel");

async function countCartProduct(req, res) {
  try {
    const userId = req.userId;
    const count = await cartProductModel.find({
      user: userId,
      checkout: false,
    });
    res.status(200).json({ status: true, data: count.length });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = countCartProduct;
