import mongoose from "mongoose";

const objectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    location: String,
  },
  { timestamps: true }
);

const Object = mongoose.model("Object", objectSchema);

export default Object;
