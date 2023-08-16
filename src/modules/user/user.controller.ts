import { Request, Response } from "express";
import { UserService } from "./user.service";

const insertIntoDb = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertIntoDb(req.body);
    res.send({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const insertOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertOrUpdateProfile(req.body);
    res.send({
      success: true,
      message: "Profile created/updated successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUsers();
    res.send({
      success: true,
      message: "Data fatched successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const UserController = { insertIntoDb, insertOrUpdateProfile, getUsers };
