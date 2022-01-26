import express from 'express';
import { createProduct, getAllProducts, getProductById } from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.post('/create', createProduct);
productsRouter.get('/getAll', getAllProducts);
productsRouter.get('/get', getProductById);

export default productsRouter;