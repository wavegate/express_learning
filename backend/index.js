import express from "express";
const app = express();

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import Object from "./models/objectModel.js";

// await Object.deleteMany({});

// import { LoremIpsum } from "lorem-ipsum";

// const lorem = new LoremIpsum({
//   sentencesPerParagraph: {
//     max: 8,
//     min: 4,
//   },
//   wordsPerSentence: {
//     max: 16,
//     min: 4,
//   },
// });

// for (let i = 0; i < 5; i++) {
//   const newObject = new Object({
//     name: `Object ${i}`,
//     description: lorem.generateSentences(20),
//   });
//   await newObject.save();
// }

// import User from "./models/userModel.js";

// await User.deleteMany({});
// User.register("test@test.com", "ZlxE!9G!ZL40");

import objectRouter from "./routes/objectRouter.js";
app.use("/objects", objectRouter);
import userRouter from "./routes/userRouter.js";
app.use("/users", userRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
