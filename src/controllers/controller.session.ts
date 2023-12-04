import { Request, Response } from "express";
import { getUserById } from "../services/services.users";

export const getAuthorizationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.body;

    const user = await getUserById(id);

    return res.send({
      company: user.company_id,
      profileImg: user.profile_img,
      name: user.first_name + " " + user.last_name,
      companyImg: user.brand_img,
    });
  } catch (error: any) {
    return res.status(400).send({
      message: error.mesage,
    });
  }
};
