import { Request, RequestHandler, Response } from 'express';
import db from '../db/connection.ts';
import { users } from '../db/schema.ts';
import HttpError from '../schemas/HttpError.ts';
import ValidationError from '../schemas/ValidationError.ts';
import { eq } from 'drizzle-orm';
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
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, id));

  if (!user) {
    throw new HttpError(404, `User with ID ${id} not found`);
  }

  res.send(user);
}

async function addOneUser(req: Request, res: Response) {
  console.log('llego');
  console.log(req.body);
  const user = req.body;

  // Validamos usuario
  const { success, data: newUser, error } = AddUserSchema.safeParse(user);

  if (!success) {
    throw new ValidationError(error);
  }

  const saltNumber = 10;
  const encriptedPassword = await bcrypt.hash(
    newUser.password,
    saltNumber
  );

  newUser.password = encriptedPassword

  const [userDB] = await db.insert(users).values(newUser).returning({
    name: users.name,
  });

  res.status(201).send(userDB);
}

export { getAllUsers, getOneUser, addOneUser };
