import mongoose from "mongoose";

const schema = mongoose.Schema;

export const blogSchema = new schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    userId: { type: schema.ObjectId, ref: "Users" },
  },
  { timestamps: true, collection: "blogs" }
);
