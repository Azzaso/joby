import express from 'express';
import {getPosts, createPost, deletePost, updatePost} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPosts).post(protect,createPost);
router.route('/:id').post(protect, deletePost);
router.route('/:id').put(protect, updatePost);

export default router;