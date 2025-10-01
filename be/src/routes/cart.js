import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getCart, addToCart, updateItem, clearCart } from '../controllers/cartController.js';

const router = Router();

router.get('/', requireAuth, getCart);
router.post('/add', requireAuth, addToCart);
router.put('/item', requireAuth, updateItem);
router.delete('/clear', requireAuth, clearCart);

export default router;


