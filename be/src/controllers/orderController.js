import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

export async function placeOrder(req, res) {
  const userId = req.user.sub;
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }
  const items = cart.items.map((i) => ({
    product: i.product._id,
    quantity: i.quantity,
    price: i.product.price,
  }));
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const order = await Order.create({ user: userId, items, total });
  cart.items = [];
  await cart.save();
  return res.status(201).json(order);
}

export async function listOrders(req, res) {
  const orders = await Order.find({ user: req.user.sub }).sort({ createdAt: -1 }).lean();
  return res.json(orders);
}


