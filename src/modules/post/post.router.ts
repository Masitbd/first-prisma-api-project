import { PostController } from "./post.controller";
import express from "express";

const router = express.Router();

/* router.get("/", (req, res) => {
  res.send("Hello prisma");
}); */

router.post("/create-post", PostController.insertIntoDb);
router.get("/:id", PostController.getSinglePost);
router.get("/", PostController.getPosts);
// router.post("/profile", UserController.insertOrUpdateProfile);
//router.get("/", UserController.getUsers);
export const PostRoutes = router;
