const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { CLIENT_URL } = require("./utils/config");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    he
  })
);

app.use(cookieParser());

app.use("/auth", authRoutes);

module.exports = app;
