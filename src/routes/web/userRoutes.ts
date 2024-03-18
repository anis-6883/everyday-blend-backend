import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { transformErrorsToMap } from "../../helpers";
import { emailValidation, firstNameValidation, passwordValidation, providerValidation } from "../validations";
const router = express.Router();

router.post("/register", [firstNameValidation, emailValidation, passwordValidation, providerValidation], (req: Request, res: Response) => {
  const errors = validationResult(req);
  const errorMessages: Record<string, string> = transformErrorsToMap(errors.array());

  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errorMessages });
  }

  res.json({ message: "User Registration!" });
});

export default router;
