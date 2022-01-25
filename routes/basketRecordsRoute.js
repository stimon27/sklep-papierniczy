import express from 'express';
import { createBasketRecord, getAllBasketRecordsForCustomerId, updateBasketRecord, removeBasketRecord, getBasketRecordForParams } from '../controllers/basketRecordsController.js';

const basketRecordsRouter = express.Router();

basketRecordsRouter.post('/create', createBasketRecord);
basketRecordsRouter.get('/getAll', getAllBasketRecordsForCustomerId);
basketRecordsRouter.get('/get', getBasketRecordForParams);
basketRecordsRouter.put('/update', updateBasketRecord);
basketRecordsRouter.delete('/delete', removeBasketRecord);

export default basketRecordsRouter;