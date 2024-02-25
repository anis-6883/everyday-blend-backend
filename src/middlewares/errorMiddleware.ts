import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Check if the error is a known mongoose error (Database-related)
  const status = err.code && err.meta && err.meta.target ? 400 : 500;
  const message = err.message || "Internal Server Error!";

  res.status(status).json({ status: false, message });
};

export default errorMiddleware;
