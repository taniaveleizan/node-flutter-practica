import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import { PORT } from "./config/config.js";
import router from "./routes/routes.js";


const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

app.use(router);


//conexion a la DB
connectDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puert ${PORT}`);
});