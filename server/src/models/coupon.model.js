import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Coupon = sequelize.define('Coupon', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discountPercent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  minOrderAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  badge: {
    type: DataTypes.STRING,
    defaultValue: 'Special',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  redemptions: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
