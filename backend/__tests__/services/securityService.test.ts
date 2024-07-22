import { findSecurities, findSecurityBySymbol } from '../../src/services/securityService';

jest.mock('../../src/utils/database', () => {
    const mockFindAndCount = jest.fn();
    const mockFindOne = jest.fn();
    return {
        AppDataSource: {
            getRepository: jest.fn().mockReturnValue({
                findAndCount: mockFindAndCount,
                findOne: mockFindOne,
            }),
        },
        __mocks__: {
            mockFindAndCount,
            mockFindOne,
        },
    };
});

describe('Security Service', () => {
    let mockFindAndCount: jest.Mock;
    let mockFindOne: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        const mocks = require('../../src/utils/database').__mocks__;
        mockFindAndCount = mocks.mockFindAndCount;
        mockFindOne = mocks.mockFindOne;
    });

    describe('findSecurities', () => {
        it('should return securities and total count', async () => {
            const mockSecurities = [{ id: 1, ticker: 'AAPL' }];
            const mockTotal = 1;
            mockFindAndCount.mockResolvedValue([mockSecurities, mockTotal]);

            const result = await findSecurities(1, 10, 'ticker', 'asc');

            expect(mockFindAndCount).toHaveBeenCalledWith({
                skip: 0,
                take: 10,
                order: {
                    ticker: 'asc',
                },
            });
            expect(result).toEqual([mockSecurities, mockTotal]);
        });

        it('should handle errors', async () => {
            const mockError = new Error('Error fetching securities');
            mockFindAndCount.mockRejectedValue(mockError);

            await expect(findSecurities(1, 10, 'ticker', 'asc')).rejects.toThrow('Error fetching securities');
        });
    });

    describe('findSecurityBySymbol', () => {
        it('should return a security by symbol', async () => {
            const mockSecurity = { id: 1, ticker: 'AAPL' };
            mockFindOne.mockResolvedValue(mockSecurity);

            const result = await findSecurityBySymbol('AAPL');

            expect(mockFindOne).toHaveBeenCalledWith({
                where: { ticker: 'AAPL' },
            });
            expect(result).toEqual(mockSecurity);
        });

        it('should handle errors', async () => {
            const mockError = new Error('Error fetching security');
            mockFindOne.mockRejectedValue(mockError);

            await expect(findSecurityBySymbol('AAPL')).rejects.toThrow('Error fetching security');
        });

        it('should return null if security is not found', async () => {
            mockFindOne.mockResolvedValue(null);

            const result = await findSecurityBySymbol('UNKNOWN');

            expect(mockFindOne).toHaveBeenCalledWith({
                where: { ticker: 'UNKNOWN' },
            });
            expect(result).toBeNull();
        });
    });
});