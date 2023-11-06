import express from "express";
import fileUpload from 'express-fileupload';
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";
import swaggerApp from "./swagger";
import handleError from "./middlewares/handleError";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL : "http://localhost:4400",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(router, handleError);
app.use("/swagger", swaggerApp);

export { app };
