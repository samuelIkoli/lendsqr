import express, { Request, Response } from "express";
const app = express();

import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! Welcome to Lendsqr');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});