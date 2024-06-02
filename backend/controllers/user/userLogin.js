const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found!");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new Error("Wrong password!");
    } else {
        const tokenData = {
            _id: user._id,
            email: user.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
            expiresIn: 60 * 60 * 8,
        });

        const tokenOption = {
            httpOnly: true,
            secure: true,
        };
        res.cookie("token", token,tokenOption).json({
            message: "Login successfully!",
            status: true,
            data: token,
        });
      }

      
    
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: false,
    });
  }
}


module.exports = userLogin
