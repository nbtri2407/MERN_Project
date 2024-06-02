const userModel = require("../../models/userModel");

async function userDetails(req, res) {
  try {
    const user = await userModel.findById(req.userId);
    res.status(200).json({ status: true, data: user, message: "User details" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = userDetails;
