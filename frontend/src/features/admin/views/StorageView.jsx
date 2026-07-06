import React, { useEffect, useState } from 'react';
import { HardDrive, Folder, File, Trash2, Upload, Plus } from 'lucide-react';
import { createFolder, deleteFile, getFiles, uploadFiles } from '../../../shared/api';

export default function StorageView() {
  const [files, setFiles] = useState([]);

  const fetchFiles = () => {
    getFiles().then(setFiles).catch(console.error);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length === 0) return;

    uploadFiles(selectedFiles)
      .then(() => fetchFiles());
  };

  const handleCreateFolder = () => {
    const name = prompt('Enter new folder name:');
    if (name) {
      createFolder(name).then(() => fetchFiles());
    }
  };

  const handleDelete = (filename) => {
    deleteFile(filename).then(() => fetchFiles());
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Jay Drive</h3>
          <p style={{ color: 'var(--text-muted)' }}>Securely store and manage your personal files.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn" onClick={handleCreateFolder}><Plus size={18} /> New Folder</button>
          <label className="btn btn-primary" style={{ cursor: 'pointer' }}>
            <Upload size={18} /> Upload Files
            <input type="file" multiple style={{ display: 'none' }} onChange={handleUpload} />
          </label>
        </div>
      </div>

      {files.length === 0 ? (
        <div style={{ border: '1px dashed var(--border)', borderRadius: '12px', padding: '60px', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
          <HardDrive size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>Your Drive is empty</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
            Upload a file or create a folder to see it appear here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {files.map((file) => (
            <div key={file.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {file.isDirectory ? <Folder color="var(--accent)" fill="var(--accent-glow)" /> : <File color="var(--text-muted)" />}
                <span style={{ fontWeight: 500 }}>{file.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
                {!file.isDirectory && <span>{(file.size / 1024).toFixed(2)} KB</span>}
                {file.isDirectory && <span>Folder</span>}
                <button onClick={() => handleDelete(file.name)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
