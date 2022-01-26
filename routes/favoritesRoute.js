import express from 'express';
import { createFavorite, getAllFavoritesForCustomerId, getFavoriteForParams, removeFavorite } from '../controllers/favoritesController.js';

const favoritesRouter = express.Router();

favoritesRouter.post('/create', createFavorite);
favoritesRouter.get('/getAll', getAllFavoritesForCustomerId);
favoritesRouter.get('/get', getFavoriteForParams);
favoritesRouter.delete('/delete', removeFavorite);

export default favoritesRouter;