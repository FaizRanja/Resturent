import express from 'express';
import authRoutes from './auth.routes.js';
import menuRoutes from './menu.routes.js';
import categoryRoutes from './category.routes.js';
import orderRoutes from './order.routes.js';
import reservationRoutes from './reservation.routes.js';
import reviewRoutes from './review.routes.js';
import couponRoutes from './coupon.routes.js';
import cartRoutes from './cart.routes.js';
import paymentRoutes from './payment.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/menu', menuRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/reservations', reservationRoutes);
router.use('/reviews', reviewRoutes);
router.use('/coupons', couponRoutes);
router.use('/cart', cartRoutes);
router.use('/payments', paymentRoutes);

export default router;
