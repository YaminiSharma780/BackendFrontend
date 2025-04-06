const express = require("express");

const AdminController = require("../controllers/admin-controller");

const router = express.Router();

router.get("/users", AdminController.GetAllUsersAdminController);

router.delete("/user/:id", AdminController.DeleteUserAdminController);

router.get("/contacts", AdminController.GetAllContactsAdminController);

router.delete("/contact/:id", AdminController.DeleteContactAdminController);

router.get("/services", AdminController.GetAllServicesAdminController);

router.delete("/service/:id", AdminController.DeleteServiceAdminController);

router.post("/login", AdminController.AdminLoginController);

router.post("/register", AdminController.AdminRegisterController);

module.exports = router;
