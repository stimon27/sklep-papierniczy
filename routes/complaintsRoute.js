import express from 'express';
import { createComplaint } from '../controllers/complaintsController.js'

const complaintsRouter = express.Router();

complaintsRouter.post('/create', createComplaint);

export default complaintsRouter;