import express from 'express';
import { createBasketRecord, getAllBasketRecordsForCustomerId, updateBasketRecord, removeBasketRecord } from '../controllers/basketRecordsController';

export const basketRecordsRouter = express.Router();

basketRecordsRouter.post('/create', createBasketRecord);
basketRecordsRouter.get('/getAll', getAllBasketRecordsForCustomerId);
basketRecordsRouter.put('/update', updateBasketRecord);
basketRecordsRouter.delete('/delete', removeBasketRecord);