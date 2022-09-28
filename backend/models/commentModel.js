import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    body: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    thread: { type: Schema.Types.ObjectId, ref: "Thread" },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
