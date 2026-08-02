import { Coupon } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const validateCoupon = asyncHandler(async (req, res) => {
  const { code } = req.body;
  if (!code) throw new ApiError(400, 'Coupon code is required');

  const cleanCode = code.trim().toUpperCase();
  const coupon = await Coupon.findOne({ where: { code: cleanCode, isActive: true } });

  if (!coupon) {
    if (cleanCode === 'SAVORIA25') {
      return res.status(200).json({
        success: true,
        message: 'Coupon SAVORIA25 applied! (25% OFF)',
        data: { code: 'SAVORIA25', discountPercent: 25 },
      });
    }
    throw new ApiError(404, 'Invalid or expired promo code');
  }

  res.status(200).json({
    success: true,
    message: `Coupon ${coupon.code} applied! (${coupon.discountPercent}% OFF)`,
    data: coupon,
  });
});

export const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.findAll({ order: [['createdAt', 'DESC']] });
  res.status(200).json({ success: true, count: coupons.length, data: coupons });
});

export const createCoupon = asyncHandler(async (req, res) => {
  const { code, title, discountPercent, minOrderAmount, description } = req.body;

  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    title,
    discountPercent,
    minOrderAmount,
    description,
  });

  res.status(201).json({ success: true, message: 'Coupon created', data: coupon });
});
