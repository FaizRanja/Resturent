import express from 'express';
import { createReview, getApprovedReviews, deleteReview } from '../controllers/review.controller.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getApprovedReviews);
router.post('/', upload.single('dishPhoto'), createReview);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteReview);

export default router;
