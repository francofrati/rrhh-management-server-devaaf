import { Request, Response } from "express";
import { getUserById, getHierarchyByUserId } from "../services/services.users";
import { DBInstances } from "../database/config";

export const getAuthorizationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.body;

    const user = await getUserById(id);
    const userHierarchy = await getHierarchyByUserId(
      id,
      DBInstances.supabase_postgres
    );

    return res.send({
      company: user.company_id,
      profileImg: user.profile_img,
      name: user.first_name + " " + user.last_name,
      companyImg: user.brand_img,
      lvl: userHierarchy.name,
    });
  } catch (error: any) {
    return res.status(400).send({
      message: error.mesage,
    });
  }
};
