import express from 'express';
import { createOrderAddress, getOrderAddressForOrderId } from '../controllers/orderAddressesController.js';

const orderAddressesRouter = express.Router();

orderAddressesRouter.post('/create', createOrderAddress);
orderAddressesRouter.get('/get', getOrderAddressForOrderId);

export default orderAddressesRouter;