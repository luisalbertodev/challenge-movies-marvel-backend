import { Router } from 'express';
import { getMovies, addManyMovies, getMoviesByPage } from '@api/controllers/movie.controller';

const router = Router();

/**
 * @api {get} v1/movie Movies
 * @apiDescription Get all movies
 * @apiVersion 1.0.0
 * @apiName fetching data
 * @apiGroup Fetch
 * @apiPermission public
 *
 * @apiSuccess @Array of movies
 * @apiSuccess (Success 200) {String}  movie._id                  Movies's _id
 * @apiSuccess (Success 200) {String}  movie.title                Movies's title
 * @apiSuccess (Success 200) {String}  movie.release_date         Movies's release_date
 * @apiSuccess (Success 200) {Number}  movie.duration             Movies's duration
 * @apiSuccess (Success 200) {String}  movie.overview             Movies's overview
 * @apiSuccess (Success 200) {String}  movie.cover_url            Movies's cover_url
 * @apiSuccess (Success 200) {String}  movie.trailer_url          Movies's trailer_url
 * @apiSuccess (Success 200) {String}  movie.directed_by          Movies's directed_by
 * @apiSuccess (Success 200) {Number}  movie.phase                Movies's phase
 * @apiSuccess (Success 200) {String}  movie.saga                 Movies's saga
 * @apiSuccess (Success 200) {Number}  movie.chronology           Movies's chronology
 * @apiSuccess (Success 200) {Number}  movie.post_credit_scenes   Movies's post_credit_scenes
 *
 */

router.route('/').get(getMovies);

/**
 * @api {post} v1/movie/many Movies
 * @apiDescription Post many movies
 * @apiVersion 1.0.0
 * @apiName Set data
 * @apiGroup Set
 * @apiPermission public
 *
 *
 * @apiParam {String}  movie._id                  Movies's _id
 * @apiParam {String}  movie.title                Movies's title
 * @apiParam {String}  movie.release_date         Movies's release_date
 * @apiParam {Number}  movie.duration             Movies's duration
 * @apiParam {String}  movie.overview             Movies's overview
 * @apiParam {String}  movie.cover_url            Movies's cover_url
 * @apiParam {String}  movie.trailer_url          Movies's trailer_url
 * @apiParam {String}  movie.directed_by          Movies's directed_by
 * @apiParam {Number}  movie.phase                Movies's phase
 * @apiParam {String}  movie.saga                 Movies's saga
 * @apiParam {Number}  movie.chronology           Movies's chronology
 * @apiParam {Number}  movie.post_credit_scenes   Movies's post_credit_scenes
 *
 * @apiSuccess @Array of movies
 * @apiSuccess (Success 200) {String}  movie._id                  Movies's _id
 * @apiSuccess (Success 200) {String}  movie.title                Movies's title
 * @apiSuccess (Success 200) {String}  movie.release_date         Movies's release_date
 * @apiSuccess (Success 200) {Number}  movie.duration             Movies's duration
 * @apiSuccess (Success 200) {String}  movie.overview             Movies's overview
 * @apiSuccess (Success 200) {String}  movie.cover_url            Movies's cover_url
 * @apiSuccess (Success 200) {String}  movie.trailer_url          Movies's trailer_url
 * @apiSuccess (Success 200) {String}  movie.directed_by          Movies's directed_by
 * @apiSuccess (Success 200) {Number}  movie.phase                Movies's phase
 * @apiSuccess (Success 200) {String}  movie.saga                 Movies's saga
 * @apiSuccess (Success 200) {Number}  movie.chronology           Movies's chronology
 * @apiSuccess (Success 200) {Number}  movie.post_credit_scenes   Movies's post_credit_scenes
 *
 */

router.route('/many').post(addManyMovies);

/**
 * @api {get} v1/movie/page/:page Movies by page
 * @apiDescription Get movies by page
 * @apiVersion 1.0.0
 * @apiName fetching data
 * @apiGroup Fetch
 * @apiPermission public
 *
 * @apiParam   {String}          page       Current Page

 * @apiSuccess @Object of response
 * @apiSuccess (Success 200) {Number}  metadata.documents              Quantity of Movies
 * @apiSuccess @Array of movies
 * @apiSuccess (Success 200) {String}  dataSource._id                  Movies's _id
 * @apiSuccess (Success 200) {String}  dataSource.title                Movies's title
 * @apiSuccess (Success 200) {String}  dataSource.release_date         Movies's release_date
 * @apiSuccess (Success 200) {Number}  dataSource.duration             Movies's duration
 * @apiSuccess (Success 200) {String}  dataSource.overview             Movies's overview
 * @apiSuccess (Success 200) {String}  dataSource.cover_url            Movies's cover_url
 * @apiSuccess (Success 200) {String}  dataSource.trailer_url          Movies's trailer_url
 * @apiSuccess (Success 200) {String}  dataSource.directed_by          Movies's directed_by
 * @apiSuccess (Success 200) {Number}  dataSource.phase                Movies's phase
 * @apiSuccess (Success 200) {String}  dataSource.saga                 Movies's saga
 * @apiSuccess (Success 200) {Number}  dataSource.chronology           Movies's chronology
 * @apiSuccess (Success 200) {Number}  dataSource.post_credit_scenes   Movies's post_credit_scenes
 */

router.route('/page/:page?').get(getMoviesByPage);

export default router;
