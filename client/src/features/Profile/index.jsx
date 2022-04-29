import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';

export default function Register() {
  return (
    <>
      <Routes>
        <Route path='/:userId' element={<ProfilePage />} />
      </Routes>
    </>
  );
}
