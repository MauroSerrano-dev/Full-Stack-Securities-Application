import 'reflect-metadata';
import { DataSource } from 'typeorm';
import express from 'express';
import { Security } from './entities/Security';
import { DailySeries } from './entities/DailySeries';
import { seedDatabase } from './populate';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: '.env.local' });

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: 'postgres',
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

    app.get('/securities', async (req, res) => {
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        try {
            const [securities, total] = await securityRepository.findAndCount({
                skip: (pageNumber - 1) * limitNumber,
                take: limitNumber,
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

    app.get('/securities/:symbol', async (req, res) => {
        const { symbol } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        try {
            const security = await securityRepository.findOne({
                where: { ticker: symbol },
            });

            if (!security) {
                return res.status(404).json({ message: 'Security not found' });
            }

            const securityId = security.id;

            const [dailySeries, total] = await AppDataSource.getRepository(DailySeries).findAndCount({
                where: { security: { id: securityId } },
                skip: (pageNumber - 1) * limitNumber,
                take: limitNumber,
            });

            res.json({
                ...security,
                dailySeries,
                dailySeriesPagination: {
                    total,
                    page: pageNumber,
                    last_page: Math.ceil(total / limitNumber),
                },
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