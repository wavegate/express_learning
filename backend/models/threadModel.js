import mongoose from "mongoose";
const Schema = mongoose.Schema;

const threadSchema = new Schema(
  {
    title: String,
    body: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Thread = mongoose.model("Thread", threadSchema);

export default Thread;
