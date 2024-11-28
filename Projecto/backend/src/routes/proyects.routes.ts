import express from 'express';
import {
  addOneUser,
  getAllUsers,
  getOneUser,
} from '../controllers/users.controllers.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getOneUser);
userRouter.post('/', addOneUser);

export default userRouter;