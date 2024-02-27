import { body } from "express-validator";

const emailValidation = body("email")
  .trim()
  .isEmail()
  .withMessage("Email is invalid!")
  .notEmpty()
  .withMessage("Email is required!");

const firstNameValidation = body("firstName").trim().notEmpty().withMessage("First Name is required!");

const lastNameValidation = body("lastName").trim().notEmpty().withMessage("Last Name is required!");

const providerValidation = body("provider")
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

const strongPasswordValidation = body("password")
  .trim()
  .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  .withMessage("Password length at least 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol!");

export {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  providerValidation,
  strongPasswordValidation,
};
