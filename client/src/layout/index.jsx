import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Container } from '@chakra-ui/react';

export default function Layout() {
  return (
    <>
      <Header />
      <Container maxW='1370px'>
        <Box minH='100vh' maxH='auto' py='20' minW='auto' maxW='auto'>
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
