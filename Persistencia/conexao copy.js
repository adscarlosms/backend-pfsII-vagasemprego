import mysql from 'mysql2/promise';

export default async function conectar(){
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: '129.146.68.51',
            user: process.env.USUARIO_DB, 
            password:process.env.SENHA_DB,  
            database: 'backend-aluno07',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
          });

        //local
        // const pool = mysql.createPool({
        //     host: 'localhost',
        //     user: 'root', 
        //     password:'',  
        //     database: 'vagasemprego',
        //     waitForConnections: true,         
        //   });

          global.poolConexoes = pool;
          return await pool.getConnection();
    }
}