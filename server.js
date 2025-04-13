import cloudinary from 'cloudinary';
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express from "express";
import 'express-async-errors';
import mongoose from "mongoose";
import morgan from "morgan";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { authenticateUser } from './middleware/authMiddleware.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import authRouter from './routes/authRouter.js';
import jobRouter from './routes/jobRouter.js';
import userRouter from './routes/userRouter.js';


const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './public')));

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
    dotenv.config();
}

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/v1/jobs', authenticateUser ,jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
  });

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
  });

app.use('*',(req, res, next) => {
    res.status(404).send('Route does not exist');
});


app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server running on PORT ${port}....`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }