import path from 'path';
import knex from 'knex';

const dbPath = path.resolve(__dirname, 'db/database.db');

export const dbConnection = knex({
    client: 'sqlite3',
    connection: {
        filename: dbPath
    },
    useNullAsDefault: true
});