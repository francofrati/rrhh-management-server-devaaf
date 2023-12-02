import { DBInstances } from "../database/config";
import { insertInto } from "../database/utils.database";
import { User } from "../types/users.d";

export const addNewUser = async (user: User) => {
  const params = `first_name, last_name, email, phone_number, nationality, national_id, company_id${
    user.profile_img ? ", profile_img" : ""
  }`;

  const values = `'${user.first_name}', '${user.last_name}', '${
    user.email
  }', '${user.phone_number}', '${user.nationality}', '${user.national_id}', ${
    user.company_id
  }${user.profile_img ? ", '" + user.profile_img + "'" : ""}`;

  await insertInto(DBInstances.supabase_postgres, "users", params, values);
};
