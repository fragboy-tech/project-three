import express, { Response, Request } from "express";
import { Users } from "../../db/models/User";

export const authRoutes = express.Router();

authRoutes.post("/register", async (req: Request, res: Response) => {
  const { password, email, username } = req.body;

  const token = await Users.register({ password, email, username });
  res.send(token);
});

authRoutes.post("/login", async (req: Request, res: Response) => {
  const { password, email } = req.body;

  const token = await Users.login({ email, password });
  res.send(token);
});
