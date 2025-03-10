import express, { Response } from "express";
import { Blogs } from "../../db/models/Blog";
import { IAuthRequest, IAuthUser } from "../../src/index";
export const blogRoutes = express.Router();

blogRoutes.post("/", async (req: IAuthRequest, res: Response) => {
  const { title, description, content } = req.body;

  const { userId } = req.user || {}; // login hiisen user id

  const blog = await Blogs.create({ title, description, content, userId });

  res.send(blog);
});

blogRoutes.put("/:blogId", async (req: IAuthRequest, res: Response) => {
  const { userId } = req.user || ({} as IAuthUser);
  const { blogId } = req.params;
  const { title, description, content } = req.body;
  try {
    const blog = await Blogs.updateBlog({
      blogId,
      userId,
      title,
      description,
      content,
    });
    res.send(blog);
  } catch (e) {
    res.send("error");
  }
});

blogRoutes.get("/me", async (req: IAuthRequest, res: Response) => {
  const { userId } = req.user || {};

  try {
    const blog = await Blogs.find({ userId });
    res.send(blog);
  } catch (e) {}
});

blogRoutes.get("/detail/:blogId", async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blogs.getBlog({ blogId });

    res.send(blog);
  } catch (e) {}
});
blogRoutes.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const blog = await Blogs.find({ userId: { $ne: userId } });
    console.log(blog);
    res.send(blog);
  } catch (e) {
    throw new Error();
  }
});
blogRoutes.delete("/:blogId", async (req, res) => {
  const { blogId } = req.params;

  const deleted = await Blogs.removeBlog({ blogId });

  res.send(deleted);
});
