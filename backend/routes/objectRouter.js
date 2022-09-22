import express from "express";
import Object from "../models/objectModel.js";
import requireAuth from "../middleware/requireAuth.js";
const objectRouter = express.Router();

objectRouter.use(requireAuth);

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

objectRouter.post("/create", async (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }

  try {
    const object = await Object.create({ name, description });
    res.status(200).json(object);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

objectRouter.get("/:id", (req, res, next) => {
  Object.find({ _id: req.params.id }, (err, results) => {
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

export default objectRouter;
