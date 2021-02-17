import { createPool, Pool } from 'mysql2/promise'

export async function connect(): Promise<Pool> {
    const connection = await createPool({
        
        host: 'mysql.sistema.mym.com.bo',
        user: 'mymcombo',
        password: 'desarrollo2021',
        database: 'mysqlsistema'
        
        /*
        host: 'localhost',
        user: 'root',
        password: 'pass',
        database: 'prueba'*/
    });
    return connection;
}