import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import dockerRoutes from './routes/docker.routes';
import monitoringRoutes from './routes/monitoring.routes';
import { errorHandler } from './middleware/error.middleware';
import { requireAuth } from './middleware/auth.middleware';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://192.168.1.9:5173',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/docker', requireAuth, dockerRoutes);
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use('/api/monitoring', requireAuth, monitoringRoutes);
app.use(errorHandler);
export default app;
