import { AppDataSource } from '../utils/database';
import { DailySeries } from '../entities/DailySeries';

const dailySeriesRepository = AppDataSource.getRepository(DailySeries);

export async function findDailySeriesBySecurity(securityId: string, page: number, limit: number) {
    return await dailySeriesRepository.findAndCount({
        where: { security: { id: securityId } },
        skip: (page - 1) * limit,
        take: limit,
    });
};