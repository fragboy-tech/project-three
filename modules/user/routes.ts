import express, { Request, Response, NextFunction } from "express";
import { Users } from "../../db/models/User";

export const userRoutes = express.Router();

// Interface for the request body (for /get-token)
interface GetTokenRequest extends Request {
  body: {
    email: string;
  };
}

// Interface for the user object (to match the User schema)
interface User {
  _id: string;
  email: string;
  getToken(): string;
  // Add other fields based on your user schema
}

interface IUser {
  userId: string;
}

interface IRequest extends Request {
  user?: IUser;
}
// /get-token route
userRoutes.get("/get-token", async (req: GetTokenRequest, res: Response) => {
  const { email } = req.body;

  try {
    const user: User | null = await Users.findOne({ email });

    if (user) {
      res.send(user.getToken());
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    res.status(500).send(e instanceof Error ? e.message : "Error");
  }
});

// /profile route
userRoutes.get("/profile", async (req: IRequest, res: Response) => {
  const { userId } = req.user as IUser;

  try {
    const user: User | null = await Users.findOne({ _id: { $eq: userId } });

    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    res.status(500).send("Error retrieving user profile");
  }
});

// /profile/:userId route
userRoutes.get("/profile/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const otherUser: User | null = await Users.findOne({
      _id: { $eq: userId },
    });

    if (otherUser) {
      res.send(otherUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    res.status(500).send("Error retrieving user profile");
  }
});

// /others route
userRoutes.get("/others", async (req: IRequest, res: Response) => {
  const { userId } = req.user as { userId: string }; // Assuming `user` is attached to `req` in middleware

  try {
    const users = await Users.find({ _id: { $ne: userId } });

    res.send(users);
  } catch (e) {
    res.status(500).send("Error retrieving users");
  }
});

// /update route
userRoutes.put("/", async (req: IRequest, res: Response) => {
  const { userId: myid } = req.user as { userId: string }; // Assuming `user` is attached to `req` in middleware

  try {
    const user = await Users.findOneAndUpdate(
      { _id: { $eq: myid } },
      { $set: req.body },
      { new: true }
    );
    res.send(user);
  } catch (e) {
    res.status(500).send("Error updating user");
  }
});
