import express from 'express';
import cors from 'cors';
import securityRoutes from './routes/securityRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.use(securityRoutes);

export default app;