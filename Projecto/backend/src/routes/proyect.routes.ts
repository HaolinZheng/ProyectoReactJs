import express from 'express';
import {
  getAllProyects,
  addOneProyect,
} from '../controllers/proyects.controllers.js';

const proyectRouter = express.Router();

proyectRouter.get('/', getAllProyects);
proyectRouter.post('/', addOneProyect);


export default proyectRouter;