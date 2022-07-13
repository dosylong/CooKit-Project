import {
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

export default function RegisterProfileForm(props) {
  const { formInfoData, setFormInfoData, onClickSubmitInfoForm } = props;

  const initialValues = {
    username: formInfoData.username,
    bio: formInfoData.bio,
    fullName: formInfoData.fullName,
  };

  const handleSubmitInfo = (values) => {
    setFormInfoData({
      username: values.username,
      bio: values.bio,
      fullName: values.fullName,
    });
    onClickSubmitInfoForm(values);
  };

  const signUpSchema = yup.object().shape({
    username: yup
      .string()
      .min(1, 'Username have to be at least 2 characters long!')
      .max(500, 'Username is too long!')
      .required('Username is required!'),
    bio: yup.string().required('Bio is required!'),
    fullName: yup
      .string()
      .min(2, 'Full Name is too short!')
      .max(500, 'Full Name is too long!')
      .required('Full Name is required!'),
  });

  return (
    <>
      <Text fontSize='55' fontWeight='600'>
        Almost there
      </Text>

      <Box py='3' pb='7'>
        <Text color='gray.600'>
          Just fill some fields left and you can start to explore
        </Text>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          handleSubmitInfo(values);
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
                isInvalid={errors.username && touched.username}>
                <FormLabel htmlFor='username' fontWeight='bold'>
                  Username
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AiOutlineUser color='gray' />}
                  />
                  <Input
                    id='username'
                    type='text'
                    placeholder='Username'
                    value={values.username}
                    onChange={handleChange}
                    focusBorderColor='green.400'
                    sx={{
                      borderRadius: '9px',
                    }}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={errors.fullName && touched.fullName}>
                <FormLabel htmlFor='fullName' fontWeight='bold'>
                  Full Name
                </FormLabel>
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
                <FormLabel htmlFor='bio' fontWeight='bold'>
                  Bio
                </FormLabel>
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
            </VStack>

            <Box py='4'>
              <HStack py='2'>
                <Text>Back to</Text>
                <Link to='/'>
                  <Text
                    color='green.500'
                    fontWeight='bold'
                    _hover={{ textDecoration: 'underline' }}>
                    Home.
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
