import express from 'express'
import { authUser, logoutUser, registerUser, getUserProfile ,updateUserProfile, getUsers, deleteUser, getUserInfo } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logout',logoutUser);
router.route('/display').get(protect,getUsers);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect, deleteUser);
router.route('/:id').get(protect, getUserInfo);

export default router;