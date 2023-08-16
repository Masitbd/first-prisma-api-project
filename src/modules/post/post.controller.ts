import { Request, Response } from "express";
import { PostService } from "./post.service";

const insertIntoDb = async (req: Request, res: Response) => {
  try {
    const result = await PostService.insertIntoDb(req.body);
    res.send({
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const UpdatePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const result = await PostService.updatePost(id, data);
    res.send({
      success: true,
      message: "Post updated successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};
const DeletePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await PostService.deletePost(id);
    res.send({
      success: true,
      message: "One post deleted successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getPosts = async (req: Request, res: Response) => {
  // req.query   we get sortby and sortorder that means we get query string for req.query

  const options = req.query;
  console.log(options);
  try {
    const result = await PostService.getPosts(options);
    res.send({
      success: true,
      message: " Post fatched successfully",
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await PostService.getSinglePost(id);
    console.log("log my id", result);
    res.send({
      success: true,
      message: " Single Post fatched successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const PostController = {
  insertIntoDb,
  getPosts,
  getSinglePost,
  UpdatePost,
  DeletePost,
};
