import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import ProfilePage from './pages/ProfilePage';

export default function Register() {
  return (
    <>
      <Routes>
        <Route path='/:userId' element={<ProfilePage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}
