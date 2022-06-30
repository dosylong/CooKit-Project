import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';

export default function Admin() {
  return (
    <Routes>
      <Route path='dashboard' element={<AdminPage />} />
    </Routes>
  );
}
