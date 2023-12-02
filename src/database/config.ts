import { Pool } from "pg";

const DBConfigs = {
  supabase_postgres: {
    credentials: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: 5432,
    },
  },
};

export const DBInstances = {
  supabase_postgres: new Pool(DBConfigs.supabase_postgres.credentials),
};
