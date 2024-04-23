import express from 'express';
import {getPosts, createPost, deletePost, applyForPost} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').get(protect, getPosts);
router.route('/').post(protect,createPost);
router.route('/apply/:id').put(protect, applyForPost);
router.route('/:id').delete(protect, deletePost);
export default router;