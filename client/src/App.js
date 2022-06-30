import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from './theme';
import Auth from './features/Auth';
import Profile from './features/Profile';
import Recipe from './features/Recipe';
import Layout from './layout';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import HomePage from './features/Home/pages/HomePage';
import Admin from './features/Admin';

function App() {
  const user = JSON.parse(localStorage.getItem('account'));

  const isAdmin = process.env.REACT_APP_ADMIN_UID === user?.uid;

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log('User is not logged in');
        return;
      } else {
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log('Logged in user: ', currentUser);

          localStorage.setItem('account', JSON.stringify(currentUser));
        }
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path='account/*'
            element={!user ? <Auth /> : <Navigate to='/' replace />}
          />

          <Route
            path='admin/*'
            element={!isAdmin ? <Navigate to='/' replace /> : <Admin />}
          />
          <Route path='/' element={<Layout />}>
            <Route path='profile/*' element={<Profile />} />
            <Route path='recipe/*' element={<Recipe />} />
            <Route path='/' element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
