const bcrypt = require("bcrypt");
const userModel = require("../../models/userModel");

async function changePassword(req, res) {
  try {
    const sessionUser = req.userId;
    const { oldPassword, newPassword } = req.body;

    const user = await userModel.findById(sessionUser);
    const checkPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkPassword) {
      throw new Error("Wrong password!");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(newPassword, salt);

      if (!hashPassword) {
        throw new Error("Something went wrong");
      }

      const userUpdate = await userModel.findByIdAndUpdate(sessionUser, {
        password: hashPassword,
      });
      res
        .status(200)
        .json({ status: true, data: userUpdate, message: "Password Changed" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = changePassword;
