import { Request, Response } from 'express';
import ValidationError from '../schemas/ValidationError.ts';
import {
  AddProyectSchema,
} from '../schemas/proyectSchemas.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import proyectModel from '../models/proyect.model.ts';

async function getAllProyects(req: Request, res: Response) {
  const allUsers = await proyectModel.getAllProjects();
  res.send(allUsers);
}

async function addOneProyect(req: Request, res: Response) {
  const proyect = req.body;

  // Validamos usuario
  const { success, data: newUser, error } = AddProyectSchema.safeParse(proyect);

  if (!success) {
    throw new ValidationError(error);
  }

  const userDB = await proyectModel.addOneProyect(proyect);

  res.status(201).send(userDB);
}


export { getAllProyects , addOneProyect };
