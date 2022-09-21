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

await Object.deleteMany({});

import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

for (let i = 0; i < 5; i++) {
  const newObject = new Object({
    name: `Agent ${i}`,
    description: lorem.generateSentences(5),
  });
  await newObject.save();
}

import objectRouter from "./routes/objectRouter.js";
app.use("/users", objectRouter);

// app.get("/", (req, res, next) => {
//   res.sendFile(__dirname + "/index.html");
// });

const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
