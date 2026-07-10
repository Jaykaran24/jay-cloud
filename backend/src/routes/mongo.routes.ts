import { Router } from 'express';
import { listDatabases, listCollections, fetchDocuments } from '../controllers/mongo.controller';

const router = Router();

router.get('/dbs', listDatabases);
router.get('/dbs/:db/collections', listCollections);
router.get('/dbs/:db/collections/:collection/docs', fetchDocuments);

export default router;
