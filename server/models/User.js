const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: String,
  password: String,
  resetToken: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema, "users");
