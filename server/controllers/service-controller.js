const Service = require("../models/service-model");

const ServicesController = async (req, res) => {
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

module.exports = ServicesController;