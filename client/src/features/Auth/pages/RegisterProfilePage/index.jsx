import { Box, Center, Container, Image, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import RegisterImage from '../../../../assets/register_food.png';
import RegisterProfileForm from '../../components/RegisterProfileForm';
import { auth } from '../../../../firebase';
import userApi from '../../../../api/userApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSteps } from 'chakra-ui-steps';

export default function RegisterProfilePage() {
  const [formInfoData, setFormInfoData] = useState({
    username: '',
    fullName: '',
    bio: '',
  });

  const { activeStep } = useSteps({
    initialStep: 1,
  });

  const onClickSubmitInfoForm = async (values) => {
    try {
      const response = await userApi.createUser({
        userFirebaseId: auth.currentUser.uid,
        email: auth.currentUser.email,
        username: values.username,
        fullName: values.fullName,
        bio: values.bio,
      });
      if (response.message === 'username-exist') {
        toast.error(`${values.username} already in use!`);
      } else {
        await auth.currentUser
          .updateProfile({
            displayName: values.fullName,
          })
          .then(() => {
            console.log('Display Name: ', auth.currentUser.displayName);
          })
          .catch((error) => {
            console.log(error);
          });
        toast.success('Registered successfully!', {
          autoClose: 1200,
        });
        setTimeout(() => {
          window.location.pathname = '/';
        }, 1400);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack spacing='0' direction={['column', 'row']} h='100vh' w='100vw'>
      <Box flex='1'>
        <Image
          objectFit='cover'
          w='100%'
          h='100%'
          src={RegisterImage}
          alt='signup_image'
        />
      </Box>
      <Box flex='1'>
        <Center h='100vh'>
          <Container>
            {activeStep === 1 && (
              <RegisterProfileForm
                formInfoData={formInfoData}
                setFormInfoData={setFormInfoData}
                onClickSubmitInfoForm={onClickSubmitInfoForm}
              />
            )}
          </Container>
        </Center>
      </Box>
      <ToastContainer />
    </Stack>
  );
}
