import { body } from "express-validator";

const emailValidation = body("email")
  .trim()
  .notEmpty()
  .withMessage("Email is required!")
  .isEmail()
  .withMessage("Email is invalid!");

const nameValidation = body("name").trim().notEmpty().withMessage("Name is required!");

const providerValidation =   body("provider")
.trim()
.isIn(["email", "google"])
.withMessage("Provider is invalid!")
.notEmpty()
.withMessage("Provider is required!");

const passwordValidation = body("password")
  .trim()
  .notEmpty()
  .withMessage("Password is required!")
  .isLength({ min: 8 })
  .withMessage("Password length at least 8 characters!");

export { emailValidation, nameValidation, passwordValidation, providerValidation };

