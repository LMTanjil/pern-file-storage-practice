import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const {Pool} = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log("Connected to PostgresSQL Database!");
});

pool.on('error', (err) => {
    console.error('Unexpected PostgreSQL error', err);
    process.exit(-1);
});

export default  pool;