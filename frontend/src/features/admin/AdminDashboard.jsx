import React, { useState } from 'react';
import { Activity, HardDrive, Box, LogOut, Search, Settings } from 'lucide-react';
import NavItem from './components/NavItem';
import HostingView from './views/HostingView';
import StorageView from './views/StorageView';

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
