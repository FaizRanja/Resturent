import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Menu = sequelize.define('Menu', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categorySlug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  calories: {
    type: DataTypes.STRING,
    defaultValue: '800 kcal',
  },
  prepTime: {
    type: DataTypes.STRING,
    defaultValue: '15-20 min',
  },
  spicyLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 4.8,
  },
  reviewsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isChefSpecial: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isPopular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isNew: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
