import { DBInstances } from "../database/config";
import { insertInto } from "../database/utils.database";
import { auth } from "../lib/firebase/config";
import { User } from "../types/users.d";

export const addNewUser = async (user: User) => {
  const { uid } = await addNewUserToFirebaseAuth(
    user.email,
    user.password as string
  );
  await addNewUserToDB({
    ...user,
    firebase_uid: uid,
  }).catch((err) => {
    if (uid) {
      removeUserFromFirebase(uid);
    }
    throw Error(err.message);
  });
};

const addNewUserToDB = async (user: User) => {
  const params = `first_name, last_name, email, phone_number, nationality, national_id, firebase_uid, company_id${
    user.profile_img ? ", profile_img" : ""
  }`;

  const values = `'${user.first_name}', '${user.last_name}', '${
    user.email
  }', '${user.phone_number}', '${user.nationality}', '${user.national_id}', '${
    user.firebase_uid
  }', ${user.company_id}${
    user.profile_img ? ", '" + user.profile_img + "'" : ""
  }`;

  await insertInto(DBInstances.supabase_postgres, "users", params, values);
};

const addNewUserToFirebaseAuth = async (email: string, password: string) => {
  return await auth.createUser({ email, password });
};

const removeUserFromFirebase = async (uid: string) => {
  await auth.deleteUser(uid);
};

export const getUserById = async (id: number) => {
  const { rows } = await DBInstances.supabase_postgres.query(
    `SELECT users.*, companies.brand_img FROM users LEFT JOIN companies ON users.company_id=companies.id WHERE users.id=${id}`
  );

  const user = rows[0];

  return user;
};

export const getHierarchyByUserId = async (id: number, DBInstances: any) => {
  const { rows } = await DBInstances.query(
    `select "usersHierarchy".*, "hierarchyLevels".name from "usersHierarchy" left join "hierarchyLevels" on "usersHierarchy".hierarchy_id = "hierarchyLevels".id where "usersHierarchy".user_id = ${id}`
  );

  return rows[0];
};
