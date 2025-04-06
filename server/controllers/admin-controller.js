const Contact = require("../models/contact-model");
const Service = require("../models/service-model");
const User = require("../models/user-model");

const GetAllUsersAdminController = async (req, res) => {
  try {
    const response = await User.find({}, "-password");
    if (!response) {
      res.status(404).json({ msg: "No users found" });
      return;
    }
    res.status(200).json({ response });
  } catch (error) {
    console.log(`users : ${error}`);
  }
};
const GetAllContactsAdminController = async (req, res) => {
  try {
    const response = await Contact.find();
    if (!response) {
      res.status(404).json({ msg: "No contacts found" });
      return;
    }
    res.status(200).json({ response });
  } catch (error) {
    console.log(`contacts : ${error}`);
  }
};

const GetAllServicesAdminController = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ msg: "No service found" });
      return;
    }
    res.status(200).json({ response });
  } catch (error) {
    console.log(`services : ${error}`);
  }
};

const AdminRegisterController = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { username, email, phone, password, isAdmin } = req.body;

    const userExists = await User.findOne({ email: email });
    console.log("Admin exists:", userExists);

    if (userExists) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    const newUser = await User.create({
      username,
      email,
      phone,
      password,
      isAdmin: true,
    });
    console.log("New admin created:", newUser);

    res.status(201).json({
      data: newUser,
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.error("Error in AdminRegisterController:", error);
    // next(error);
  }
};

const AdminLoginController = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    const userExists = await User.findOne({ email: email });
    console.log("Admin exists:", userExists);

    if (!userExists) {
      return res.status(400).json({ msg: "Please register yourself" });
    }

    if (userExists.isAdmin === isAdmin) {
      const user = await userExists.comparePassword(password);

      console.log("Password comparison result:", user);

      if (user) {
        res.status(200).json({
          data: "Admin Login Successful",
          token: await userExists.generateToken(),
          userId: userExists._id.toString(),
        });
      } else {
        res.status(401).json({ msg: "Invalid Admin credentials" });
      }
    } else {
      res.status(401).json({ msg: "You are not Admin" });
    }
  } catch (error) {
    console.error("Error in AdminLoginController:", error);
    // next(error);
  }
};

module.exports = {
  GetAllUsersAdminController,
  GetAllContactsAdminController,
  GetAllServicesAdminController,
  AdminLoginController,
  AdminRegisterController,
};
