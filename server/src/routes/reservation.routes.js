import express from 'express';
import { createReservation, getAllReservations, updateReservationStatus } from '../controllers/reservation.controller.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', createReservation);
router.get('/', verifyToken, authorizeRoles('admin'), getAllReservations);
router.put('/:id/status', verifyToken, authorizeRoles('admin'), updateReservationStatus);

export default router;
