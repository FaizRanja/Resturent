import { Category } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll({ order: [['id', 'ASC']] });
  res.status(200).json({ success: true, count: categories.length, data: categories });
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, icon, description } = req.body;
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  const category = await Category.create({ name, slug, icon, description });
  res.status(201).json({ success: true, message: 'Category created', data: category });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found');

  await category.destroy();
  res.status(200).json({ success: true, message: 'Category deleted' });
});
