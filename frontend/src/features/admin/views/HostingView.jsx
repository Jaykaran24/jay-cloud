import React, { useEffect, useState } from 'react';
import { Plus, ExternalLink } from 'lucide-react';
import { getApps } from '../../../shared/api';

export default function HostingView() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getApps()
      .then(setApps)
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
