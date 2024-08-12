import { Request, Response } from "express";
import User from "../../models/users/usersModel.js";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find({});

    console.log("los usuarios :3", users);

    res.json(users);
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const {} = req.body;

    const user = await User.create({
      name: "idk",
      last_name: "idk",
      email: "idk",
      age: 23,
      password: "idk",
    });
    console.log("User created:", user);

    res.json({ message: "All gucci :3" });
  } catch (error) {
    console.log(error);
  }
}
