import { RequestHandler } from "express";
import UserModel from "../models/users";
import bcrypt from "bcrypt";

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

export const signup: RequestHandler<unknown,unknown, SignUpBody, unknown> = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
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
    res.status(201).json(user);
  }
  catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error)
  }
}

export const login: RequestHandler = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try{
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const exsistingUser = await UserModel.findOne({ email: email }).exec();
    if (!exsistingUser) {
      return res.status(401).json({ message: "No User exsists" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, exsistingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(201).json(exsistingUser);
  }
  catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error)
  }
}