import dotenv from 'dotenv';
import server from './src/server'
import { Pool, PoolConfig } from 'pg';

//For env File 
dotenv.config();

const port = process.env.PORT || 8000;

const psql = `postgresql://postgres:${process.env.DB_PASSWORD}@db.ygwclzmqydlamvodouok.supabase.co:5432/postgres`

const pgCredentials: PoolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432
}

async function pgPool() {
    const pool = new Pool(pgCredentials)
    const testQuery = await pool.query("SELECT * FROM users")
    console.log(testQuery.rows)
    await pool.end()
}
pgPool().then(() => {
    server.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`);
    });
})
