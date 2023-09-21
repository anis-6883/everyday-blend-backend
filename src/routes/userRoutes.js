const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/userController");

// Route for user register
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required!"),
    body("email").isEmail().withMessage("Invalid email format!"),
    body("password").notEmpty().withMessage("Password is required!"),
    body("provider").notEmpty().withMessage("Provider is required!"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
      }

      const { name, email, password, provider } = req.body;
      const userData = {
        name,
        email,
        password,
        provider,
      };

      const newUser = await userController.CreateUser(userData);

      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Route for user login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
      }

      const { email, password } = req.body;

      const data = await userController.SignIn({ email, password });

      return res.json(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Route for user login
router.post(
  "/verify-email",
  [body("otp").notEmpty().withMessage("OTP is required")],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
      }

      const { otp } = req.body;
      const { token } = req.headers;
      const data = await userController.VerifyEmail({ token, otp });

      return res.json(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Route to resend verification email
router.post(
  "/resend-otp",
  [
    body("email").isEmail().withMessage("Invalid email format"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
      }

      const { email } = req.body;

      const data = await userController.ResendOTP({ email });

      return res.json(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);


// Route for user profile
router.post(
  "/profile",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
      }

      const { email } = req.body;

      const data = await userController.GetProfile({ email });

      return res.json(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
