import { Request, Response } from "express";
import Assistant from "../../models/assistant/assistant.js";
import mongoose from "mongoose";

export async function getAssistantsUser(req: Request, res: Response){
    try{
        const { id_user } = req.params;
        console.log(id_user);
        const assistances = await Assistant.find({
            id_user: new mongoose.Types.ObjectId(id_user)
        });

        res.json({
            status: 'success',
            assistances
        });

    }catch(error){
        console.log(error);
        res.json({
            status: 'error',
            message: 'Hubo un error al intentar traer a los asistentes.'
        })
    }
};

export async function createAssistant(req: Request, res: Response){
    try{
        const { data } = req.body;
        console.log(data);

        const assistant = await Assistant.create({
            name: data.name,
            id_user: data.id_user,
            speciality: data.speciality
        });

        //validaciones

        res.json({
            status: 'successfull',
            message: 'Asistente creado de manera exitosa!'
        })
    }catch(error){
        console.log(error)
    }
}