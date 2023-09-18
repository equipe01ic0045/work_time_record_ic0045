import express from "express";
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";
import swaggerApp from "./swagger";
import handleError from "./middlewares/handleError";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router,handleError);
app.use("/swagger", swaggerApp);

export { app };
