require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
const EMAIL_ID = process.env.EMAIL_ID;
const EMAIL_PASS = process.env.EMAIL_PASS;
const CLIENT_URL = process.env.CLIENT_URL;

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET_KEY,
  EMAIL_ID,
  EMAIL_PASS,
  CLIENT_URL,
};
