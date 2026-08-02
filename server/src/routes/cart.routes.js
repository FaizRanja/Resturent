import express from 'express';
import { getCart, addToCart, getWishlist, toggleWishlist } from '../controllers/cart.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getCart);
router.post('/', addToCart);

router.get('/wishlist', getWishlist);
router.post('/wishlist/toggle', toggleWishlist);

export default router;
