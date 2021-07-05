import { Router } from 'express';
import { getUsers, getUser } from '@api/controllers/user.controller';
import { authorize } from '@api/middlewares/auth';

const router = Router();

/**
 * @api {post} v1/auth/users Users
 * @apiDescription Get all users
 * @apiVersion 1.0.0
 * @apiName fetching data
 * @apiGroup Fetch
 * @apiPermission private
 *
 * @apiSuccess @Array of users
 * @apiSuccess (Success 200) {String}  user.id         User's id
 * @apiSuccess (Success 200) {String}  user.name       User's name
 * @apiSuccess (Success 200) {String}  user.email      User's email
 * @apiSuccess (Success 200) {Date}    user.createdAt  Timestamp
 *
 */

router.route('/').get(authorize, getUsers);

/**
 * @api {post} v1/auth/users Users
 * @apiDescription Get all users
 * @apiVersion 1.0.0
 * @apiName fetching data
 * @apiGroup Fetch
 * @apiPermission private
 *
 * @apiParam  {String}          id     User's id
 *
 * @apiSuccess (Success 200) {String}  user.id         User's id
 * @apiSuccess (Success 200) {String}  user.name       User's name
 * @apiSuccess (Success 200) {String}  user.email      User's email
 * @apiSuccess (Success 200) {Date}    user.createdAt  Timestamp
 *
 */

router.route('/:id').get(authorize, getUser);

export default router;
