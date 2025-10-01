import { Router } from 'express';
import { listByCategory, getDetail, searchByName } from '../controllers/productController.js';

const router = Router();

router.get('/search', searchByName);
router.get('/category/:categoryId', listByCategory);
router.get('/:id', getDetail);

export default router;


