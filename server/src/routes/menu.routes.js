import express from 'express';
import { getMenuDishes, getDishById, createDish, updateDish, deleteDish } from '../controllers/menu.controller.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getMenuDishes);
router.get('/:id', getDishById);

// Admin Protected Routes
router.post('/', verifyToken, authorizeRoles('admin'), upload.single('image'), createDish);
router.put('/:id', verifyToken, authorizeRoles('admin'), upload.single('image'), updateDish);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteDish);

export default router;
