const User = require("../models/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { username, email, password, accountType } = req.body;

  try {

    let user = await User.findOne({ username });

    if (user) return res.status(400).json({
      success: false,
      message: "User already exist."
    });

    const securePassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: securePassword,
      accountType
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully."
    })

  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    })
  }
};

// Login 
const login = async (req, res) => {

};

module.exports = { signup, login }