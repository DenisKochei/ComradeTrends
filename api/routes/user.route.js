import express from 'express';
import user from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser,deleteUser,signout,getUsers } from '../controllers/user.controller.js';
import { setUsersComment } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test',user);
router.get('/getusers',verifyToken,getUsers)
router.put('/update/:userId',verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser)
router.post('/sign-out', signout)
router.get('/:userId',setUsersComment)

export default router;

//controllers are where functions are stored