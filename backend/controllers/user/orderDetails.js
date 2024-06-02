const cartProductModel = require("../../models/cartProductModel");
async function orderDetails(req, res) {
  try {
    const { cartList } = req.body;
    const cart = await cartProductModel
      .find({ _id: { $in: cartList } })
      .populate("product");

    res.status(200).json({
      data: cart,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}

module.exports = orderDetails;
