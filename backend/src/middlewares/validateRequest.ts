import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { Schema } from "zod";
import * as z from "zod";

const validateRequestSchema = (schema: Schema): RequestHandler => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req);
      next();
    } catch (error) {
      if(error instanceof z.ZodError) {
       next(createHttpError(400, error.message));
      }
      else {
        next(error);
      }
    }
  };
}

export default validateRequestSchema;