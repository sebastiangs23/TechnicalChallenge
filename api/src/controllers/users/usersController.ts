import { Request, Response } from "express";
import User from "../../models/users/usersModel.js";
import TypeUser from "../../models/users/typeUsers.js";
import CryptoJS from "crypto-js";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(req: Request, res: Response){
  try{
    const { form } = req.body;

    
  }catch(error){
    console.log(error)
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { form } = req.body;

    console.log(form)

    const idUserType = await TypeUser.findOne({ name: "user"}).select("_id");

    const passwordCrypted = CryptoJS.AES.encrypt(form.password, 'password').toString();

    //const desencrypted = CryptoJS.AES.decrypt(passwordCrypted, 'password');
    //let original = desencrypted.toString(CryptoJS.enc.Utf8);

    //console.log('la clave desemcriptada: ', original)

    const user = await User.create({
      name: form.name,
      last_name: form.last_name,
      email: form.email,
      age: form.age,
      password: passwordCrypted,
      id_type_user: idUserType ? idUserType._id : null

    });
    console.log("User created:", user);

    res.json({ message: "El usuario fue creado de manera exitosa!!" });
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
