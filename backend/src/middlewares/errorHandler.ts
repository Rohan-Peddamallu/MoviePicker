import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  let statusCode = 500;
  let errorMessage = "Unknown error occurred";
  
  if (isHttpError(err)) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  } 
  res.status(err.statusCode).json({ message: err.message });
}

export default errorHandler;