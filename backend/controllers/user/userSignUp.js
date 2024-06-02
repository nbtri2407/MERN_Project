const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");

async function userSignUp(req, res) {
  try {
    const { name, email, password ,confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }

    const user = await userModel.findOne({email})

    if(user){
        throw new Error("E-mail is being used.")
    }

    if(password !== confirmPassword){
        throw new Error("Password does not match.")
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong");
    }

    const payload = {
      name,
      email,
      role: "GENERAL",
      password: hashPassword,
      cartProducts: [],
    };

    const userData = await new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      message: "User Created Successfully",
      status: true,
      data: saveUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: false,
    });
  }
}

module.exports = userSignUp;
