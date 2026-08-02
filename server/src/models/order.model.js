import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  orderNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  discountAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  shippingFee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  taxAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  grandTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  billingName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  billingEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  billingPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  billingAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM('card', 'cod', 'stripe', 'upi'),
    defaultValue: 'card',
  },
  paymentStatus: {
    type: DataTypes.ENUM('Pending', 'Paid', 'Failed'),
    defaultValue: 'Pending',
  },
  orderStatus: {
    type: DataTypes.ENUM('Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'),
    defaultValue: 'Pending',
  },
});

export const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dishName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  specialNotes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
