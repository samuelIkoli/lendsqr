import express, { Request, Response } from 'express';
const app = express();
// import * as userRoutes from './routes/users';
import { readdirSync } from 'fs';
import session from 'express-session'
import swaggerUi from "swagger-ui-express";
import * as swaggerOptions from "./swagger";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "UuxNsLKDI693ggHJskjLtE6DE/LLnSdI6Pm3IT3Lvdc=",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! Welcome to Lendsqr. You can check out /api-docs to get a documentation of the endpoints in this project and even test them there.');
});

readdirSync("./src/routes").map((path) =>
    app.use("/users", require(`./routes/${path}`))
);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app