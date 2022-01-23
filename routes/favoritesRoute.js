import express from 'express';
import { createFavorite, getAllFavoritesForCustomerId, removeFavorite } from '../controllers/favoritesController';

export const favoritesRouter = express.Router();

favoritesRouter.post('/create', createFavorite);
favoritesRouter.get('/getAll', getAllFavoritesForCustomerId);
favoritesRouter.delete('/delete', removeFavorite);