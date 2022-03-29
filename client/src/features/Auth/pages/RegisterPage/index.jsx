import { Box, Center, Container, Image, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import RegisterImage from '../../../../assets/register_food.png';
import RegisterAccountForm from '../../components/RegisterAccountForm';
import { useSteps } from 'chakra-ui-steps';
import RegisterInfoForm from '../../components/RegisterInfoForm';
import { auth } from '../../../../firebase';
import userApi from '../../../../api/userApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formInfoData, setFormInfoData] = useState({
    fullName: '',
    bio: '',
  });

  const onClickSubmitForm = async (values) => {
    try {
      await auth
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((user) => {
          toast.success('Registered successfully!', {
            autoClose: 1100,
          });
          console.log(user);
        });

      await userApi.createUser({
        userFirebaseId: auth.currentUser.uid,
        email: auth.currentUser.email,
        fullName: values.fullName,
        bio: values.bio,
      });

      await auth.currentUser
        .updateProfile({
          displayName: values.fullName,
        })
        .then(() => {
          console.log('Updated display name successfully');
        })
        .catch((error) => {
          console.log(error);
        });

      setTimeout(() => {
        window.location.pathname = '/';
      }, 1100);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This Email already in use!');
      }
    }
  };

  const { activeStep, nextStep, prevStep } = useSteps({
    initialStep: 0,
  });

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
            {activeStep === 0 && (
              <RegisterAccountForm
                activeStep={activeStep}
                nextStep={nextStep}
                prevStep={prevStep}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {activeStep === 1 && (
              <RegisterInfoForm
                activeStep={activeStep}
                prevStep={prevStep}
                formInfoData={formInfoData}
                setFormInfoData={setFormInfoData}
                onClickSubmitForm={onClickSubmitForm}
              />
            )}
          </Container>
        </Center>
      </Box>
      <ToastContainer />
    </Stack>
  );
}
