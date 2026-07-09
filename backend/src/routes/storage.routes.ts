import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import {
  listFiles,
  uploadFile,
  createFolder,
  deleteItem,
  downloadFile
} from '../controllers/storage.controller';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirPath = (req.body.path as string) || '/';
    const BASE_DIR = '/opt/apps/jay-cloud/backend/storage/uploads';
    const resolvedPath = path.resolve(BASE_DIR, dirPath.replace(/^\//, ''));
    if (!resolvedPath.startsWith(BASE_DIR)) {
      return cb(new Error('Invalid upload path'), '');
    }
    cb(null, resolvedPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.get('/', listFiles);
router.post('/upload', upload.single('file'), uploadFile);
router.post('/folder', createFolder);
router.delete('/:name', deleteItem);
router.get('/download/:name', downloadFile);

export default router;
