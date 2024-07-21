import { AppDataSource } from '../utils/database';
import { Security } from '../entities/Security';

const securityRepository = AppDataSource.getRepository(Security);

export async function findSecurities(page: number, limit: number, sortBy: string, sortOrder: 'asc' | 'desc') {
    return await securityRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: {
            [sortBy]: sortOrder,
        },
    });
};

export async function findSecurityBySymbol(symbol: string) {
    return await securityRepository.findOne({
        where: { ticker: symbol },
    });
};