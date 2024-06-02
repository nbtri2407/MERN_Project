const cartProductModel = require("../../models/cartProductModel");

async function productCartSelectedCheckout(req, res) {
    try {
        const { products } = req.body; 
        const cartList = await cartProductModel.find({ _id: { $in: products } }).populate("product"); 
        if (cartList) {
            res.status(200).json({ status: true, data: cartList, message: "Cart" });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

module.exports = productCartSelectedCheckout