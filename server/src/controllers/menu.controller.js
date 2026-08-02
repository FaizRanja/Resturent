import { Menu } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

// @desc Get All Menu Dishes (with search & category filters)
// @route GET /api/v1/menu
export const getMenuDishes = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const where = {};

  if (category && category !== 'all') {
    where.categorySlug = category;
  }

  const dishes = await Menu.findAll({ where, order: [['createdAt', 'DESC']] });

  let result = dishes;
  if (search) {
    const q = search.toLowerCase();
    result = dishes.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
});

// @desc Get Single Dish Details
// @route GET /api/v1/menu/:id
export const getDishById = asyncHandler(async (req, res) => {
  const dish = await Menu.findByPk(req.params.id);
  if (!dish) throw new ApiError(404, 'Dish not found');

  res.status(200).json({
    success: true,
    data: dish,
  });
});

// @desc Create New Menu Dish (Admin)
// @route POST /api/v1/menu
export const createDish = asyncHandler(async (req, res) => {
  const { name, categorySlug, price, description, ingredients, calories, prepTime, isChefSpecial, isPopular } = req.body;

  let imageUrl = req.body.image;
  if (req.file) {
    const uploadResult = await uploadToCloudinary(req.file.buffer, 'savoria_dishes');
    imageUrl = uploadResult.secure_url;
  }

  if (!imageUrl) {
    imageUrl = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80';
  }

  const dish = await Menu.create({
    name,
    categorySlug,
    price: parseFloat(price),
    description,
    image: imageUrl,
    ingredients: ingredients ? JSON.parse(ingredients) : [],
    calories,
    prepTime,
    isChefSpecial: isChefSpecial === 'true' || isChefSpecial === true,
    isPopular: isPopular === 'true' || isPopular === true,
  });

  res.status(201).json({
    success: true,
    message: 'Dish created successfully',
    data: dish,
  });
});

// @desc Update Dish (Admin)
// @route PUT /api/v1/menu/:id
export const updateDish = asyncHandler(async (req, res) => {
  const dish = await Menu.findByPk(req.params.id);
  if (!dish) throw new ApiError(404, 'Dish not found');

  if (req.file) {
    const uploadResult = await uploadToCloudinary(req.file.buffer, 'savoria_dishes');
    req.body.image = uploadResult.secure_url;
  }

  await dish.update(req.body);

  res.status(200).json({
    success: true,
    message: 'Dish updated successfully',
    data: dish,
  });
});

// @desc Delete Dish (Admin)
// @route DELETE /api/v1/menu/:id
export const deleteDish = asyncHandler(async (req, res) => {
  const dish = await Menu.findByPk(req.params.id);
  if (!dish) throw new ApiError(404, 'Dish not found');

  await dish.destroy();

  res.status(200).json({
    success: true,
    message: 'Dish deleted successfully',
  });
});
