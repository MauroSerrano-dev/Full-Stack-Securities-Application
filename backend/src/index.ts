import 'reflect-metadata';
import { DataSource } from 'typeorm';
import express, { Request, Response } from 'express';
import { Security } from './entities/Security';
import { DailySeries } from './entities/DailySeries';
import { seedDatabase } from './populate';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: '.env.local' });

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB || 'postgres',
    synchronize: true,
    logging: false,
    entities: [Security, DailySeries],
});

AppDataSource.initialize().then(async () => {
    await seedDatabase(AppDataSource);
    console.log('Database seeding completed.');

    const app = express();
    app.use(express.json());
    app.use(cors());

    const securityRepository = AppDataSource.getRepository(Security);

    app.get('/securities', async (req: Request, res: Response) => {
        const { page = '1', limit = '10', sortBy = 'ticker', order = 'asc' } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const sortField = sortBy as string;
        const sortOrder = (typeof order === 'string' && order.toLocaleLowerCase() === 'desc') ? 'desc' : 'asc';

        try {
            const [securities, total] = await securityRepository.findAndCount({
                skip: (pageNumber - 1) * limitNumber,
                take: limitNumber,
                order: {
                    [sortField]: sortOrder,
                },
            });

            res.json({
                data: securities,
                total,
                page: pageNumber,
                last_page: Math.ceil(total / limitNumber),
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching securities', error });
        }
    });

    app.get('/securities/:symbol', async (req: Request, res: Response) => {
        const { symbol } = req.params;
        const { page = '1', limit } = req.query;

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = limit ? parseInt(limit as string, 10) : undefined;

        try {
            const security = await securityRepository.findOne({
                where: { ticker: symbol },
            });

            if (!security) {
                return res.status(404).json({ message: 'Security not found' });
            }

            const securityId = security.id;

            let dailySeries;
            let total;

            if (limitNumber) {
                [dailySeries, total] = await AppDataSource.getRepository(DailySeries).findAndCount({
                    where: { security: { id: securityId } },
                    skip: (pageNumber - 1) * limitNumber,
                    take: limitNumber,
                });
            } else {
                dailySeries = await AppDataSource.getRepository(DailySeries).find({
                    where: { security: { id: securityId } },
                });
                total = dailySeries.length;
            }

            res.json({
                ...security,
                dailySeries,
                dailySeriesPagination: limitNumber ? {
                    total,
                    page: pageNumber,
                    last_page: Math.ceil(total / limitNumber),
                } : undefined,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching security details', error });
        }
    });


    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => console.log('Error during Data Source initialization:', error));