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
