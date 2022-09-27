import express from "express";
import Thread from "../models/threadModel.js";
import requireAuth from "../middleware/requireAuth.js";
const threadRouter = express.Router();

threadRouter.use(requireAuth);

threadRouter.get("/", async (req, res, next) => {
  try {
    const threads = await Thread.find({})
      .populate("author", "name role")
      .sort({
        createdAt: "desc",
      })
      .exec();
    return res.status(200).json(threads);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

threadRouter.post("/create", async (req, res, next) => {
  const { title, body } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Please add a title." });
  }
  try {
    const user = req.user;
    const thread = await Thread.create({
      title: title,
      body: body,
      author: user.id,
    });
    const returnThread = await Thread.findOne({ _id: thread._id })
      .populate("author", "name role")
      .exec();
    res.status(200).json(returnThread);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

threadRouter.post("/update", async (req, res, next) => {
  const { title, body, _id } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Please add a title." });
  }

  try {
    const thread = await Thread.findByIdAndUpdate(
      { _id: _id },
      {
        title: title,
        body: body,
      },
      { new: true }
    );
    const returnThread = await Thread.findOne({ _id: thread._id })
      .populate("author", "name role")
      .exec();
    res.status(200).json(returnThread);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

threadRouter.delete("/delete", async (req, res, next) => {
  const { id } = req.body;
  try {
    const deletedThread = await Thread.findOneAndDelete({ _id: id });
    res.status(200).json(deletedThread);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default threadRouter;
