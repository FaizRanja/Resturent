import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'savoria_super_secret_jwt_key_2026', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const cookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
};

// @desc Register User / Admin
// @route POST /api/v1/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: role === 'admin' ? 'admin' : 'user',
  });

  const token = generateToken(user.id);

  res.cookie('thin_nation_token', token, cookieOptions);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
  });
});

// @desc Login User or Admin
// @route POST /api/v1/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user.id);

  res.cookie('thin_nation_token', token, cookieOptions);

  res.status(200).json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
  });
});

// @desc Get Current Logged In Profile
// @route GET /api/v1/auth/me
export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});
