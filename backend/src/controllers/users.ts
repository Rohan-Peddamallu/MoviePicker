import { RequestHandler } from "express";
import UserModel from "../models/users";
import bcrypt from "bcrypt";
import { SignUpBody } from "../validation/users";
import { LoginBody } from "../validation/users"; 
import createHttpError from "http-errors";

export const signup: RequestHandler<unknown,unknown, SignUpBody, unknown> = async (req, res, next) => {
  const name = req.body.body.name;
  const email = req.body.body.email;
  const password = req.body.body.password;
  try{
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const exsistingUser = await UserModel.findOne({ email: email }).exec();
    if (exsistingUser) {
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
  }
  catch (error) {
    next(error);
  }
}

export const login: RequestHandler<unknown,unknown,LoginBody,unknown> = async (req, res, next) => {
  const email = req.body.body.email;
  const password = req.body.body.password;
  try{
    if (!email || !password) {
      throw createHttpError(401, "Please enter all fields");
    }

    const exsistingUser = await UserModel.findOne({ email: email }).exec();
    if (!exsistingUser) {
      throw createHttpError(401, "No user exsists");
    }
    const isPasswordCorrect = await bcrypt.compare(password, exsistingUser.password);
    if (!isPasswordCorrect) {
      throw createHttpError(401, "Invalid credentials");
    }
    res.status(201).json(exsistingUser);
    req.session.userId = exsistingUser._id;
  }
  catch (error) {
    next(error);
  }
}

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try{
    if(!authenticatedUserId){
      throw createHttpError(401, "Not authenticated");
    }
    const user = await UserModel.findById(authenticatedUserId).exec();
    if(!user){
      throw createHttpError(404, "User not found");
    }
    res.status(200).json(user);
  }
  catch(error){
  next(error);
  }
}