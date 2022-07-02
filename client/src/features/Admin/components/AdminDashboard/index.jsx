import { Button, Text } from '@chakra-ui/react';
import React from 'react';

export default function AdminContent(props) {
  const { onPressLogOut } = props;

  return (
    <>
      <Text>Admin Dashboard</Text>
      <Button onClick={onPressLogOut}>Log Out</Button>
    </>
  );
}
