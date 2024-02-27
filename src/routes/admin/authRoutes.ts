import express from "express";
import { adminRegistration } from "../../controllers/admin/authController";
import { emailValidation, firstNameValidation, lastNameValidation, passwordValidation } from "../validations";
const router = express.Router();

router.post(
  "/register",
  [firstNameValidation, lastNameValidation, emailValidation, passwordValidation],
  adminRegistration
);

export default router;
