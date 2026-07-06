import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Server, User, Lock, ArrowRight } from 'lucide-react';

export default function PublicView({ isAdmin, onLogin }) {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLogin();
      navigate('/admin');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, fontSize: '18px' }}>
          <Server color="var(--accent)" /> Jay Server
        </div>
        <div>
          {isAdmin ? (
            <button className="btn btn-primary" onClick={() => navigate('/admin')}>Go to Dashboard</button>
          ) : (
            <button className="btn" onClick={() => setShowLogin(true)}><Lock size={16} /> Admin Login</button>
          )}
        </div>
      </nav>

      <main style={{ maxWidth: '800px', textAlign: 'center', marginTop: '-50px' }} className="animate-fade-in">
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', borderRadius: '20px', fontSize: '14px', marginBottom: '24px', fontWeight: 500 }}>
          Status: All Systems Operational 🟢
        </div>
        <h1 style={{ fontSize: '56px', fontWeight: 700, marginBottom: '24px', letterSpacing: '-1px', lineHeight: 1.1 }}>
          Welcome to <span style={{ color: 'var(--accent)' }}>Jay's</span> Server.
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '40px', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 40px' }} className="animate-fade-in delay-1">
          This is the central hub for my homelab, hosting services, and development projects. Explore my portfolio or check out my recent code.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }} className="animate-fade-in delay-2">
          <button className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }} onClick={() => window.open('https://github.com', '_blank')}>
            <Code size={20} /> View Projects
          </button>
          <button className="btn" style={{ padding: '14px 28px', fontSize: '16px' }}>
            <User size={20} /> Portfolio
          </button>
        </div>
      </main>

      {showLogin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', zIndex: 100 }}>
          <div className="glass-panel animate-fade-in" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
            <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>Admin Login</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px' }}>Enter the master password to access the dashboard.</p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" className="btn" onClick={() => setShowLogin(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Login <ArrowRight size={16} /></button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
