import { Request, RequestHandler, Response } from 'express';
import db from '../db/connection.js';
import { users } from '../db/schema.js';
import HttpError from '../models/HttpError.js';
import ValidationError from '../models/ValidationError.js';
import {
  AddUserSchema,
  IdSchema,
  LoginSchema,
} from '../schemas/userSchemas.js';
import bcrypt from 'bcrypt';

async function getAllUsers(req: Request, res: Response) {
  const allUsers = await db
    .select()
    .from(users);

  res.send(allUsers);
}

async function getOneUser(req: Request, res: Response) {
  const userId = req.params.userId;

  // Verificaríamos y si no, error
  const { success, data: id, error } = IdSchema.safeParse(userId);
  if (!success) {
    throw new ValidationError(error);
  }
  const [user] = await db
    .select()
    .from(users);

  if (!user) {
    throw new HttpError(404, `User with ID ${id} not found`);
  }

  res.send(user);
}

async function addOneUser(req: Request, res: Response) {
  const user = req.body;

  // Validamos usuario
  const { success, data, error } = AddUserSchema.safeParse(user);

  if (!success) {
    throw new ValidationError(error);
  }
}

export { getAllUsers, getOneUser, addOneUser };
