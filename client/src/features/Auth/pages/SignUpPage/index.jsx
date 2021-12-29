import { Box, Center, Container, Image, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SignUpImage from '../../../../assets/register_food.png';
import SignUpForm from '../../components/SignUpForm';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack spacing='0' direction={['column', 'row']} h='100vh' w='100vw'>
      <Box flex='1'>
        <Image
          objectFit='cover'
          w='100%'
          h='100%'
          src={SignUpImage}
          alt='signup_image'
        />
      </Box>
      <Box flex='1' bg='white'>
        <Center h='100vh'>
          <Container>
            <SignUpForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </Container>
        </Center>
      </Box>
    </Stack>
  );
}
