const userModel = require("../../models/userModel");

async function updateUser(req, res) {
  try { 
    const { _id, email, name,phone,address, role } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(phone && { phone: phone }),
      ...(address && { address: address }),
      ...(role && { role: role }),
    };
    const updateUser = await userModel.findByIdAndUpdate(_id, payload);
    res
      .status(200)
      .json({ status: true, data: updateUser, message: "User Updated" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = updateUser;
