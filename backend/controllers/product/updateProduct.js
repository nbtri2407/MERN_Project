const productModel = require("../../models/productModel");

async function updateProduct(req, res) {
  try { 
    const productUpdate = req.body;
    const updateProduct = await productModel.findByIdAndUpdate(productUpdate._id, {
        productName: productUpdate.productName,
        category: productUpdate.category,
        description: productUpdate.description,
        quantity: productUpdate.quantity,
        price: productUpdate.price,
        sellingPrice: productUpdate.sellingPrice,
        productImage: productUpdate.productImage,
    });
    if (!updateProduct) {
      throw new Error("Product not updated. Something is wrong.");
    }
    res
      .status(200)
      .json({ status: true, data: updateProduct, message: "Product Updated" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = updateProduct;
