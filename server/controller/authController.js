const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const { SECRET_KEY, CLIENT_URL } = require("../utils/config");

const authController = {
  register: async (request, response) => {
    const { email, password } = request.body;
    try {
      const existingUser = await User.findOne({ email: { $eq: email } });
      if (existingUser)
        return response.json({ message: "Account already exists" });
      const hashePassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        password: hashePassword,
        created_at: Date().now,
        updated_at: Date().now,
      });
      await newUser.save();
      response.status(201).json({ message: "Account created succussfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  login: async (request, response) => {
    const { email, password } = request.body;
    try {
      const existingUser = await User.findOne({ email: { $eq: email } });
      if (!existingUser)
        return response.status(404).json({ messaage: "Account not exists" });
      const isPasswordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordMatch)
        return response.status(404).json({ messaage: "Invalid crendentials" });
      response.status(200).json({ messaage: "Logged in succussfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  forgot: async (request, response) => {
    const { email } = request.body;
    try {
      const existingUser = await User.findOne({ email: { $eq: email } });
      if (!existingUser)
        return response.status(404).json({ message: "Account not exists" });

      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
      const resetLink = `${CLIENT_URL}/reset/${token}`;
      existingUser.resetToken = token;
      await existingUser.save();

      await sendEmail(
        email,
        "Reset Link",
        `<p>
          Click <a href=${resetLink}>here</a> to reset your password. The link is
          valid for 1 hour.
        </p>`
      );
      response
        .status(200)
        .json({ message: `Password reset link sent to ${email}` });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  reset: async (request, response) => {
    const { newPassword, confirmPassword } = request.body;
    const { token } = request.params;

    try {
      if (!(newPassword == confirmPassword))
        return response
          .status(404)
          .json({ messaage: "Password does not match" });
      if (!newPassword || !confirmPassword)
        return response
          .status(404)
          .json({ messaage: "Password fields cannot be empty" });

      const hashPassword = await bcrypt.hash(newPassword, 12);

      const decoded = jwt.verify(token, SECRET_KEY);

      const user = await User.findOne({
        email: { $eq: decoded.email },
        resetToken: { $eq: token },
      });

      if (!user)
        return response
          .status(404)
          .json({ messaage: "Invalid or expired token" });

      user.password = hashPassword;
      user.resetToken = null;
      await user.save();

      response.status(200).json({ message: "Password updated succussfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
