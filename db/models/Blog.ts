import mongoose, { Model, Document } from "mongoose";

import { blogSchema } from "../schema/blogSchema";

interface IBlog extends Document {
  title: string;
  description: string;
  content: string;
}
interface BLogModel extends Model<IBlog> {
  createBlog({
    title,
    description,
    content,
  }: {
    title: string;
    description: string;
    content: string;
  }): Promise<IBlog>;
  getBlog({ blogId }: { blogId: string }): Promise<IBlog>;

  updateBlog({
    blogId,
    userId,
    title,
    description,
    content,
  }: {
    blogId: string;
    userId: string;
    title: string;
    description: string;
    content: string;
  }): Promise<IBlog>;

  removeBlog({ blogId }: { blogId: string }): Promise<IBlog>;
}

class Blog {
  static async createBlog(
    this: BLogModel,
    {
      title,
      description,
      content,
    }: { title: string; description: string; content: string }
  ): Promise<IBlog> {
    const doc = {
      title,
      description,
      content,
    };
    const blog = await this.create(doc);
    return blog;
  }
  static async getBlog(this: BLogModel, { blogId }: { blogId: string }) {
    const blog = await this.findOne({ _id: { $eq: blogId } });
    return blog;
  }
  static async updateBlog(
    this: BLogModel,
    {
      blogId,
      userId,
      title,
      description,
      content,
    }: {
      blogId: string;
      userId: string;
      title: string;
      description: string;
      content: string;
    }
  ) {
    const blog = await this.findByIdAndUpdate({ _id: { $eq: blogId }, userId });
    return blog;
  }
  static async removeBlog(this: BLogModel, { blogId }: { blogId: string }) {
    const blog = await this.deleteOne({ _id: { $eq: blogId } });
    return blog;
  }
}
blogSchema.loadClass(Blog);
export const Blogs: BLogModel = mongoose.model<IBlog, BLogModel>(
  "Blogs",
  blogSchema
);
