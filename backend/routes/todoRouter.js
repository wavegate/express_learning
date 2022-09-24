import express from "express";
import Todo from "../models/todoModel.js";
import requireAuth from "../middleware/requireAuth.js";
const todoRouter = express.Router();

todoRouter.use(requireAuth);

todoRouter.get("/", (req, res, next) => {
  Todo.find({})
    .sort({ createdAt: "desc" })
    .exec((err, results) => {
      res.json(results);
    });
});

todoRouter.get("/create", (req, res, next) => {
  res.render("create_user");
});

todoRouter.post("/create", async (req, res, next) => {
  const { title, description, dueDate, priority } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Please add a title." });
  }

  try {
    const user_id = req.user._id;
    const todo = await Todo.create({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      user_id: user_id,
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

todoRouter.get("/:id", (req, res, next) => {
  Object.find({ _id: req.params.id }, (err, results) => {
    res.json(results[0]);
  });
});

todoRouter.delete("/:id", (req, res, next) => {
  const deleteObject = async () => {
    const deletedObject = await Object.findOneAndDelete({ _id: req.params.id });
    if (deletedObject) {
      res.status(200).json(deletedObject);
    }
  };
  deleteObject();
});

export default todoRouter;
