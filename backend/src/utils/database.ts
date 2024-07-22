import { DataSource } from 'typeorm';
import { Security } from '../entities/Security';
import { DailySeries } from '../entities/DailySeries';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USERNAME',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB',
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [Security, DailySeries],
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized successfully.');
    })
    .catch((err) => {
        console.error('Failed to initialize the Data Source.');
        console.error('Error details:', err.message);
        if (err.code === '28P01') {
            console.error('The password authentication failed. Please check your POSTGRES_PASSWORD.');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('Connection was refused. Please check if your PostgreSQL server is running and reachable.');
        } else if (err.code === 'ENOTFOUND') {
            console.error('The host specified could not be found. Please check your POSTGRES_HOST.');
        } else {
            console.error('An unknown error occurred during the database connection attempt.');
        }
        process.exit(1);
    });