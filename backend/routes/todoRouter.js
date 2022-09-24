import express from "express";
import Todo from "../models/todoModel.js";
import requireAuth from "../middleware/requireAuth.js";
const todoRouter = express.Router();

todoRouter.use(requireAuth);

todoRouter.get("/", async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const todos = await Todo.find({ user_id: user_id }).sort({
      createdAt: "desc",
    });
    return res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

todoRouter.post("/create", async (req, res, next) => {
  const { title, description, dueDate, priority } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Please add a title." });
  }
  console.log(dueDate);

  try {
    const user_id = req.user._id;
    const todo = await Todo.create({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      user_id: user_id,
    });
    console.log(todo.dueDate);
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

todoRouter.post("/update", async (req, res, next) => {
  const { title, description, dueDate, priority, _id } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Please add a title." });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(
      { _id: _id },
      {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
      },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

todoRouter.delete("/delete", async (req, res, next) => {
  const { item_id } = req.body;
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: item_id });
    res.status(200).json(deletedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default todoRouter;
