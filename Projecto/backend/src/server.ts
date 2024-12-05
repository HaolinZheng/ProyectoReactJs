import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import errorHandler from './middlewares/errorHandler';
import proyectRouter from './routes/users.routes';
import { haveCookie } from './controllers/log.controllers';


const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use('/users', proyectRouter);
app.use('/cookiesearch', haveCookie);

app.use(errorHandler);

const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}...`);
});