import { Router } from 'express';

import authenticationRoutes from './authenticationRoutes';

const router = Router();
const url = '/api/v1';

router.use(url, authenticationRoutes);

export default router;
