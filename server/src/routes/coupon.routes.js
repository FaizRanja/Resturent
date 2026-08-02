import express from 'express';
import { validateCoupon, getCoupons, createCoupon } from '../controllers/coupon.controller.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/validate', validateCoupon);
router.get('/', verifyToken, authorizeRoles('admin'), getCoupons);
router.post('/', verifyToken, authorizeRoles('admin'), createCoupon);

export default router;
