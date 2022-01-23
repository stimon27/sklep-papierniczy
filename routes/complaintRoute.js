import express from 'express';
import { createComplaint } from '../controllers/complaintsController'

export const complaintsRouter = express.Router();

complaintsRouter.post('/create', createComplaint);