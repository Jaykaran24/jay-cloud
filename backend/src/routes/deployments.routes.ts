import { Router } from 'express';
import multer from 'multer';
import { uploadAndDeploy, getDeployments } from '../controllers/deployments.controller';

const router = Router();
const upload = multer({ dest: 'storage/temp/' });

router.get('/', getDeployments);
router.post('/upload', upload.single('file'), uploadAndDeploy);

export default router;
