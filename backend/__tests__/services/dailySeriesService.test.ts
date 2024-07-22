import { findDailySeriesBySecurity } from '../../src/services/dailySeriesService';

jest.mock('../../src/utils/database', () => {
    const mockFindAndCount = jest.fn();
    return {
        AppDataSource: {
            getRepository: jest.fn().mockReturnValue({
                findAndCount: mockFindAndCount,
            }),
        },
        __mocks__: {
            mockFindAndCount,
        },
    };
});

describe('DailySeries Service', () => {
    let mockFindAndCount: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        const mocks = require('../../src/utils/database').__mocks__;
        mockFindAndCount = mocks.mockFindAndCount;
    });

    describe('findDailySeriesBySecurity', () => {
        it('should return daily series and total count for a security', async () => {
            const mockDailySeries = [{ id: 1, date: '2023-01-01', value: 100 }];
            const mockTotal = 1;
            mockFindAndCount.mockResolvedValue([mockDailySeries, mockTotal]);

            const result = await findDailySeriesBySecurity('1', 1, 10);

            expect(mockFindAndCount).toHaveBeenCalledWith({
                where: { security: { id: '1' } },
                skip: 0,
                take: 10,
            });
            expect(result).toEqual([mockDailySeries, mockTotal]);
        });

        it('should handle errors', async () => {
            const mockError = new Error('Error fetching daily series');
            mockFindAndCount.mockRejectedValue(mockError);

            await expect(findDailySeriesBySecurity('1', 1, 10)).rejects.toThrow('Error fetching daily series');
        });
    });
});