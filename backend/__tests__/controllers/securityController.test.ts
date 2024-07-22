import { Request, Response } from 'express';
import { getSecurities, getSecurityBySymbol } from '../../src/controllers/securityController';
import { findSecurities, findSecurityBySymbol } from '../../src/services/securityService';
import { findDailySeriesBySecurity } from '../../src/services/dailySeriesService';

jest.mock('../../src/services/securityService');
jest.mock('../../src/services/dailySeriesService');

describe('SecurityController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject: any;

    beforeEach(() => {
        mockRequest = {};
        responseObject = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
        };
    });

    describe('getSecurities', () => {
        it('should return securities and pagination info', async () => {
            const mockSecurities = [{ id: '1', ticker: 'AAPL', securityName: 'Apple Inc.', sector: 'Technology', country: 'USA', trend: 1.2 }];
            const mockTotal = 1;
            (findSecurities as jest.Mock).mockResolvedValue([mockSecurities, mockTotal]);

            mockRequest.query = { page: '1', limit: '10', sortBy: 'ticker', order: 'asc' };

            await getSecurities(mockRequest as Request, mockResponse as Response);

            expect(findSecurities).toHaveBeenCalledWith(1, 10, 'ticker', 'asc');
            expect(mockResponse.json).toHaveBeenCalledWith({
                data: mockSecurities,
                total: mockTotal,
                page: 1,
                last_page: 1,
            });
        });

        it('should handle errors', async () => {
            const mockError = new Error('Error fetching securities');
            (findSecurities as jest.Mock).mockRejectedValue(mockError);

            mockRequest.query = {}; // Adiciona a propriedade query ao mock

            await getSecurities(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error fetching securities',
                error: mockError,
            });
        });

        it('should return securities with default pagination when query params are missing', async () => {
            const mockSecurities = [{ id: '1', ticker: 'AAPL', securityName: 'Apple Inc.', sector: 'Technology', country: 'USA', trend: 1.2 }];
            const mockTotal = 1;
            (findSecurities as jest.Mock).mockResolvedValue([mockSecurities, mockTotal]);

            mockRequest.query = {};

            await getSecurities(mockRequest as Request, mockResponse as Response);

            expect(findSecurities).toHaveBeenCalledWith(1, 10, 'ticker', 'asc');
            expect(mockResponse.json).toHaveBeenCalledWith({
                data: mockSecurities,
                total: mockTotal,
                page: 1,
                last_page: 1,
            });
        });
    });

    describe('getSecurityBySymbol', () => {
        it('should return 400 if symbol is not provided', async () => {
            mockRequest.params = {};

            await getSecurityBySymbol(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Symbol is required',
            });
        });

        it('should handle not found security', async () => {
            (findSecurityBySymbol as jest.Mock).mockResolvedValue(null);

            mockRequest.params = { symbol: 'AAPL' };

            await getSecurityBySymbol(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Security not found',
            });
        });

        it('should handle errors', async () => {
            const mockError = new Error('Error fetching security details');
            (findSecurityBySymbol as jest.Mock).mockRejectedValue(mockError);

            mockRequest.params = { symbol: 'AAPL' };

            await getSecurityBySymbol(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error fetching security details',
                error: mockError,
            });
        });

        it('should handle daily series fetching errors', async () => {
            const mockSecurity = { id: '1', ticker: 'AAPL', securityName: 'Apple Inc.', sector: 'Technology', country: 'USA', trend: 1.2 };
            const mockError = new Error('Error fetching daily series');
            (findSecurityBySymbol as jest.Mock).mockResolvedValue(mockSecurity);
            (findDailySeriesBySecurity as jest.Mock).mockRejectedValue(mockError);

            mockRequest.params = { symbol: 'AAPL' };
            mockRequest.query = { page: '1', limit: '10' };

            await getSecurityBySymbol(mockRequest as Request, mockResponse as Response);

            expect(findSecurityBySymbol).toHaveBeenCalledWith('AAPL');
            expect(findDailySeriesBySecurity).toHaveBeenCalledWith('1', 1, 10);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error fetching daily series',
                error: mockError,
            });
        });

        it('should return security details and daily series with pagination', async () => {
            const mockSecurity = { id: '1', ticker: 'AAPL', securityName: 'Apple Inc.', sector: 'Technology', country: 'USA', trend: 1.2 };
            const mockDailySeries = [{ id: '1', date: '2021-01-01', close: 150, volume: 1000, security: mockSecurity }];
            const mockTotal = 1;
            (findSecurityBySymbol as jest.Mock).mockResolvedValue(mockSecurity);
            (findDailySeriesBySecurity as jest.Mock).mockResolvedValue([mockDailySeries, mockTotal]);

            mockRequest.params = { symbol: 'AAPL' };
            mockRequest.query = { page: '1', limit: '10' };

            await getSecurityBySymbol(mockRequest as Request, mockResponse as Response);

            expect(findSecurityBySymbol).toHaveBeenCalledWith('AAPL');
            expect(findDailySeriesBySecurity).toHaveBeenCalledWith('1', 1, 10);
            expect(mockResponse.json).toHaveBeenCalledWith({
                ...mockSecurity,
                dailySeries: mockDailySeries,
                dailySeriesPagination: {
                    total: mockTotal,
                    page: 1,
                    last_page: 1,
                },
            });
        });

        it('should return security details and daily series without pagination', async () => {
            const mockSecurity = { id: '1', ticker: 'AAPL', securityName: 'Apple Inc.', sector: 'Technology', country: 'USA', trend: 1.2 };
            const mockDailySeries = [{ id: '1', date: '2021-01-01', close: 150, volume: 1000, security: mockSecurity }];
            const mockTotal = mockDailySeries.length;
            (findSecurityBySymbol as jest.Mock).mockResolvedValue(mockSecurity);
            (findDailySeriesBySecurity as jest.Mock).mockResolvedValue([mockDailySeries, mockTotal]);

            mockRequest.params = { symbol: 'AAPL' };
            mockRequest.query = { page: '1' }; // No limit provided

            await getSecurityBySymbol(mockRequest as Request, mockResponse as Response);

            expect(findSecurityBySymbol).toHaveBeenCalledWith('AAPL');
            expect(findDailySeriesBySecurity).toHaveBeenCalledWith('1', 1, 1000); // Usando o limite padrão
            expect(mockResponse.json).toHaveBeenCalledWith({
                ...mockSecurity,
                dailySeries: mockDailySeries,
                dailySeriesPagination: undefined,
            });
        });
    });
});