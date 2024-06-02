const billModel = require("../../models/billModel");

async function updateOrder(req, res) {
  try {
    const { status, selectedOrders } = req.body;
    console.log(req.body);

    const orderUpdate = await billModel.updateMany(
      {
        _id: { $in: selectedOrders },
      },
      {
        status: status,
      }
    ); 
    res.status(200).json({data:orderUpdate,status: true, message: "Order Updated" })
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = updateOrder
