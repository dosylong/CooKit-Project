import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterProfilePage from './pages/RegisterProfilePage';

export default function Register() {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='forgot-password' element={<ForgotPasswordPage />} />
      <Route path='register-profile' element={<RegisterProfilePage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
