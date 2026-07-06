import React from 'react';

export default function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '10px',
        background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
        border: 'none',
        color: active ? '#fff' : 'var(--text-muted)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '15px',
        fontWeight: 500,
        width: '100%',
        textAlign: 'left'
      }}
    >
      {React.cloneElement(icon, { size: 20, color: active ? 'var(--accent)' : 'var(--text-muted)' })}
      {label}
    </button>
  );
}
