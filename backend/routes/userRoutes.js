import express from 'express'
import { authUser, logoutUser, registerUser, getUserProfile ,updateUserProfile, getUsers, deleteUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logout',logoutUser);
router.route('/:id').delete(protect, deleteUser);
router.route('/display').get(protect,getUsers);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);

export default router;