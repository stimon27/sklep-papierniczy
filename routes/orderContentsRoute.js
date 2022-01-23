import express from 'express';
import { createOrderContents, getAllOrderContentsForOrderId } from '../controllers/orderContentsController';

export const orderContentsRouter = express.Router();

orderContentsRouter.post('/create', createOrderContents);
orderContentsRouter.get('/getAll', getAllOrderContentsForOrderId);