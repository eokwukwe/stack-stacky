import { Router } from 'express';

import userRoutes from './userRoutes';
import questionRoutes from './questionRoutes';
import authenticationRoutes from './authenticationRoutes';

const url = '/api/v1';
const router = Router();

router.use(url, userRoutes);
router.use(url, questionRoutes);
router.use(url, authenticationRoutes);

export default router;
