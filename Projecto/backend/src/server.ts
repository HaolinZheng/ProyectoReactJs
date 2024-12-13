import 'dotenv/config';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import errorHandler from './middlewares/errorHandler';
import userRouter from './routes/users.routes';
import { isLoged , logOut} from './controllers/log.controllers';
import proyectRouter from './routes/proyect.routes';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);

app.use('/users', userRouter);
app.use('/proyects', proyectRouter);
app.use('/isloged', isLoged);
app.use('/logout', logOut);

app.use(errorHandler);

const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}...`);
});