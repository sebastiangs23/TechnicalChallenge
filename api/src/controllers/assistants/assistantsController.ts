import { Request, Response } from "express";
import Assistant from "../../models/assistant/assistant";

export async function getAssistantsUser(req: Request, res: Response){
    try{
        const { id_user } = req.params;
        console.log();
    }catch(error){
        console.log(error);
    }
};

export async function createAssistant(req: Request, res: Response){
    try{
        const { data } = req.body;

        const assistant = await Assistant.create({
            
        });

        res.json({
            status: 'successfull',
            message: 'Asistente creado de manera exitosa!'
        })
    }catch(error){
        console.log(error)
    }
}