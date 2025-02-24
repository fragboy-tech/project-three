import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose.connect().then(() => {
  console.log("connected to MONGO");
});

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("succes");
});

app.listen(3000, () => {
  console.log("listening");
});
