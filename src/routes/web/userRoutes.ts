import express from "express";
import { userRegistration } from "../../controllers/web/user.controller";
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  providerValidation,
} from "../validations";

const router = express.Router();

router.post(
  "/register",
  [firstNameValidation, lastNameValidation, emailValidation, passwordValidation, providerValidation],
  userRegistration
);

export default router;
