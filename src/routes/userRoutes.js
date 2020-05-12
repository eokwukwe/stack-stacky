import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = Router();

/**
 * @description search users
 *
 * @param {string}
 * @param {function}
 */
router.get('/users/search', UserController.searchUser);

export default router;
