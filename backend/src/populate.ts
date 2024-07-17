import { Security } from './entities/Security';
import { DailySeries } from './entities/DailySeries';
import data from './data.json';
import { DataSource } from 'typeorm';

export const seedDatabase = async (dataSource: DataSource) => {
    const securityRepository = dataSource.getRepository(Security);
    const dailySeriesRepository = dataSource.getRepository(DailySeries);

    for (const item of data) {
        let security = await securityRepository.findOne({ where: { ticker: item.ticker } });

        if (!security) {
            security = securityRepository.create({
                ticker: item.ticker,
                securityName: item.securityName,
                sector: item.sector,
                country: item.country,
                trend: item.trend,
            });
            await securityRepository.save(security);
        }

        for (const price of item.prices) {
            const existingDailySeries = await dailySeriesRepository.findOne({
                where: { date: price.date, security: { id: security.id } },
            });

            if (!existingDailySeries) {
                const dailySeries = dailySeriesRepository.create({
                    date: price.date,
                    close: parseFloat(price.close),
                    volume: parseInt(price.volume),
                    security: security,
                });
                await dailySeriesRepository.save(dailySeries);
            }
        }
    }
};