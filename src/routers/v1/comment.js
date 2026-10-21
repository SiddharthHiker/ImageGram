import express from 'express';
import { createComment, getCommentById } from '../../controllers/commentController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', getCommentById);

router.post('/', isAuthenticated, createComment);

export default router;
