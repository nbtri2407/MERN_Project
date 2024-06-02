const billModel = require("../../models/billModel");
const cartProductModel = require("../../models/cartProductModel");
const userModel = require("../../models/userModel");

async function checkoutCart(req, res) {
  try {
    const { name, email, phone, address, products, total, payment } =
      req.body; 

      console.log("producst", products[0]);
      const userId = req.userId;
    const cartList = await cartProductModel.find({ _id: { $in: products } });
    const idCartList = cartList.map((item) => item._id);
    const payload = {
      user: userId,
      name,
      email,
      phone,
      address,
      carts: cartList,
      totalPrice: total,
      payment,
    };

    const cartUpdate = await cartProductModel.updateMany(
      {
        user: userId,
        _id: { $in: idCartList },
      },
      {
        checkout: true,
      }
    );
    const bill = await billModel.create(payload);
    const saveBill = await bill.save();
    if (saveBill && cartUpdate) {
      return res
        .status(200)
        .json({ status: true, data: bill, message: "Checkout successfully" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = checkoutCart;
