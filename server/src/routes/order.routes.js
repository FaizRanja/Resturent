import express from 'express';
import { createOrder, getAllOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', verifyToken, authorizeRoles('admin'), getAllOrders);
router.put('/:id/status', verifyToken, authorizeRoles('admin'), updateOrderStatus);

export default router;
