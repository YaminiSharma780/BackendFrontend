const { z } = require("zod");

const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .trim()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(255, {
      message: "Name must not be more than 255 characters",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email format",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(255, {
      message: "Password must not be more than 255 characters",
    }),
  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .min(10, { message: "Phone must have at least 10 digits" }),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email format",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(255, {
      message: "Password must not be more than 255 characters",
    }),
});

module.exports = { registerSchema, loginSchema };
