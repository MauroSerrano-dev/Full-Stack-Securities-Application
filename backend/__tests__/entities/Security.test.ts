import { Security } from '../../src/entities/Security';
import { DailySeries } from '../../src/entities/DailySeries';

describe('Security Entity', () => {
    it('should create a Security entity and generate a UUID', () => {
        const security = new Security();
        security.ticker = 'AAPL';
        security.securityName = 'Apple Inc.';
        security.sector = 'Technology';
        security.country = 'USA';
        security.trend = 1.5;

        security.generateId(); // Chama o método para gerar o ID

        expect(security).toBeDefined();
        expect(security.id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        ); // Verifica se o ID é um UUID
        expect(security.ticker).toBe('AAPL');
        expect(security.securityName).toBe('Apple Inc.');
        expect(security.sector).toBe('Technology');
        expect(security.country).toBe('USA');
        expect(security.trend).toBe(1.5);
        expect(security.dailySeries).toBeUndefined();
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

        security.dailySeries = [dailySeries];

        expect(security.dailySeries).toContain(dailySeries);
        expect(dailySeries.security).toBe(security);
    });
});