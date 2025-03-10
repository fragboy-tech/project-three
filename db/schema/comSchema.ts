import mongoose from "mongoose";
const schema = mongoose.Schema;

export const comSchema = new schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "coms" }
);
