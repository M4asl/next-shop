import catchAsync from "../utils/catchAsync";
import Order from "../models/orderModel";
import AppError from "../utils/AppError";
import Product from "../models/productModel";

const paypalClientId = process.env.PAYPAL_CLIENT_ID;

const addOrderItems = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    personalDetails,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0)
    return next(new AppError("No order items", 400));

  const order = new Order({
    orderItems,
    personalDetails,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

const getOrderById = catchAsync(async (req, res, next) => {
  let order = await Order.findById(req.query.id)
    .populate("user", "name email")
    .populate("orderItems.product", "_id name images");

  if (!order) return next(new AppError("Order not found", 404));

  res.json(order);
});

const updateOrderToPaid = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.query.id);

  if (!order) return next(new AppError("Order not found", 404));

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

const updateOrderPaidStatus = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.query.id);

  if (!order) return next(new AppError("Order not found", 404));
  order.isPaid = req.body.paid;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

const updateOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.query.id);

  if (!order) return next(new AppError("Order not found", 404));

  order.status = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

const getMyOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "orderItems.product",
    "_id name images"
  );
  res.json(orders);
});

const getOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "id name")
    .populate("orderItems.product", "_id name images");
  res.json(orders);
});

const getConfigPaypal = (req, res) => {
  res.send(paypalClientId);
};

const deleteOrder = catchAsync(async (req, res) => {
  const order = await Order.findById(req.query.id);

  if (!order) {
    return next(new AppError("Order not found with this ID", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: "Order is deleted.",
  });
});

const decreaseQuantity = catchAsync(async (req, res, next) => {
  const updateProducts = async () => {
    return Promise.all(
      req.body.orderItems.map(async (item) => {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { countInStock: -item.qty } },
          { new: true }
        ).exec();
      })
    );
  };

  updateProducts();

  next();
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderPaidStatus,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  getConfigPaypal,
  deleteOrder,
  decreaseQuantity,
};
