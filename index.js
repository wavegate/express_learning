import express from "express";
const app = express();

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const objectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    location: String,
  },
  { timestamps: true }
);

objectSchema.virtual("url").get(function () {
  return `/users/${this._id}`;
});

objectSchema.virtual("delete_url").get(function () {
  return `/users/${this._id}/delete`;
});

const Object = mongoose.model("Object", objectSchema);

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
//     name: `Agent ${i}`,
//     description: lorem.generateSentences(5),
//   });
//   await newObject.save();
// }

const objectRouter = express.Router();

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set("views", __dirname);
app.set("view engine", "pug");

app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

objectRouter.get("/", (req, res, next) => {
  Object.find({})
    .sort({ createdAt: "desc" })
    .exec((err, results) => {
      res.json(results);
    });
});

objectRouter.get("/create", (req, res, next) => {
  res.render("create_user");
});

objectRouter.post("/create", (req, res, next) => {
  const newObject = new Object({
    name: req.body.name,
    description: req.body.description,
  });
  newObject.save().then(() => {
    res.json(newObject);
  });
});

objectRouter.get("/:id", (req, res, next) => {
  Object.find({ _id: req.params.id }, (err, results) => {
    // res.render("user", {
    //   user: results[0],
    // });
    res.json(results[0]);
  });
});

objectRouter.delete("/:id", (req, res, next) => {
  const deleteObject = async () => {
    const deletedObject = await Object.findOneAndDelete({ _id: req.params.id });
    if (deletedObject) {
      res.status(200).json(deletedObject);
    }
  };
  deleteObject();
});

app.use("/users", objectRouter);

// app.get("/", (req, res, next) => {
//   res.sendFile(__dirname + "/index.html");
// });

const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
