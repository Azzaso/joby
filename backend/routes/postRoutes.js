import express from 'express';
import {getPosts, createPost, deletePost, applyForPost, getPostDetails} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').get(protect, getPosts);
router.route('/').post(protect,createPost);
router.route('/:id').post(protect, applyForPost);
router.route('/:id').delete(protect, deletePost);
router.route('/:id').get(protect, getPostDetails);
export default router;