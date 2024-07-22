import { DailySeries } from '../../src/entities/DailySeries';
import { Security } from '../../src/entities/Security';

describe('DailySeries Entity', () => {
    it('should create a DailySeries entity and generate a UUID', () => {
        const dailySeries = new DailySeries();
        dailySeries.date = '2021-01-01';
        dailySeries.close = 150;
        dailySeries.volume = 1000000;

        dailySeries.generateId(); // Chama o método para gerar o ID

        expect(dailySeries).toBeDefined();
        expect(dailySeries.id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        ); // Verifica se o ID é um UUID
        expect(dailySeries.date).toBe('2021-01-01');
        expect(dailySeries.close).toBe(150);
        expect(dailySeries.volume).toBe(1000000);
        expect(dailySeries.security).toBeUndefined();
    });

    it('should associate a DailySeries entity with a Security entity', () => {
        const security = new Security();
        security.ticker = 'AAPL';
        security.securityName = 'Apple Inc.';
        security.sector = 'Technology';
        security.country = 'USA';
        security.trend = 1.5;

        const dailySeries = new DailySeries();
        dailySeries.date = '2021-01-01';
        dailySeries.close = 150;
        dailySeries.volume = 1000000;
        dailySeries.security = security;

        expect(dailySeries.security).toBe(security);
    });
});