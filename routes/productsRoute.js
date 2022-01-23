import express from 'express';
import { createProduct, getAllProducts } from '../controllers/productsController';

export const productsRouter = express.Router();

productsRouter.post('/create', createProduct);
productsRouter.get('/getAll', getAllProducts);