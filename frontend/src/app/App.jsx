import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicView from '../features/public/PublicView';
import AdminDashboard from '../features/admin/AdminDashboard';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicView isAdmin={isAdmin} onLogin={() => setIsAdmin(true)} />} />
        <Route path="/admin/*" element={isAdmin ? <AdminDashboard onLogout={() => setIsAdmin(false)} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
