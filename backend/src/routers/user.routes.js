import express from 'express';
import {checkIsCurrentUser, getUserByUsername, login, signup} from '../controllers/user.controllers.js';
import { authenticateUser } from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/:username', getUserByUsername);
userRouter.get('/:username/is-current-user',authenticateUser, checkIsCurrentUser);


export default userRouter;
