import { Router } from 'express';
import movieRoutes from './movie.route';

const router = Router();

/**
 * Service v1/movie
 */

router.use('/movie', movieRoutes);

export default router;
