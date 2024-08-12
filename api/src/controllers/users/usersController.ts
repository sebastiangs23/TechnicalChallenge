import { Request, Response } from "express";
import User from "../../models/users/usersModel.js";
import TypeUser from "../../models/users/typeUsers.js";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find({});

    console.log("los usuarios --> ", users);

    res.json(users);
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const {} = req.body;

    const idUserType = await TypeUser.findOne({ name: "user"}).select("_id");

    console.log('idUserType: ', idUserType);

    const user = await User.create({
      name: "user_test",
      last_name: "just test",
      email: "test@gmail.com",
      age: 23,
      password: "test",
      id_type_user: idUserType ? idUserType._id : null

    });
    console.log("User created:", user);

    res.json({ message: "All gucci :3" });
  } catch (error) {
    console.log(error);
  }
}

export async function getTypeUsers(req: Request, res: Response) {
  try {
    // const typeUsers = await TypeUser.create({
    //   name: "user",
    // });

    // console.log("Se creo de manera exitosa!");
    // res.json(typeUsers);
  } catch (error) {
    console.log(error);
  }
}
