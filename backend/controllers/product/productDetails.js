const productModel = require("../../models/productModel");

async function productDetails(req, res) {
  try {
    const productId = req.body._id;
    const product = await productModel.findById(productId).populate("category");

    res
      .status(200)
      .json({ status: true, data: product, message: "Product details" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = productDetails;
