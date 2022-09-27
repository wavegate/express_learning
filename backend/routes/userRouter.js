import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import requireAuth from "../middleware/requireAuth.js";

const userRouter = express.Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "31d" });
};

userRouter.get("/", requireAuth);

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}, "email role name bio _id");
    return res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.get("/current", requireAuth);

userRouter.get("/current", async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const user = await User.findOne({ _id: user_id }, "email name bio role");
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.get("/user/:id", requireAuth);

userRouter.get("/user/:id", async (req, res, next) => {
  try {
    const user = await User.findOne(
      { _id: req.params.id },
      "email name bio role"
    );
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post("/user/:id", requireAuth);

userRouter.post("/user/:id", async (req, res, next) => {
  if (req.user._id.toString() !== req.params.id) {
    return res
      .status(400)
      .json({ error: "You can only update your own profile." });
  }
  const { name, bio } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { name: name, bio: bio },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

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
  const { email, password, party } = req.body;

  try {
    const user = await User.register(email, password, party);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default userRouter;
