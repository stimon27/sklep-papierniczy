import express from 'express';
import { createProduct, getAllProducts } from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.post('/create', createProduct);
productsRouter.get('/getAll', getAllProducts);

export default productsRouter;