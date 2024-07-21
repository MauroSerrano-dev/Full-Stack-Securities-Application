import { Request, Response } from 'express';
import { findSecurities, findSecurityBySymbol } from '../services/securityService';
import { findDailySeriesBySecurity } from '../services/dailySeriesService';

export const getSecurities = async (req: Request, res: Response) => {
    const { page = '1', limit = '10', sortBy = 'ticker', order = 'asc' } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const sortField = sortBy as string;
    const sortOrder = (typeof order === 'string' && order.toLocaleLowerCase() === 'desc') ? 'desc' : 'asc';

    try {
        const [securities, total] = await findSecurities(pageNumber, limitNumber, sortField, sortOrder);

        res.json({
            data: securities,
            total,
            page: pageNumber,
            last_page: Math.ceil(total / limitNumber),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching securities', error });
    }
};

export const getSecurityBySymbol = async (req: Request, res: Response) => {
    const { symbol } = req.params;
    const { page = '1', limit } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = limit ? parseInt(limit as string, 10) : undefined;

    try {
        const security = await findSecurityBySymbol(symbol);

        if (!security) {
            return res.status(404).json({ message: 'Security not found' });
        }

        const securityId = security.id;

        let dailySeries;
        let total;

        if (limitNumber) {
            [dailySeries, total] = await findDailySeriesBySecurity(securityId, pageNumber, limitNumber);
        } else {
            dailySeries = await findDailySeriesBySecurity(securityId, pageNumber, Number.MAX_SAFE_INTEGER);
            total = dailySeries.length;
        }

        res.json({
            ...security,
            dailySeries: dailySeries[0],
            dailySeriesPagination: limitNumber ? {
                total,
                page: pageNumber,
                last_page: Math.ceil(total / limitNumber),
            } : undefined,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching security details', error });
    }
};