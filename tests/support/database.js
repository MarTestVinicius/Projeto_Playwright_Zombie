const { Pool } = require('pg');

const Dbconfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'pwd123',
    port: 5432
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