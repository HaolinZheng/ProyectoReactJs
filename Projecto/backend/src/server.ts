import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import errorHandler from './middlewares/errorHandler';
import proyectRouter from './routes/users.routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', proyectRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}...`);
});