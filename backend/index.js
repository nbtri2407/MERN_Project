const express = require("express");
var cookieParser = require('cookie-parser')
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser())

app.use('/api', router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log("MongoDB connected");
  });
});
