import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function Admin() {
  return (
    <Routes>
      <Route path='dashboard' element={<AdminDashboardPage />} />
    </Routes>
  );
}
