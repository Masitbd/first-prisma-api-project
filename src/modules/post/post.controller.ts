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

// const insertOrUpdateProfile = async (req: Request, res: Response) => {
//   try {
//     const result = await UserService.insertOrUpdateProfile(req.body);
//     res.send({
//       success: true,
//       message: "Profile created/updated successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.send(error);
//   }
// };

const getPosts = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getPosts();
    res.send({
      success: true,
      message: " Post fatched successfully",
      data: result,
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

export const PostController = { insertIntoDb, getPosts, getSinglePost };