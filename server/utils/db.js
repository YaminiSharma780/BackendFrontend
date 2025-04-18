const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("successfully connected to DB");
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

module.exports = connectDB;
