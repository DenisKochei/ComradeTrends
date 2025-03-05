import express from 'express';
import user from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser,deleteUser,signout,getUsers } from '../controllers/user.controller.js';
import { setUsersComment } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test',user);
router.get('/getusers',getUsers)
router.put('/update/:userId',updateUser);
router.delete('/delete/:userId',deleteUser)
router.post('/sign-out', signout)
router.get('/:userId',setUsersComment)

export default router;

//controllers are where functions are stored