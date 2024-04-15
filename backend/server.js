import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req,res)=> res.send("server is ready"));
app.use(notFound);
app.use(errorHandler);
app.listen(port, ()=> console.log(`server started on port ${port}`))