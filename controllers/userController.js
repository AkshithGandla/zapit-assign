const mongoose = require("mongoose");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//controller to handle SignUp
exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hasing password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //pushing user into Atlas with hashed password
    user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    /*   const payload = {
      user: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    res.cookie("token", token, { httpOnly: true, expiresIn: 360000 }); */

    const { password: pass, ...rest } = user._doc;

    res.status(201).json({
      message: "User created successfully",
      user: rest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

//Controller to handle Logging in
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    /* res.cookie("token", token, { httpOnly: true, expiresIn: 360000 }); */

    const { password: pass, ...rest } = user._doc;

    res.status(201).json({
      message: "User logged in successfully",
      user: rest,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

//Logout controller
exports.logout = async (req, res, next) => {
  console.log(req);
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};
