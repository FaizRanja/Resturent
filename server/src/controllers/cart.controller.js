import { CartItem, Wishlist, Menu } from '../models/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCart = asyncHandler(async (req, res) => {
  const items = await CartItem.findAll({
    where: { userId: req.user.id },
    include: [{ model: Menu, as: 'dish' }],
  });
  res.status(200).json({ success: true, count: items.length, data: items });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { menuId, quantity, specialNotes } = req.body;
  let item = await CartItem.findOne({ where: { userId: req.user.id, menuId } });

  if (item) {
    item.quantity += quantity || 1;
    await item.save();
  } else {
    item = await CartItem.create({
      userId: req.user.id,
      menuId,
      quantity: quantity || 1,
      specialNotes,
    });
  }

  res.status(200).json({ success: true, message: 'Item added to cart', data: item });
});

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findAll({
    where: { userId: req.user.id },
    include: [{ model: Menu, as: 'dish' }],
  });
  res.status(200).json({ success: true, count: wishlist.length, data: wishlist });
});

export const toggleWishlist = asyncHandler(async (req, res) => {
  const { menuId } = req.body;
  const existing = await Wishlist.findOne({ where: { userId: req.user.id, menuId } });

  if (existing) {
    await existing.destroy();
    return res.status(200).json({ success: true, message: 'Removed from wishlist' });
  }

  const newFav = await Wishlist.create({ userId: req.user.id, menuId });
  res.status(201).json({ success: true, message: 'Added to wishlist', data: newFav });
});
