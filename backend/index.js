import express from "express";
import connectData from "./config/db.js";
import dotenv from 'dotenv';
import userRoutes from '../backend/routes/userRoutes.js'
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT || 5000;
connectData();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',userRoutes );


app.listen(port,()=>console.log('server up'))

