import express, { Request, Response } from "express";
const app = express();

import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_PASSWORD, DB_NAME, DB_USERNAME, DB_PORT } = process.env

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME
    }
});

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! Welcome to Lendsqr');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});