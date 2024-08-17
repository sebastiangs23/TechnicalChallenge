import { Request, Response } from "openai/_shims/auto/types";
import UserRequestDay from "../../models/usersRequestsDay/usersRequestsDayModel";

export async function getUserRequestsDay(req: Request, res: Response) {
  try {
    // const { id_user, day } = req.params;
  } catch (error) {
    console.log(error);
  }
}

//Metodo que se usara en el contralador askAssistant
export async function increaseRequestUserDay(id_user: number, day: Date) {
  try {

    //Refactor the logical to use findOneAndUpdate
    const user = await UserRequestDay.findOne({
      where: {
        id_user,
        day,
      },
    });

    if (user) {
        await UserRequestDay.updateOne({
            where: {
                id_user,
            }
        }, {
            // day: day + 1
        });
    } else {
      await UserRequestDay.create({});
    }
  } catch (error) {
    console.log(error);
  }
}
