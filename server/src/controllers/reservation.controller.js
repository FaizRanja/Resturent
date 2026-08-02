import { Reservation } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createReservation = asyncHandler(async (req, res) => {
  const { name, email, phone, guests, date, time, area, specialNotes } = req.body;
  const bookingRef = 'SAV-' + Math.floor(100000 + Math.random() * 900000);

  const reservation = await Reservation.create({
    bookingRef,
    userId: req.user ? req.user.id : null,
    name,
    email,
    phone,
    guests: parseInt(guests),
    date,
    time,
    area: area || 'Main Dining Hall',
    specialNotes,
    status: 'Pending',
  });

  res.status(201).json({
    success: true,
    bookingId: reservation.bookingRef,
    message: 'Table reservation created successfully',
    data: reservation,
  });
});

export const getAllReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.findAll({ order: [['createdAt', 'DESC']] });
  res.status(200).json({ success: true, count: reservations.length, data: reservations });
});

export const updateReservationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) throw new ApiError(404, 'Reservation not found');

  reservation.status = status;
  await reservation.save();

  res.status(200).json({ success: true, message: `Reservation set to ${status}`, data: reservation });
});
