import express from 'express';
import {
  addOneUser,
  getAllUsers,
  getOneUser,
  login,
  signin,
} from '../controllers/users.controllers.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getOneUser);
userRouter.post('/', addOneUser);
userRouter.post('/login', login);
userRouter.post('/signin', signin);

export default userRouter;