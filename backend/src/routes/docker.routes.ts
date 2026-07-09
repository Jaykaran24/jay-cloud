import { Router } from 'express';
import { listContainers, startContainer, stopContainer, restartContainer } from '../controllers/docker.controller';

const router = Router();
router.get('/containers', listContainers);
router.post('/containers/:id/start', startContainer);
router.post('/containers/:id/stop', stopContainer);
router.post('/containers/:id/restart', restartContainer);
export default router;
