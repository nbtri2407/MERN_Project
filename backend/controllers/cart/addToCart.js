const cartProductModel = require("../../models/cartProductModel");
const productModel = require("../../models/productModel");

async function addToCart(req, res) {
  try {
    const { product, quantity } = req.body;
    const currentUser = req.userId;

    const currentProduct = await productModel.findById(product);

    const isProductAvailable = await cartProductModel.find({
      product: product,
      checkout: false,
    });

    if (isProductAvailable.length > 0) {
      if (currentProduct.quantity >= isProductAvailable[0].quantity + quantity) {
        const updateCart = await cartProductModel.findByIdAndUpdate(
          isProductAvailable[0]._id,
          {
            quantity: isProductAvailable[0].quantity + quantity,
          }
        );
        if (updateCart) {
          res.status(200).json({
            status: true,
            data: updateCart,
            message: "Product added to cart",
          });
        }
      } else {
        res.status(500).json({ status: false, message: "Not enough quantity" });
      }
    } else {
      if (currentProduct.quantity > quantity) {
        const payload = {
          user: currentUser,
          product,
          quantity,
        };
        const newCartProduct = await cartProductModel.create(payload);
        newCartProduct
          .save()
          .then((cart) => {
            res
              .status(200)
              .json({ status: true, data: cart, message: "Product Added" });
          })
          .catch((err) => {
            res.status(500).json({ status: false, message: err.message });
          });
      }else{
        res.status(500).json({ status: false, message: "Not enough quantity" });
      }
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = addToCart;
