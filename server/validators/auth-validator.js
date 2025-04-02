const { z } = require("zod");

const registerSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
    })
    .trim()
    .min(3, {
      message: "name must be at least 3 characters",
    })
    .max(255, {
      message: "name must not be more than 255 characters",
    }),
  email: z
    .string({
      required_error: "email is required",
    })
    .email({
      message: "invalid email format",
    }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, {
      message: "password must be at least 6 characters",
    })
    .max(255, {
      message: "password must not be more than 255 characters",
    }),
  phone: z
    .string({
      required_error: "phone number is required",
    })
    .min(10, { message: "phone must have at least 10 digits" }),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email({
      message: "invalid email format",
    }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, {
      message: "password must be at least 6 characters",
    })
    .max(255, {
      message: "password must not be more than 255 characters",
    }),
});

module.exports = { registerSchema, loginSchema };
