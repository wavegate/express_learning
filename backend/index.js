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

// import Object from "./models/objectModel.js";

// await Object.deleteMany({});

// // import { LoremIpsum } from "lorem-ipsum";

// // const lorem = new LoremIpsum({
// //   sentencesPerParagraph: {
// //     max: 8,
// //     min: 4,
// //   },
// //   wordsPerSentence: {
// //     max: 16,
// //     min: 4,
// //   },
// // });

// // for (let i = 0; i < 5; i++) {
// //   const newObject = new Object({
// //     name: `Object ${i}`,
// //     description: lorem.generateSentences(20),
// //   });
// //   await newObject.save();
// // }

// import User from "./models/userModel.js";
// await User.deleteMany({});
// User.register("test@test.com", "ZlxE!9G!ZL40");

import objectRouter from "./routes/objectRouter.js";
app.use("/objects", objectRouter);
import userRouter from "./routes/userRouter.js";
app.use("/users", userRouter);
import todoRouter from "./routes/todoRouter.js";
app.use("/todos", todoRouter);

const port = 8000;
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
  socket.on("setup", (userToken) => {
    const user = jwt_decode(userToken);
    socket.join(user._id);
    console.log(`${user._id} connected`);
    socket.emit(`${user._id} connected`);
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });
  socket.on("new message", (newMessageReceived) => {
    // const chat = newMessageReceived.chat;
    // if (!chat.users) return console.log("chat.users not defined");
    // chat.users.forEach((user) => {
    //   if (user._id == newMessageReceived.sender._id) {
    //     return;
    //   } else {
    //     socket.in(user._id).emit("message received", newMessageReceived);
    //   }
    // });
    socket.emit("message received", newMessageReceived);
    // socket.in("live_class").emit("message received", newMessageReceived);
  });
});
