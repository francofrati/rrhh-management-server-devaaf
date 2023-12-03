import { DBInstances } from "../database/config";
import { insertInto } from "../database/utils.database";
import { auth } from "../lib/firebase/config";
import { User } from "../types/users.d";

export const addNewUser = async (user: User) => {
  await addNewUserToDB(user);
  await addNewUserToFirebaseAuth(user.email, user.password as string);
};

const addNewUserToDB = async (user: User) => {
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

const addNewUserToFirebaseAuth = async (email: string, password: string) => {
  await auth.createUser({ email, password });
};
