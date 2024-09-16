import express from 'express';
import user from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test',user);
router.put('/update/:userId',verifyToken,updateUser);

export default router;

//controllers are where functions are stored