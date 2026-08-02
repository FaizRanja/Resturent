import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  bookingRef: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guests: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    defaultValue: 'Main Dining Hall',
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled'),
    defaultValue: 'Pending',
  },
  specialNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
