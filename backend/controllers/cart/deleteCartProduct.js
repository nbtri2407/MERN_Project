const cartProductModel = require("../../models/cartProductModel");
const userModel = require("../../models/userModel");

async function deleteCartProduct(req, res) {
  try {
    const { userId, products } = req.body;

    const cartDeleted = await cartProductModel.deleteMany({
      user: userId,
      _id: { $in: products },
    });

    if (cartDeleted) {
      res.status(200).json({
        status: true,
        message: "Cart deleted successfully",
      });
    } else {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = deleteCartProduct;
