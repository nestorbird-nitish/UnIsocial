import express from 'express';
import {checkIsCurrentUser, checkIsCurrentUserUserId, getUserById, getUserByUsername, login, signup} from '../controllers/user.controllers.js';
import { authenticateUser } from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/:username', getUserByUsername);
userRouter.get('/:userId/user', getUserById);
userRouter.get('/:username/is-current-user',authenticateUser, checkIsCurrentUser);
userRouter.get('/:id/is-current-user-userId',authenticateUser, checkIsCurrentUserUserId);


export default userRouter;
