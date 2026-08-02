import { Review } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

export const createReview = asyncHandler(async (req, res) => {
  const { name, role, rating, comment } = req.body;

  let photoUrl = req.body.dishPhoto;
  if (req.file) {
    const uploadResult = await uploadToCloudinary(req.file.buffer, 'savoria_reviews');
    photoUrl = uploadResult.secure_url;
  }

  const review = await Review.create({
    userId: req.user ? req.user.id : null,
    name,
    role: role || 'Gourmet Lover',
    rating: parseInt(rating),
    comment,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    dishPhoto: photoUrl,
    isApproved: true,
  });

  res.status(201).json({ success: true, message: 'Review published successfully', data: review });
});

export const getApprovedReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.findAll({ where: { isApproved: true }, order: [['createdAt', 'DESC']] });
  res.status(200).json({ success: true, count: reviews.length, data: reviews });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review) throw new ApiError(404, 'Review not found');

  await review.destroy();
  res.status(200).json({ success: true, message: 'Review deleted' });
});
