import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

export async function getCart(req, res) {
  const cart = await getOrCreateCart(req.user.sub);
  await cart.populate('items.product');
  return res.json(cart);
}

export async function addToCart(req, res) {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const qty = Math.max(1, Number(quantity || 1));
  const cart = await getOrCreateCart(req.user.sub);
  const idx = cart.items.findIndex((i) => i.product.toString() === productId);
  if (idx >= 0) cart.items[idx].quantity += qty;
  else cart.items.push({ product: productId, quantity: qty });
  await cart.save();
  await cart.populate('items.product');
  return res.status(200).json(cart);
}

export async function updateItem(req, res) {
  const { productId, quantity } = req.body;
  const cart = await getOrCreateCart(req.user.sub);
  const idx = cart.items.findIndex((i) => i.product.toString() === productId);
  if (idx < 0) return res.status(404).json({ message: 'Item not in cart' });
  const qty = Number(quantity);
  if (qty <= 0) cart.items.splice(idx, 1);
  else cart.items[idx].quantity = qty;
  await cart.save();
  await cart.populate('items.product');
  return res.json(cart);
}

export async function clearCart(req, res) {
  const cart = await getOrCreateCart(req.user.sub);
  cart.items = [];
  await cart.save();
  return res.json(cart);
}


