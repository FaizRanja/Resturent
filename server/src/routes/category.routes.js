import express from 'express';
import { getCategories, createCategory, deleteCategory } from '../controllers/category.controller.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', verifyToken, authorizeRoles('admin'), createCategory);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteCategory);

export default router;
