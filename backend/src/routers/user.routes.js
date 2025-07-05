import express from 'express';
import UserController from '../controllers/user.controllers.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', (req, res, next) => userController.signup(req, res, next));
userRouter.post('/login', (req, res, next) => userController.login(req, res, next));


export default userRouter;
