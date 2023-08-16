import { UserController } from "./user.controller";
import express from "express";

const router = express.Router();

/* router.get("/", (req, res) => {
  res.send("Hello prisma");
}); */

router.post("/create-user", UserController.insertIntoDb);
router.post("/profile", UserController.insertOrUpdateProfile);
router.get("/", UserController.getUsers);
export const UserRoutes = router;
