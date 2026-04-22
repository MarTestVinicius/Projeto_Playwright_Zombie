require ('dotenv').config();

import { Pool } from 'pg';

const Dbconfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

export async function ExecutarSQL(sqlScript) {

    try {
        const pool = new Pool(Dbconfig);
        const cliente = await pool.connect();
        const resultado = await cliente.query(sqlScript);
        cliente.release();
    }
    catch (error) { console.error('Erro ao executar o script SQL:', error); }
}


export async function ExecutarSQLConsulta(sqlScript) {
    try {
        const pool = new Pool(Dbconfig);
        const cliente = await pool.connect();
        const resultado = await cliente.query(sqlScript);

        cliente.release();
        return resultado.rows;
    }
    catch (error) {
        console.error('Erro ao executar o script SQL:', error);
        return null;
    }
}