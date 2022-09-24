import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dueDate: Date,
    priority: {
      type: String,
      default: "medium",
    },
    complete: {
      type: Boolean,
      default: false,
    },
    user_id: String,
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
