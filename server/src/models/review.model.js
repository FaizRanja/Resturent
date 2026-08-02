import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'Gourmet Lover',
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dishPhoto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
