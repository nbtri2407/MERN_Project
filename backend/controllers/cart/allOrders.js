const billModel = require("../../models/billModel"); 

async function allOrders(req, res) {
  try {
    const order = await billModel.find().populate({
      path: "carts",
      populate: {
        path: "product",
      },
    });

    res.status(200).json({
        status: true,
        data: order,
        message: "all order"
    })
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = allOrders
