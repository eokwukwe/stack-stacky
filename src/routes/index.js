import { Router } from 'express';

import questionRoutes from './questionRoutes';
import authenticationRoutes from './authenticationRoutes';

const router = Router();
const url = '/api/v1';

router.use(url, questionRoutes);
router.use(url, authenticationRoutes);

export default router;
