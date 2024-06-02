const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (!token) {
        return res.status(200).json({
          status: false,
          message: "Please Login First",
        });
      }

      if (err) {
        console.log("error auth", err);
      }
      req.userId = decoded?._id;
      next();
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: false,
      data: [],
    });
  }
}

module.exports = authToken;
