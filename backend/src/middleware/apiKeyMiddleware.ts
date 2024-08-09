import { Request, Response, NextFunction } from 'express';

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    const secretKey = process.env.API_SECRET_KEY;

    if (apiKey === secretKey) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
};

export default apiKeyMiddleware;