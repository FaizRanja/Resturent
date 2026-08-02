import sequelize from '../config/database.js';
import { User } from './user.model.js';
import { Category } from './category.model.js';
import { Menu } from './menu.model.js';
import { Order, OrderItem } from './order.model.js';
import { Reservation } from './reservation.model.js';
import { Review } from './review.model.js';
import { Coupon } from './coupon.model.js';
import { CartItem, Wishlist } from './cartItem.model.js';

// Relational Associations
Category.hasMany(Menu, { foreignKey: 'categoryId', as: 'dishes' });
Menu.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Menu.hasMany(OrderItem, { foreignKey: 'menuId' });
OrderItem.belongsTo(Menu, { foreignKey: 'menuId', as: 'dish' });

User.hasMany(Reservation, { foreignKey: 'userId', as: 'reservations' });
Reservation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Menu.hasMany(Review, { foreignKey: 'menuId', as: 'dishReviews' });
Review.belongsTo(Menu, { foreignKey: 'menuId', as: 'dish' });

User.hasMany(CartItem, { foreignKey: 'userId', as: 'cart' });
CartItem.belongsTo(User, { foreignKey: 'userId' });
CartItem.belongsTo(Menu, { foreignKey: 'menuId', as: 'dish' });

User.hasMany(Wishlist, { foreignKey: 'userId', as: 'wishlist' });
Wishlist.belongsTo(User, { foreignKey: 'userId' });
Wishlist.belongsTo(Menu, { foreignKey: 'menuId', as: 'dish' });

export {
  sequelize,
  User,
  Category,
  Menu,
  Order,
  OrderItem,
  Reservation,
  Review,
  Coupon,
  CartItem,
  Wishlist,
};
