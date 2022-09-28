import express from "express";
import Comment from "../models/commentModel.js";
import Thread from "../models/threadModel.js";
import requireAuth from "../middleware/requireAuth.js";
const commentRouter = express.Router();

commentRouter.use(requireAuth);

commentRouter.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find({})
      .populate("author", "name role")
      .sort({
        createdAt: "desc",
      })
      .exec();
    return res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

commentRouter.post("/create/:id", async (req, res, next) => {
  const { body } = req.body;
  try {
    const user = req.user;
    const thread = await Thread.findOne({ _id: req.params.id });
    const comment = await Comment.create({
      body: body,
      author: user.id,
      thread: thread._id,
    });
    thread.comments.push(comment);
    thread.save();
    const returnComment = await Comment.findOne({ _id: comment._id })
      .populate("author", "name role")
      .exec();
    res.status(200).json(returnComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

commentRouter.post("/update", async (req, res, next) => {
  const { body, _id } = req.body;

  try {
    const comment = await Comment.findByIdAndUpdate(
      { _id: _id },
      {
        body: body,
      },
      { new: true }
    );
    const returnComment = await Comment.findOne({ _id: comment._id })
      .populate("author", "name role")
      .exec();
    res.status(200).json(returnComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

commentRouter.delete("/delete", async (req, res, next) => {
  const { _id } = req.body;
  try {
    const deletedComment = await Comment.findOneAndDelete({ _id: _id });
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default commentRouter;
