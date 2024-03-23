import { body } from "express-validator";

export const emailValidation = body("email")
  .trim()
  .isEmail()
  .withMessage("Email is invalid!")
  .notEmpty()
  .withMessage("Email is required!");

export const firstNameValidation = body("firstName").trim().notEmpty().withMessage("First Name is required!");

export const lastNameValidation = body("lastName").trim().notEmpty().withMessage("Last Name is required!");

export const providerValidation = body("provider")
  .trim()
  .isIn(["email", "google"])
  .withMessage("Provider is invalid!")
  .notEmpty()
  .withMessage("Provider is required!");

export const passwordValidation = body("password")
  .trim()
  .notEmpty()
  .withMessage("Password is required!")
  .isLength({ min: 8 })
  .withMessage("Password length at least 8 characters!");

export const weakPasswordValidation = body("password").trim().notEmpty().withMessage("Password is required!");

export const strongPasswordValidation = body("password")
  .trim()
  .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  .withMessage("Password length at least 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol!");
