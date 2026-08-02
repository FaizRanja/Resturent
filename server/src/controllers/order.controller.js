import { Order, OrderItem, Menu } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc Place New Order
// @route POST /api/v1/orders
export const createOrder = asyncHandler(async (req, res) => {
  const { items, billing, pricing } = req.body;
  if (!items || items.length === 0) {
    throw new ApiError(400, 'Order items cannot be empty');
  }

  const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

  const order = await Order.create({
    orderNumber,
    userId: req.user ? req.user.id : null,
    subtotal: pricing.subtotal,
    discountAmount: pricing.discountAmount || 0,
    shippingFee: pricing.shippingFee || 0,
    taxAmount: pricing.taxAmount || 0,
    grandTotal: pricing.grandTotal,
    billingName: billing.name,
    billingEmail: billing.email,
    billingPhone: billing.phone,
    billingAddress: `${billing.address}, ${billing.city} ${billing.zip}`,
    paymentMethod: billing.paymentMethod || 'card',
    paymentStatus: billing.paymentMethod === 'cod' ? 'Pending' : 'Paid',
    orderStatus: 'Pending',
  });

  const orderItemsData = items.map(item => ({
    orderId: order.id,
    menuId: item.id && item.id.startsWith('d-') ? null : item.id,
    dishName: item.name,
    price: item.price,
    quantity: item.quantity,
    specialNotes: item.specialNotes || '',
  }));

  await OrderItem.bulkCreate(orderItemsData);

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: {
      orderId: order.orderNumber,
      grandTotal: order.grandTotal,
      order,
    },
  });
});

// @desc Get All Orders (Admin)
// @route GET /api/v1/orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    include: [{ model: OrderItem, as: 'items' }],
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

// @desc Update Order Status (Admin)
// @route PUT /api/v1/orders/:id/status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByPk(req.params.id);
  if (!order) throw new ApiError(404, 'Order not found');

  order.orderStatus = status;
  await order.save();

  res.status(200).json({
    success: true,
    message: `Order status updated to ${status}`,
    data: order,
  });
});
