import { DBInstances } from "../database/config";

export const getAuthorizationByUserId = async (id: number) => {
  const { rows } = await DBInstances.supabase_postgres.query(
    `SELECT * FROM users WHERE id=${id}`
  );

  const user = rows[0];

  return user;
};
