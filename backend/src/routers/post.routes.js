import express from 'express';
import {
  createPost,
  deletePost,
  likePost,
  commentPost,
  getLikeCountByPostId,
  getCommentsByPostId,
  isLikedByCurrentUser,
  getCommentCountByPostId,
} from '../controllers/post.controllers.js';
import { authenticateUser } from '../middlewares/authUser.js';

const postRouter = express.Router();

postRouter.post('/', authenticateUser, createPost); 
postRouter.delete('/:postId', authenticateUser, deletePost); 
postRouter.post('/:postId/like', authenticateUser, likePost); 
postRouter.post('/:postId/comment', authenticateUser, commentPost); 

postRouter.get('/:postId/likes', getLikeCountByPostId);
postRouter.get('/:postId/commentsCount', getCommentCountByPostId);
postRouter.get('/:postId/comments', getCommentsByPostId);
postRouter.get('/:postId/is-liked', authenticateUser, isLikedByCurrentUser);


export default postRouter;
