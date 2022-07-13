import { Box, Center, Container, Image, Stack } from '@chakra-ui/react';
import React from 'react';
import LoginImage from '../../../../assets/register_food.png';
import { auth } from '../../../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
//import { useNavigate } from 'react-router-dom';
//import userApi from '../../../../api/userApi';

export default function ForgotPasswordPage() {
  //const navigate = useNavigate();
  const onPressReset = async (values) => {
    try {
      await auth.sendPasswordResetEmail(values.email);
      toast.success('Email has been sent!', {
        autoClose: 1200,
      });
      // setTimeout(() => {
      //   navigate('/');
      // }, 1500);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        toast.error('Email not found!');
      }
    }
  };

  return (
    <Stack spacing='0' direction={['column', 'row']} h='100vh' w='100vw'>
      <Box flex='1'>
        <Image
          objectFit='cover'
          w='100%'
          h='100%'
          src={LoginImage}
          alt='signup_image'
        />
      </Box>
      <Box flex='1'>
        <Center h='100vh'>
          <Container>
            <ForgotPasswordForm onPressReset={onPressReset} />
          </Container>
        </Center>
      </Box>
      <ToastContainer />
    </Stack>
  );
}
