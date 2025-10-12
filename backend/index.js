import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import {connectDB} from './db/connectDB.js';
import authRoutes from './routes/auth.routes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
        origin: process.env.CLIENT_URI,
        credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    connectDB()
    console.log('Server started on port 3000');
})