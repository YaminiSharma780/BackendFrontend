const User = require("../models/user-model");

const HomeController = async (req, res) => {
  try {
    res.status(200).send("home page at auth-controller");
  } catch (error) {
    console.log(error);
  }
};

const RegisterController = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { username, email, phone, password } = req.body;

    const userExists = await User.findOne({ email: email });
    console.log("User exists:", userExists);

    if (userExists) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const newUser = await User.create({
      username,
      email,
      phone,
      password,
    });
    console.log("New user created:", newUser);

    res.status(201).json({
      data: newUser,
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.error("Error in RegisterController:", error);
    next(error);
  }
};

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    console.log("User exists:", userExists);

    if (!userExists) {
      return res.status(400).json({ msg: "please register yourself" });
    }

    const user = await userExists.comparePassword(password);

    if (user) {
      res.status(200).json({
        data: "Login Successful",
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "invalid credentials" });
    }
  } catch (error) {
    console.error("Error in LoginController:", error);
    next(error);
  }
};

const UserController = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    res.status(200).json({ userData });
  } catch (error) {
    console.log("Error in UserController");
  }
};

module.exports = {
  HomeController,
  RegisterController,
  LoginController,
  UserController,
};
