const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tringuyen.24072002@gmail.com",
    pass: "Tri@654321",
  },
});



