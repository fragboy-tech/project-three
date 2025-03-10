import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { blogRoutes } from "../modules/blog/routes";
import { userRoutes } from "../modules/user/routes";
import { authRoutes } from "../modules/auth/routes";

dotenv.config();
mongoose.connect(process.env.MONGO_URL as string).then(() => {
  console.log("connected to MONGO");
});

const app = express();

app.use(express.json());

export interface IAuthUser {
  userId: string;
}

export interface IAuthRequest extends Request {
  user?: IAuthUser;
}

const authMiddleware = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"] || "";

  if (!authHeader) {
    res.send("Token!!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as IAuthUser;

    req.user = user;

    next();
  } catch (e) {
    res.send("Auth token invalid");
  }
};

app.use("/", authRoutes);

app.use("/user", authMiddleware, userRoutes);

app.use("/blogs", authMiddleware, blogRoutes);

//app.use("/comments", authMiddleware, comRoutes);

//app.use("comments", authMiddleware, comRoutes);

app.listen(3000, () => {
  console.log("app running on 3000");
});
