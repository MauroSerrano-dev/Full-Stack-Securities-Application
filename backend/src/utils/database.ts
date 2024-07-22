import { DataSource } from 'typeorm';
import { Security } from '../entities/Security';
import { DailySeries } from '../entities/DailySeries';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const AppDataSource = new DataSource({
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