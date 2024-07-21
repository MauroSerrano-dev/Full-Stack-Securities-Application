import { Router } from 'express';
import { getSecurities, getSecurityBySymbol } from '../controllers/securityController';

const router = Router();

router.get('/securities', getSecurities);
router.get('/securities/:symbol', getSecurityBySymbol);

export default router;