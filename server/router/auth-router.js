const express = require("express");

const router = express.Router();

const AuthControllers = require("../controllers/auth-controller");

const { loginSchema, registerSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

router.get("/", AuthControllers.HomeController);
router.post(
  "/register",
  validate(registerSchema),
  AuthControllers.RegisterController
);
router.post("/login", validate(loginSchema), AuthControllers.LoginController);

const authMiddleware = require("../middlewares/auth-middleware");
router.get("/user", authMiddleware, AuthControllers.UserController);

module.exports = router;
