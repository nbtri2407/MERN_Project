const productModel = require("../../models/productModel");

async function deleteProduct(req, res) {
  try {
    const { _id } = req.body;
    const deleteProduct = await productModel.findByIdAndDelete(_id);
    if (!deleteProduct) {
      throw new Error("Something went wrong");
    }
    res.status(200).json({
      status: true,
      data: deleteProduct,
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = deleteProduct;
