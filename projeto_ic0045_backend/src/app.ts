import express from "express";
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";
import swaggerApp from "./swagger";
import handleError from "./middlewares/handleError";

const app = express();

const corsOptions = {
    origin: 'http://localhost:4400',
    // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(router, handleError);
app.use("/swagger", swaggerApp);

export { app };
