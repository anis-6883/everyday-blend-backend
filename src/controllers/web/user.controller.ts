import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { apiResponse, asyncHandler, transformErrorsToMap } from "../../helpers";

export const userRegistration = asyncHandler((req: Request, res: Response) => {
  const errors = validationResult(req);
  const errorMessages: Record<string, string> = transformErrorsToMap(errors.array());

  if (!errors.isEmpty()) {
    return apiResponse(res, 400, false, "Invalid data!", errorMessages);
  }

  return apiResponse(res, 200, true, "User Registration!");
});
