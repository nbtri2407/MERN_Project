const cartProductModel = require("../../models/cartProductModel");
const productModel = require("../../models/productModel");

async function updateCart(req, res) {
  try {
    const cartId = req?.body?._id;
    const qty = req.body.quantity;

    const currentProduct = await cartProductModel
      .findById(cartId)
      .populate("product");
    const maxQty = currentProduct.product.quantity;

    if (qty < maxQty) {
      const updateProduct = await cartProductModel.updateOne(
        { _id: cartId },
        {
          ...(qty && { quantity: qty }),
        }
      );

      if (updateProduct) {
        res.status(200).json({
          status: true,
          data: updateProduct,
          message: "Cart updated",
        });
      }
    } else {
      const updateProduct = await cartProductModel.updateOne(
        { _id: cartId },
        {
          ...(qty && { quantity: maxQty }),
        }
      );

      if (updateProduct) {
        res.json({
          status: true,
          data: updateProduct,
          message: "Not enough quantity",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = updateCart;
