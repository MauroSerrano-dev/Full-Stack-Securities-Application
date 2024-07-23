import { Router } from 'express';
import { getSecurities, getSecurityBySymbol } from '../controllers/securityController';
import apiKeyMiddleware from '../middleware/apiKeyMiddleware';

const router = Router();

router.use(apiKeyMiddleware);

router.get('/securities', getSecurities);
router.get('/securities/:symbol', getSecurityBySymbol);

export default router;