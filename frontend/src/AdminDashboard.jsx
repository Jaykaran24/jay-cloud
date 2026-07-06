import React, { useState, useEffect } from 'react';
import { Activity, HardDrive, Box, LogOut, Search, Plus, ExternalLink, Settings, File, Folder, Trash2, Upload } from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('hosting');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="glass-panel" style={{ width: '280px', margin: '20px', padding: '24px', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 700, fontSize: '20px', marginBottom: '40px' }}>
          <Box color="var(--accent)" size={28} /> Jay OS
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <NavItem icon={<Activity />} label="Hosting (Vercel)" active={activeTab === 'hosting'} onClick={() => setActiveTab('hosting')} />
          <NavItem icon={<HardDrive />} label="Storage (Drive)" active={activeTab === 'storage'} onClick={() => setActiveTab('storage')} />
          <NavItem icon={<Settings />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <button className="btn" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }} onClick={onLogout}>
          <LogOut size={16} /> Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: '20px 20px 20px 0', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        <header className="glass-panel" style={{ padding: '16px 32px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, textTransform: 'capitalize' }}>{activeTab}</h2>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} size={18} />
            <input type="text" placeholder="Search..." style={{ paddingLeft: '40px', width: '250px', background: 'rgba(0,0,0,0.3)' }} />
          </div>
        </header>

        <div className="glass-panel animate-fade-in" style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {activeTab === 'hosting' && <HostingView />}
          {activeTab === 'storage' && <StorageView />}
          {activeTab === 'settings' && <div>Settings panel coming soon.</div>}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px',
        background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
        border: 'none', color: active ? '#fff' : 'var(--text-muted)',
        cursor: 'pointer', transition: 'all 0.2s', fontSize: '15px', fontWeight: 500, width: '100%', textAlign: 'left'
      }}>
      {React.cloneElement(icon, { size: 20, color: active ? 'var(--accent)' : 'var(--text-muted)' })}
      {label}
    </button>
  );
}

function HostingView() {
  const [apps, setApps] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3001/api/apps')
      .then(res => res.json())
      .then(data => setApps(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Deployed Projects</h3>
          <p style={{ color: 'var(--text-muted)' }}>Manage your Docker containers and applications.</p>
        </div>
        <button className="btn btn-primary"><Plus size={18} /> New Project</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {apps.map((app, i) => (
          <div key={i} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ fontWeight: 600, fontSize: '18px' }}>{app.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: app.status === 'running' ? 'var(--success)' : '#ef4444', background: app.status === 'running' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', padding: '4px 8px', borderRadius: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: app.status === 'running' ? 'var(--success)' : '#ef4444' }} />
                {app.status}
              </div>
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ExternalLink size={14} /> {app.url || app.image}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <span>Created {app.time}</span>
              <button className="btn" style={{ padding: '6px 12px' }}>Manage</button>
            </div>
          </div>
        ))}
        {apps.length === 0 && <p>No apps running.</p>}
      </div>
    </div>
  );
}

function StorageView() {
  const [files, setFiles] = useState([]);
  
  const fetchFiles = () => {
    fetch('http://localhost:3001/api/files')
      .then(res => res.json())
      .then(data => setFiles(data))
      .catch(console.error);
  };
  
  useEffect(() => { fetchFiles(); }, []);

  const handleUpload = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length === 0) return;
    
    const formData = new FormData();
    for(let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData
    }).then(() => fetchFiles());
  };

  const handleCreateFolder = () => {
    const name = prompt("Enter new folder name:");
    if (name) {
      fetch('http://localhost:3001/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      }).then(() => fetchFiles());
    }
  };

  const handleDelete = (filename) => {
    fetch(`http://localhost:3001/api/files/${filename}`, { method: 'DELETE' })
      .then(() => fetchFiles());
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
          {files.map(file => (
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
