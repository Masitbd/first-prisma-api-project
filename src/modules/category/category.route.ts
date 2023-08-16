import { CategoryController } from "./category.controller";
import express from "express";

const router = express.Router();

/* router.get("/", (req, res) => {
  res.send("Hello prisma");
}); */

router.post("/create-category", CategoryController.insertIntoDb);
// router.post("/profile", UserController.insertOrUpdateProfile);
//router.get("/", UserController.getUsers);
export const CategoryRoutes = router;
