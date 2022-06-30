import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminContent() {
  const navigate = useNavigate();
  const onPressHomePage = () => {
    navigate('/');
  };
  return (
    <>
      <Text>Admin Dashboard</Text>
      <Button onClick={onPressHomePage}>Home</Button>
    </>
  );
}
