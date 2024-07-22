import express from "express";
import connectData from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

import userRoutes from '../backend/routes/userRoutes.js'

import movieRoutes from '../backend/routes/movieRoutes.js'

dotenv.config();
const port = process.env.PORT || 5000;
connectData();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',userRoutes );
app.use('/api/movies', movieRoutes);


app.listen(port,()=>console.log('server up'))

