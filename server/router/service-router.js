const express = require("express");

const ServicesController = require("../controllers/service-controller");

const router = express.Router();

router.get("/services", ServicesController);

module.exports = router;
