import express from 'express';

import postRouter from './post.js';
import userRouter from './user.js';
import commentRouter from './comment.js';

const router = express.Router();



router.use('/posts', postRouter); // If in the remaning url i.e after /api/v1, we have the url starting with /posts, then the request is forwareded to postRouter

router.use('/users', userRouter); // If in the remaning url i.e after /api/v1, we have the url starting with /users, then the request is forwareded to postRouter

router.use('/comments', commentRouter); 

export default router;