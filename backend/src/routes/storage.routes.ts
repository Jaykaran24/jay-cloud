import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fsSync from 'fs';
import {
  listFiles,
  uploadFile,
  createFolder,
  deleteItem,
  downloadFile,
  moveItems,
  copyItems,
  deleteBatch
} from '../controllers/storage.controller';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirPath = (req.query.path as string) || '/';
    const relativePath = (req.query.relativePath as string) || '';
    const BASE_DIR = '/opt/apps/jay-cloud/backend/storage/uploads';
    
    let finalDirPath = dirPath;
    if (relativePath) {
      finalDirPath = path.join(dirPath, path.dirname(relativePath));
    }
    
    const resolvedPath = path.resolve(BASE_DIR, finalDirPath.replace(/^\//, ''));
    
    // Ensure path is safe
    if (!resolvedPath.startsWith(BASE_DIR)) {
      return cb(new Error('Invalid upload path'), '');
    }
    
    fsSync.mkdirSync(resolvedPath, { recursive: true });
    cb(null, resolvedPath);
  },
  filename: (req, file, cb) => {
    const relativePath = (req.query.relativePath as string) || '';
    if (relativePath) {
      cb(null, path.basename(relativePath));
    } else {
      cb(null, file.originalname);
    }
  }
});

const upload = multer({ storage });

router.get('/', listFiles);
router.post('/upload', upload.single('file'), uploadFile);
router.post('/folder', createFolder);
router.delete('/:name', deleteItem);
router.get('/download/:name', downloadFile);
router.post('/move', moveItems);
router.post('/copy', copyItems);
router.post('/delete-batch', deleteBatch);

export default router;
