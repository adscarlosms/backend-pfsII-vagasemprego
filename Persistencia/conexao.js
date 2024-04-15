import mysql from 'mysql2/promise';

export default async function conectar(){
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root', 
            password: '',  
            database: 'vagasemprego',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 100000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });

        global.poolConexoes = pool;
        return await pool.getConnection();
    }
}
