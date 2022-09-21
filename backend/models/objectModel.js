import mongoose from "mongoose";

const objectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    location: String,
  },
  { timestamps: true }
);

objectSchema.virtual("url").get(function () {
  return `/users/${this._id}`;
});

objectSchema.virtual("delete_url").get(function () {
  return `/users/${this._id}/delete`;
});

const Object = mongoose.model("Object", objectSchema);

export default Object;
