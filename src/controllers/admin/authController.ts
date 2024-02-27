import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { exclude, generatePassword, generateSalt, generateSignature, transformErrorsToMap } from "../../helpers";
import Admin from "../../models/Admin";

// Admin Registration
const adminRegistration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    const errorMessages: Record<string, string> = transformErrorsToMap(errors.array());

    if (!errors.isEmpty()) {
      return res.json({ status: false, errors: errorMessages });
    }

    const { email, password, firstName, lastName } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.json({ status: false, message: "This email already exist!" });
    }

    const salt = await generateSalt();
    const hashedPassword = await generatePassword(password, salt);

    const newAdmin: any = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      salt: salt,
    });

    await newAdmin.save();

    const responseData = exclude(newAdmin._doc, ["__v", "password", "salt", "createdAt", "updatedAt"]);

    const accessToken = generateSignature({ email, role: "admin" }, 60 * 60 * 24); // 1 Day

    return res.json({
      status: true,
      message: "Admin Registered successfully!",
      data: { ...responseData, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export { adminRegistration };
