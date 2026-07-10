import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const listDatabases = async (req: Request, res: Response) => {
  try {
    const adminDb = mongoose.connection.db?.admin();
    if (!adminDb) throw new Error("MongoDB not connected");
    const result = await adminDb.listDatabases();
    res.json(result.databases);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const listCollections = async (req: Request, res: Response) => {
  try {
    const dbName = req.params.db as string;
    const db = mongoose.connection.getClient().db(dbName);
    const collections = await db.listCollections().toArray();
    res.json(collections);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchDocuments = async (req: Request, res: Response) => {
  try {
    const dbName = req.params.db as string;
    const colName = req.params.collection as string;
    
    // Prevent reading system config/sessions directly as it often requires higher privileges
    if (colName.startsWith('system.') && dbName === 'config') {
      return res.status(403).json({ message: "Access to system configuration collections is restricted." });
    }

    const db = mongoose.connection.getClient().db(dbName);
    const docs = await db.collection(colName).find({}).limit(50).toArray();
    res.json(docs);
  } catch (error: any) {
    // Check if it's an unauthorized error or a generic mongo server error
    if (error.code === 13 || error.message.includes('not authorized')) {
      return res.status(403).json({ message: "Not authorized to read this collection." });
    }
    res.status(500).json({ message: error.message });
  }
};
