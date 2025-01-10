const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { CLIENT_URL } = require("./utils/config");

const app = express();

app.use(express.json());

// app.use(
//   cors({
//     origin: CLIENT_URL,
//     credentials: true,
//   })
// );

const allowedOrigins = [CLIENT_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", CLIENT_URL);
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("*", cors());

app.use(cookieParser());

app.use("/auth", authRoutes);

module.exports = app;
