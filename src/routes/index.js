import { Router } from 'express';

import userRoutes from './userRoutes';
import questionRoutes from './questionRoutes';
import authenticationRoutes from './authenticationRoutes';

const router = Router();
const url = '/api/v1';

router.use(url, userRoutes);
router.use(url, questionRoutes);
router.use(url, authenticationRoutes);

export default router;
