import express from 'express';
import { createOrder, getAllOrdersForCustomerId, getOrderById } from '../controllers/ordersController';

export const ordersRouter = express.Router();

ordersRouter.post('/create', createOrder);
ordersRouter.get('/getAll', getAllOrdersForCustomerId);
ordersRouter.get('/getById', getOrderById);