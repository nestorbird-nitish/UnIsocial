import express from 'express';
import {
  createPost,
  deletePost,
  likePost,
  commentPost,
  getLikeCountByPostId,
  getCommentsByPostId,
} from '../controllers/post.controllers.js';
import { authenticateUser } from '../middlewares/authUser.js';

const postRouter = express.Router();

postRouter.post('/', authenticateUser, createPost); 
postRouter.delete('/:postId', authenticateUser, deletePost); 
postRouter.post('/:postId/like', authenticateUser, likePost); 
postRouter.post('/:postId/comment', authenticateUser, commentPost); 

postRouter.get('/:postId/likes', getLikeCountByPostId);
postRouter.get('/:postId/comments', getCommentsByPostId);


export default postRouter;
