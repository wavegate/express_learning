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

import cors from "cors";
app.use(cors());
import compression from "compression";
app.use(compression());
import helmet from "helmet";
app.use(helmet());

// import Object from "./models/objectModel.js";

// await Object.deleteMany({});

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

// // for (let i = 0; i < 5; i++) {
// //   const newObject = new Object({
// //     name: `Object ${i}`,
// //     description: lorem.generateSentences(20),
// //   });
// //   await newObject.save();
// // }

// import User from "./models/userModel.js";
// await User.deleteMany({});
// for (let i = 0; i < 5; i++) {
//   const extra = {
//     name: "Test name " + i,
//     bio: lorem.generateSentences(20),
//     role: "student",
//   };
//   User.register(`test${i}@test.com`, "ZlxE!9G!ZL40", null, extra);
// }
// for (let i = 5; i < 10; i++) {
//   const extra = {
//     name: "Test name " + i,
//     bio: lorem.generateSentences(20),
//     role: "teacher",
//   };
//   User.register(`test${i}@test.com`, "ZlxE!9G!ZL40", null, extra);
// }
//  User.register("test@test.com", "ZlxE!9G!ZL40");
//  User.register("test1@test.com", "ZlxE!9G!ZL40");
// User.register("test2@test.com", "ZlxE!9G!ZL40");
// User.register("test3@test.com", "ZlxE!9G!ZL40");
// User.register("test4@test.com", "ZlxE!9G!ZL40");
// User.register("test5@test.com", "ZlxE!9G!ZL40");
// User.register("test6@test.com", "ZlxE!9G!ZL40");
// User.register("test7@test.com", "ZlxE!9G!ZL40");

// import Thread from "./models/threadModel.js";
// await Thread.deleteMany({});

import objectRouter from "./routes/objectRouter.js";
app.use("/objects", objectRouter);
import userRouter from "./routes/userRouter.js";
app.use("/users", userRouter);
import todoRouter from "./routes/todoRouter.js";
app.use("/todos", todoRouter);
import threadRouter from "./routes/threadRouter.js";
app.use("/threads", threadRouter);
import commentRouter from "./routes/commentRouter.js";
app.use("/comments", commentRouter);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});

import { Server } from "socket.io";
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

import jwt_decode from "jwt-decode";

io.on("connection", (socket) => {
  socket.on("join chat", (userToken) => {
    const user = jwt_decode(userToken);
    socket.join("live_class");
    console.log(`${user._id} joined room: live_class`);
  });
  socket.on("new message", (newMessageReceived) => {
    socket.emit("message received", newMessageReceived);
    socket.broadcast.emit("message received", newMessageReceived);
  });
});
