const Users = require("../../models/userModel");

async function allUsers(req, res) {
  try {
    const users = await Users.find();
    res.status(200).json({ status: true, data: users, message: "All users" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = allUsers;
