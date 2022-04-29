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

  const { activeStep, nextStep, prevStep } = useSteps({
    initialStep: 0,
  });

  const onClickNextStepAccount = async (values) => {
    try {
      await auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((user) => {
          console.log(user);
          nextStep();
        });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error(`${values.email} already in use!`);
      }
    }
  };

  const onClickSubmitInfoForm = async (values) => {
    try {
      await userApi
        .createUser({
          userFirebaseId: auth.currentUser.uid,
          email: auth.currentUser.email,
          fullName: values.fullName,
          bio: values.bio,
        })
        .then(() => {
          toast.success('Registered successfully!', {
            autoClose: 1200,
          });
        });

      await auth.currentUser
        .updateProfile({
          displayName: values.fullName,
        })
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });

      setTimeout(() => {
        window.location.pathname = '/';
      }, 1400);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This Email already in use!');
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
                prevStep={prevStep}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                formData={formData}
                setFormData={setFormData}
                onClickNextStepAccount={onClickNextStepAccount}
              />
            )}
            {activeStep === 1 && (
              <RegisterInfoForm
                activeStep={activeStep}
                prevStep={prevStep}
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
