import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Box, Container } from '@chakra-ui/react';

export default function Layout() {
  return (
    <>
      <Header />
      <Box minH='100vh' maxH='auto' px={4}>
        <Container maxW='container.xl'>asd</Container>
        <Outlet />
      </Box>
    </>
  );
}
