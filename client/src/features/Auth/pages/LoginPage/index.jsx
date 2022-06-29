import { Box, Center, Container, Image, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import LoginImage from '../../../../assets/register_food.png';
import LoginForm from '../../components/LoginForm';
import { auth } from '../../../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase/app';
//import userApi from '../../../../api/userApi';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const provider = new firebase.auth.GoogleAuthProvider();
  //const user = JSON.parse(localStorage.getItem('account'));

  const onPressLoginGoogle = async () => {
    try {
      await auth
        .signInWithRedirect(provider)
        .then((result) => {
          console.log(result);
        })
        .then(() => {
          window.location.pathname = '/';
        });
    } catch (error) {
      if (error) {
        toast.error(error);
      }
    }
  };

  // useEffect(() => {
  //   if (user) return;
  //   try {
  //     const createUser = async () => {
  //       const response = await userApi.createUser({
  //         userFirebaseId: user?.uid,
  //         email: user?.email,
  //         fullName: user?.displayName,
  //       });
  //       console.log(response);
  //     };
  //     createUser();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [user]);

  const onPressLogin = async (values) => {
    try {
      await auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then((user) => {
          console.log(user);
        });
      setTimeout(() => {
        window.location.pathname = '/';
      }, 800);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        toast.error('Please check your Password again!');
      }
      if (error.code === 'auth/user-not-found') {
        toast.error('Account not found!');
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
            <LoginForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onPressLogin={onPressLogin}
              onPressLoginGoogle={onPressLoginGoogle}
            />
          </Container>
        </Center>
      </Box>
      <ToastContainer />
    </Stack>
  );
}
