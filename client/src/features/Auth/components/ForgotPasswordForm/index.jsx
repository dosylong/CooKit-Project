import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

export default function LoginForm(props) {
  const { onPressReset } = props;

  const initialValues = {
    email: '',
  };

  const signUpSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please input valid email!')
      .required('Email is required!'),
  });

  return (
    <>
      <Text fontSize='55' fontWeight='700'>
        Forget password?
      </Text>

      <Box py='1'>
        <Text color='gray.600' fontWeight='700'>
          No worries, we'll send you reset instructions.
        </Text>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          onPressReset(values);
          return new Promise((resolve) => {
            setTimeout(resolve, 1400);
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
            <VStack spacing='6' py='5'>
              <FormControl isRequired isInvalid={errors.email && touched.email}>
                <FormLabel htmlFor='email' fontWeight='bold'>
                  Email
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AiOutlineUser color='gray' />}
                  />
                  <Input
                    id='email'
                    type='text'
                    placeholder='Enter your email'
                    onChange={handleChange}
                    value={values.email}
                    focusBorderColor='green.400'
                    sx={{
                      borderRadius: '9px',
                    }}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <Button
                w='full'
                h='40px'
                colorScheme='green'
                sx={{
                  borderRadius: '9px',
                }}
                isLoading={isSubmitting}
                loadingText={isSubmitting && 'Sending...'}
                boxShadow='xl'
                type='submit'
                onClick={handleSubmit}>
                Send reset instructions
              </Button>
            </VStack>

            <Box py='3'>
              <HStack>
                <Text>Remembered?</Text>
                <Link to='/account/login'>
                  <Text
                    color='green.500'
                    fontWeight='bold'
                    _hover={{ textDecoration: 'underline' }}>
                    Login.
                  </Text>
                </Link>
              </HStack>

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
