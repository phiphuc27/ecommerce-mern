import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from '../controllers/productControllers.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

export default router;
