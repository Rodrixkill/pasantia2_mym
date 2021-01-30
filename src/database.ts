import { createPool, Pool } from 'mysql2/promise'

export async function connect(): Promise<Pool> {
    const connection = await createPool({
        host: 'mysql.sistema.mym.com.bo',
        user: 'mymcombo',
        password: 'vkLY!Wzh',
        database: 'mysqlsistema'
    });
    return connection;
}