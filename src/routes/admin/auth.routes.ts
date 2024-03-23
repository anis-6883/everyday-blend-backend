import express from "express";
import { adminLogin, adminRegistration } from "../../controllers/admin/auth.controller";
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  weakPasswordValidation,
} from "../validations";
const router = express.Router();

router.post(
  "/register",
  [firstNameValidation, lastNameValidation, emailValidation, passwordValidation],
  adminRegistration
);

router.post("/login", [emailValidation, weakPasswordValidation], adminLogin);

export default router;
