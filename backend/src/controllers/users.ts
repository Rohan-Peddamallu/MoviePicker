import { RequestHandler } from "express";
import UserModel from "../models/users";
import bcrypt from "bcrypt";
import { SignUpBody } from "../validation/users";
import { LoginBody } from "../validation/users";
import createHttpError from "http-errors";

export const signup: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingUser = await UserModel.findOne({ email: email }).exec();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw createHttpError(401, "Please enter all fields");
    }

    const existingUser = await UserModel.findOne({ email: email }).exec();
    if (!existingUser) {
      throw createHttpError(401, "No user exists");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      throw createHttpError(401, "Invalid credentials");
    }
    req.session.userId = existingUser._id;
    res.status(200).json(existingUser);
  } catch (error) {
    next(error);
  }
};

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const authenticatedUserId = req.session.userId;
    if (!authenticatedUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await UserModel.findById(authenticatedUserId).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
