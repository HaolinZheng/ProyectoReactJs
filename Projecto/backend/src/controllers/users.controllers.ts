import { Request, Response } from 'express';
import { users } from '../db/schema.ts';
import HttpError from '../models/HttpError.ts';
import ValidationError from '../schemas/ValidationError.ts';
import {
  AddUserSchema,
  IdSchema,
  LoginSchema,
} from '../schemas/userSchemas.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.ts';

async function getAllUsers(req: Request, res: Response) {
  const allUsers = await userModel.getAllUser();
  res.send(allUsers);
}

async function getOneUser(req: Request, res: Response) {
  const userId = req.params.userId;

  // Verificaríamos y si no, error
  const { success, data: id, error } = IdSchema.safeParse(userId);
  if (!success) {
    throw new ValidationError(error);
  }
  const user = await userModel.getUserById(id)
  
  if (!user) {
    throw new HttpError(404, `User with ID ${id} not found`);
  }

  res.send(user);
}

async function addOneUser(req: Request, res: Response) {
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

  const userDB = await userModel.addOneUser(newUser);

  res.status(201).send(userDB);
}

async function login(req: Request, res: Response) {
  const {
    success,
    data: loginUser,
    error,
  } = LoginSchema.safeParse(req.body);

  if (!success) {
    throw new ValidationError(error);
  }

  const userDB = await userModel.getUserByEmailOrName(loginUser.name);

  if (!userDB) {
    throw new HttpError(404, 'Email or password incorrect');
  }

  // Ya sabemos quue el usuario existe ahora hay que comprobar que la contraseña que me pases sea correcta
  let isPasswordCorrect = false;
  let userLocation = 0;

  for (let i = 0; i < userDB.length; i++) {
    isPasswordCorrect = await bcrypt.compare(
      loginUser.password,
      userDB[i].password
    );
    if (isPasswordCorrect) {
      userLocation = i;
      break
    }
  }

  if (!isPasswordCorrect) {
    throw new HttpError(404, 'Email or password incorrect');
  }

  //* Por fin sabemos aquí que eres tú -- TOKEN

  // Opcion 2, crear un objeto nuevo
  const userToSend = {
    id: userDB[userLocation].id,
    name: userDB[userLocation].name,
    email: userDB[userLocation].email,
  };

  const token = jwt.sign(userToSend, process.env.SECRET_KEY!, { expiresIn: '1d'});

  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: 'none',
    secure: true,
  });

}

async function signin(req: Request, res: Response) {
  const {
    success,
    data: signinUser,
    error,
  } = AddUserSchema.safeParse(req.body);

  if (!success) {
    throw new ValidationError(error);
  }

  const userDB = await userModel.getUserByEmail(signinUser.email);

  if (!userDB) {
    throw new HttpError(404, 'Ese correo ya tiene una cuenta');
  }

  const saltNumber = 10;
  const encriptedPassword = await bcrypt.hash(
    signinUser.password,
    saltNumber
  );

  signinUser.password = encriptedPassword

  const newUser = await userModel.addOneUser(signinUser);

  //* Por fin sabemos aquí que eres tú -- TOKEN

  // Opcion 2, crear un objeto nuevo
  const userToSend = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };

  const token = jwt.sign(userToSend, process.env.SECRET_KEY!, { expiresIn: '1d'});

  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: 'none',
    secure: true,
  });

}

export { getAllUsers, getOneUser, addOneUser , login , signin };
