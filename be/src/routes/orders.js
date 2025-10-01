import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { placeOrder, listOrders } from '../controllers/orderController.js';

const router = Router();

router.post('/', requireAuth, placeOrder);
router.get('/', requireAuth, listOrders);

export default router;


