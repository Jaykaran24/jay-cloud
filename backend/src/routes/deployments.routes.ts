import { Router } from 'express';
import multer from 'multer';
import { deployApp, getDeployments } from '../controllers/deployments.controller';

const router = Router();
const upload = multer({ dest: 'storage/temp/' });

router.get('/', getDeployments);
router.post('/deploy', upload.single('file'), deployApp);

export default router;
