import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "31d" });
};

userRouter.get("/login", (req, res, next) => {
  res.json({ message: "Get login" });
});

userRouter.get("/register", (req, res, next) => {
  res.json({ message: "Get register" });
});

userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post("/register", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.register(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default userRouter;
