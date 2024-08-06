import express from 'express';
import { getTrendingmovie, getMovietrailers, getMoviedetails, getSimilarMovies, getMoviesbyCategory } from '../controller/moviecontroller.js';

const router = express.Router();

router.get('/trending', getTrendingmovie);
router.get('/:id/trailers', getMovietrailers);
router.get('/:id/details', getMoviedetails);
router.get('/:id/similar', getSimilarMovies);
router.get('/:category', getMoviesbyCategory);

export default router;