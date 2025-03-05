import express from 'express';
import {verifyToken} from '../utils/verifyUser.js'
import { createComment,getPostComments,likeComment,editComment,deleteComment,getAllComments } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create',verifyToken, createComment)
router.get('/getPostComments', getPostComments);
router.put('/likeComment/:commentId',likeComment)
router.put('/editComment/:commentId',editComment)
router.delete('/deleteComment/:commentId',deleteComment)
router.get('/getAllComments', getAllComments);

export default router;