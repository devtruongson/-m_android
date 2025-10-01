import Product from '../models/Product.js';

export async function listByCategory(req, res) {
  const { categoryId } = req.params;
  const products = await Product.find({ category: categoryId }).lean();
  return res.json(products);
}

export async function getDetail(req, res) {
  const { id } = req.params;
  const product = await Product.findById(id).lean();
  if (!product) return res.status(404).json({ message: 'Not found' });
  return res.json(product);
}

export async function searchByName(req, res) {
  const { q } = req.query;
  const products = await Product.find({ name: { $regex: q || '', $options: 'i' } }).lean();
  return res.json(products);
}


