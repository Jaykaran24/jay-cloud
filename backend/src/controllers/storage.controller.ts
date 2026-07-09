import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

const BASE_DIR = '/opt/apps/jay-cloud/backend/storage/uploads';

const getSafePath = (userPath: string) => {
  const resolvedPath = path.resolve(BASE_DIR, userPath.replace(/^\//, ''));
  if (!resolvedPath.startsWith(BASE_DIR)) {
    throw new Error('Invalid path');
  }
  return resolvedPath;
};

export const listFiles = async (req: Request, res: Response) => {
  try {
    const dirPath = (req.query.path as string) || '/';
    const safePath = getSafePath(dirPath);
    const items = await fs.readdir(safePath, { withFileTypes: true });
    const files = await Promise.all(
      items.map(async (item) => {
        const itemPath = path.join(safePath, item.name);
        const stats = await fs.stat(itemPath);
        return {
          name: item.name,
          type: item.isDirectory() ? 'folder' : 'file',
          size: stats.size,
          updatedAt: stats.mtime,
        };
      })
    );
    res.json(files);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to list files', details: error.message });
  }
};

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  } catch (error: any) {
    res.status(500).json({ error: 'File upload failed', details: error.message });
  }
};

export const createFolder = async (req: Request, res: Response) => {
  try {
    const dirPath = (req.body.path as string) || '/';
    const folderName = req.body.name as string;
    if (!folderName) {
      return res.status(400).json({ error: 'Folder name is required' });
    }
    const safePath = getSafePath(path.join(dirPath, folderName));
    await fs.mkdir(safePath, { recursive: true });
    res.status(201).json({ message: 'Folder created successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create folder', details: error.message });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const itemPath = (req.query.path as string) || '/';
    const safePath = getSafePath(itemPath);
    await fs.rm(safePath, { recursive: true, force: true });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete item', details: error.message });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  try {
    const itemPath = (req.query.path as string) || '/';
    const safePath = getSafePath(itemPath);
    res.download(safePath);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to download file', details: error.message });
  }
};
