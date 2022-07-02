import React from 'react';
import AdminDashboard from '../../components/AdminDashboard';
import { auth } from '../../../../firebase';

export default function AdminPage() {
  const onPressLogOut = async () => {
    await auth.signOut().then(() => {
      localStorage.clear();
      window.location.href = '/';
    });
  };
  return <AdminDashboard onPressLogOut={onPressLogOut} />;
}
