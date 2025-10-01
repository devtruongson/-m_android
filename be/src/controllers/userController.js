import bcrypt from 'bcrypt';
import User from '../models/User.js';

export async function getProfile(req, res) {
  const user = await User.findById(req.user.sub).lean();
  return res.json({ id: user._id, email: user.email, fullName: user.fullName, createdAt: user.createdAt });
}

export async function updateProfile(req, res) {
  try {
    const { email, password, fullName } = req.body;
    const updates = {};
    if (email) updates.email = email;
    if (fullName !== undefined) updates.fullName = fullName;
    if (password) updates.passwordHash = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(req.user.sub, updates, { new: true });
    return res.json({ id: user._id, email: user.email, fullName: user.fullName });
  } catch (err) {
    return res.status(400).json({ message: 'Update failed' });
  }
}


