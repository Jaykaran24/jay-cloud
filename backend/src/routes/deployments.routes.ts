import { Router } from 'express';
import multer from 'multer';
import { deployApp, getDeployments, startDeployment, stopDeployment, restartDeployment, deleteDeployment } from '../controllers/deployments.controller';

const router = Router();
const upload = multer({ dest: 'storage/temp/' });

router.get('/', getDeployments);
router.post('/deploy', upload.single('file'), deployApp);
router.post('/:id/start', startDeployment);
router.post('/:id/stop', stopDeployment);
router.post('/:id/restart', restartDeployment);
router.delete('/:id', deleteDeployment);

export default router;
