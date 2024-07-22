import { Request, Response } from 'express';
import { findSecurities, findSecurityBySymbol } from '../services/securityService';
import { findDailySeriesBySecurity } from '../services/dailySeriesService';

export const getSecurities = async (req: Request, res: Response) => {
    const { page = '1', limit = '10', sortBy = 'ticker', order = 'asc' } = req.query || {};
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
    const { symbol } = req.params || {};
    const { page = '1', limit } = req.query || {};

    if (!symbol) {
        return res.status(400).json({ message: 'Symbol is required' });
    }

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = limit ? parseInt(limit as string, 10) : undefined;
    const defaultLimit = 1000; // Define um limite grande, mas razoável

    try {
        const security = await findSecurityBySymbol(symbol);

        if (!security) {
            return res.status(404).json({ message: 'Security not found' });
        }

        const securityId = security.id;

        try {
            let dailySeries, total;

            if (limitNumber) {
                [dailySeries, total] = await findDailySeriesBySecurity(securityId, pageNumber, limitNumber);
            } else {
                [dailySeries, total] = await findDailySeriesBySecurity(securityId, pageNumber, defaultLimit);
            }

            res.json({
                ...security,
                dailySeries: dailySeries,
                dailySeriesPagination: limitNumber ? {
                    total,
                    page: pageNumber,
                    last_page: Math.ceil(total / limitNumber),
                } : undefined,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching daily series', error });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching security details', error });
    }
};