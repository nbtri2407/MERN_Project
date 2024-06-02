const billModel = require("../../models/billModel");

async function orderHistory(req, res) {
  try {
    const currentUser = req.userId;
    const orderHistory = await billModel
      .find({ user: currentUser })
      .populate("carts");

    res
      .status(200)
      .json({ status: true, data: orderHistory, message: "Order history" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = orderHistory;
