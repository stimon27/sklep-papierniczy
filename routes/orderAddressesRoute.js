import express from 'express';
import { createOrderAddress, getOrderAddressForOrderId } from '../controllers/orderAddressesController.js';

const orderAddressesRouter = express.Router();

orderContentsRouter.post('/create', createOrderAddress);
orderContentsRouter.get('/get', getOrderAddressForOrderId);

export default orderAddressesRouter;