import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  Checkbox,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { RiLockPasswordLine } from 'react-icons/ri';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

export default function LoginForm(props) {
  const { showPassword, setShowPassword, onPressLogin, onPressLoginGoogle } =
    props;

  const initialValues = {
    email: '',
    password: '',
  };

  const signUpSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please input valid email!')
      .required('Email is required!'),
    password: yup.string().required('Password is required!'),
  });

  return (
    <>
      <Heading size='2xl'>Welcome back</Heading>

      <Box py='3'>
        <Text color='gray.600'>
          Enter your credentials to access your account.
        </Text>
      </Box>

      <Box py='4'>
        <Button
          leftIcon={<FcGoogle size='1.5em' />}
          w='full'
          sx={{
            borderRadius: '9px',
          }}
          boxShadow='md'
          borderColor='gray.200'
          variant='outline'
          onClick={onPressLoginGoogle}
          _hover={{ bg: 'green.500', color: 'white' }}>
          Log In with Google
        </Button>
      </Box>

      <Box py='3'>
        <Flex align='center'>
          <Box
            w='full'
            borderTopWidth='2px'
            h='3px'
            borderTopColor='gray.200'
          />
          <Text
            ml='3'
            mr='3'
            fontFamily='body'
            whiteSpace='nowrap'
            fontWeight='semibold'
            textTransform='uppercase'
            fontSize='sm'
            color='gray.200'>
            or
          </Text>
          <Box
            w='full'
            borderTopWidth='2px'
            h='3px'
            borderTopColor='gray.200'
          />
        </Flex>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          onPressLogin(values);
          return new Promise((resolve) => {
            setTimeout(resolve, 1200);
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
              <FormControl isRequired isInvalid={errors.email && touched.email}>
                <FormLabel htmlFor='email' fontWeight='bold'>
                  Email address
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AiOutlineUser color='gray' />}
                  />
                  <Input
                    id='email'
                    type='text'
                    placeholder='Email address'
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

              <FormControl
                isRequired
                isInvalid={errors.password && touched.password}>
                <HStack justifyContent='space-between'>
                  <FormLabel htmlFor='password' fontWeight='bold'>
                    Password
                  </FormLabel>
                  <Text
                    color='green.500'
                    fontWeight='bold'
                    fontSize='14px'
                    _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    Forgot password?
                  </Text>
                </HStack>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<RiLockPasswordLine color='gray' />}
                  />
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    onChange={handleChange}
                    value={values.password}
                    focusBorderColor='green.400'
                    sx={{
                      borderRadius: '9px',
                    }}
                  />
                  <InputRightElement>
                    <Button
                      variant='ghost'
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      <Text fontSize='xl'>
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </Text>
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <Checkbox colorScheme='green'>Remember information</Checkbox>
              </FormControl>

              <Button
                w='full'
                colorScheme='green'
                sx={{
                  borderRadius: '9px',
                }}
                isLoading={isSubmitting}
                loadingText={isSubmitting && 'Logging in...'}
                boxShadow='xl'
                type='submit'
                onClick={handleSubmit}>
                Log in
              </Button>
            </VStack>

            <Box py='9'>
              <HStack>
                <Text>New to Cookit?</Text>
                <Link to='/account/register'>
                  <Text
                    color='green.500'
                    fontWeight='bold'
                    _hover={{ textDecoration: 'underline' }}>
                    Register.
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
