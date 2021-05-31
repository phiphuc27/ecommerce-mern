import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productControllers.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
