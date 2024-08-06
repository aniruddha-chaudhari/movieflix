import express from 'express';
import { getTrendingTv, getTvtrailers, getTvdetails, getSimilarTvs, getTvsbyCategory } from '../controller/tvcontroller.js';

const router = express.Router();


router.get('/trending', getTrendingTv);
router.get('/:id/trailers', getTvtrailers);
router.get('/:id/details', getTvdetails);
router.get('/:id/similar', getSimilarTvs);
router.get('/:category', getTvsbyCategory);


export default router;