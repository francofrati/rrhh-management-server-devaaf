import { Request, Response } from "express";
import { User } from "../types/users.d";
import { addNewUser } from "../services/services.users";

export const addNewUserController = async (
  req: Request<any, any, User>,
  res: Response
) => {
  try {
    const newUser: User = req.body;

    await addNewUser(newUser);

    return res.status(200).send({
      message: "New user added!",
      user: newUser,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
