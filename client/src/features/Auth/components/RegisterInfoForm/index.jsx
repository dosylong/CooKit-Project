import {
  Heading,
  Text,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Box,
  InputGroup,
  InputLeftElement,
  VStack,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsClipboardCheck } from 'react-icons/bs';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import React from 'react';
import { Link } from 'react-router-dom';
import Step from '../../../../components/Step';

export default function RegisterInfoForm(props) {
  const {
    prevStep,
    activeStep,
    formInfoData,
    setFormInfoData,
    onClickSubmitForm,
  } = props;

  const initialValues = {
    bio: formInfoData.bio,
    fullName: formInfoData.fullName,
  };

  const handleSubmitInfo = (values) => {
    setFormInfoData({
      bio: values.bio,
      fullName: values.fullName,
    });
  };

  const signUpSchema = yup.object().shape({
    bio: yup.string().required('Bio is required!'),
    firstName: yup
      .string()
      .min(2, 'Full Name is too short!')
      .max(500, 'Full Name is too long!')
      .required('Full Name is required!'),
  });

  return (
    <>
      <Heading size='2xl'>Almost there</Heading>

      <Box py='3'>
        <Text color='gray.600'>
          Just fill some fields left and you can start to explore.
        </Text>
      </Box>

      <Step activeStep={1} />

      <Box py='5'>
        <Box w='full' borderTopWidth='2px' h='3px' borderTopColor='gray.200' />
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          handleSubmitInfo(values);
          onClickSubmitForm(values);
          return new Promise((resolve) => {
            setTimeout(resolve, 1100);
          });
        }}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form>
            <VStack spacing='5'>
              <FormControl
                isRequired
                isInvalid={errors.fullName && touched.fullName}>
                <FormLabel htmlFor='fullName'>Full Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AiOutlineUser color='gray' />}
                  />
                  <Input
                    id='fullName'
                    type='text'
                    placeholder='Full Name'
                    value={values.fullName}
                    onChange={handleChange}
                    focusBorderColor='green.400'
                    sx={{
                      borderRadius: '9px',
                    }}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.fullName}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.bio && touched.bio}>
                <FormLabel htmlFor='bio'>Bio</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<BsClipboardCheck color='gray' />}
                  />
                  <Input
                    id='bio'
                    type='text'
                    placeholder='Bio'
                    value={values.bio}
                    onChange={handleChange}
                    focusBorderColor='green.400'
                    sx={{
                      borderRadius: '9px',
                    }}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.bio}</FormErrorMessage>
              </FormControl>

              <Button
                w='full'
                colorScheme='green'
                sx={{
                  borderRadius: '9px',
                }}
                isLoading={isSubmitting}
                loadingText={isSubmitting && 'Registering...'}
                boxShadow='xl'
                type='submit'
                onClick={handleSubmit}>
                Register
              </Button>

              <Button
                w='full'
                variant='ghost'
                colorScheme='green'
                sx={{
                  borderRadius: '9px',
                }}
                isDisabled={activeStep === 0}
                onClick={prevStep}>
                Prev Step
              </Button>
            </VStack>

            <Box py='4'>
              <HStack>
                <Text>Already have an account?</Text>
                <Link to='/account/login'>
                  <Text
                    color='green.500'
                    fontWeight='bold'
                    _hover={{ textDecoration: 'underline' }}>
                    Log in.
                  </Text>
                </Link>
              </HStack>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
