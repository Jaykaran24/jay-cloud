const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Docker = require('dockerode');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

let docker;
try {
  docker = new Docker();
} catch (e) {
  console.log("Docker socket not found, running in mock mode");
}

const STORAGE_DIR = path.join(__dirname, 'storage_data');
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, STORAGE_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// 1. Hosting (Docker Containers)
app.get('/api/apps', async (req, res) => {
  try {
    if (docker) {
      const containers = await docker.listContainers({ all: true });
      const apps = containers.map(c => ({
        id: c.Id.substring(0, 12),
        name: c.Names[0].replace('/', ''),
        status: c.State,
        image: c.Image,
        time: new Date(c.Created * 1000).toLocaleString()
      }));
      res.json(apps);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.json([
      { name: 'mock-portfolio', status: 'running', url: 'jay24codes.me', time: 'Just now' },
      { name: 'mock-api', status: 'exited', url: 'api.jay24codes.me', time: '1 hr ago' }
    ]);
  }
});

// 2. Storage
app.get('/api/files', (req, res) => {
  try {
    const files = fs.readdirSync(STORAGE_DIR);
    const fileData = files.map(filename => {
      const stats = fs.statSync(path.join(STORAGE_DIR, filename));
      return {
        name: filename,
        size: stats.size,
        date: stats.mtime,
        isDirectory: stats.isDirectory()
      };
    });
    fileData.sort((a, b) => (b.isDirectory === a.isDirectory ? a.name.localeCompare(b.name) : (b.isDirectory ? 1 : -1)));
    res.json(fileData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/upload', upload.array('files'), (req, res) => {
  res.json({ message: 'Files uploaded successfully', files: req.files });
});

app.post('/api/folders', (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Folder name required" });
    const dirPath = path.join(STORAGE_DIR, name);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
      res.json({ message: 'Folder created' });
    } else {
      res.status(400).json({ error: "Folder already exists" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/files/:filename', (req, res) => {
  try {
    const filePath = path.join(STORAGE_DIR, req.params.filename);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
      res.json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ error: 'File/Folder not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'API not found' });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Jay Server Backend running on http://localhost:${PORT}`);
});
