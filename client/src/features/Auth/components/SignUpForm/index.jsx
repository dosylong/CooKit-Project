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
  Flex,
  Link,
  useColorModeValue,
  InputRightElement,
} from '@chakra-ui/react';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { FaRegEyeSlash } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import React from 'react';

export default function SignUpPage(props) {
  const { showPassword, setShowPassword } = props;

  const customDividerColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <>
      <Heading size='2xl'>Get's started.</Heading>
      <Box py='4'>
        <HStack>
          <Text>Already have an account?</Text>
          <Link color='green.500' fontWeight='bold'>
            Sign in.
          </Link>
        </HStack>
      </Box>

      <Box py='4'>
        <Button
          leftIcon={<FcGoogle size='1.5em' />}
          w='full'
          borderColor='green.400'
          variant='outline'
          _hover={{ bg: 'green.500', color: 'white' }}>
          Sign up with Google
        </Button>
      </Box>

      <Box py='4'>
        <Flex align='center'>
          <Box
            w='full'
            borderTopWidth='2px'
            h='3px'
            borderTopColor={customDividerColor}
          />
          <Text
            ml='3'
            mr='3'
            fontFamily='body'
            whiteSpace='nowrap'
            fontWeight='semi-bold'
            textTransform='uppercase'
            fontSize='xs'
            color='gray.500'>
            or
          </Text>
          <Box
            w='full'
            borderTopWidth='2px'
            h='3px'
            borderTopColor={customDividerColor}
          />
        </Flex>
      </Box>

      <VStack spacing='5'>
        {/* <HStack spacing='5'>
          <FormControl isRequired>
            <FormLabel htmlFor='firstName'>First Name</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<AiOutlineUser color='gray' />}
              />
              <Input
                id='firstName'
                placeholder='First Name'
                focusBorderColor='green.400'
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor='lastName'>Last Name</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<AiOutlineUser color='gray' />}
              />
              <Input
                id='lastName'
                placeholder='Last Name'
                focusBorderColor='green.400'
              />
            </InputGroup>
          </FormControl>
        </HStack> */}

        <FormControl isRequired>
          <FormLabel htmlFor='email'>Email address</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<HiOutlineMail color='gray' />}
            />
            <Input
              id='email'
              type='email'
              placeholder='Email'
              focusBorderColor='green.400'
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='username'>Username</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<AiOutlineUser color='gray' />}
            />
            <Input
              id='username'
              type='text'
              placeholder='Username'
              focusBorderColor='green.400'
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<RiLockPasswordLine color='gray' />}
            />
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              focusBorderColor='green.400'
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
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='confirmPassword'>Confirm password</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<RiLockPasswordLine color='gray' />}
            />
            <Input
              id='confirmPassword'
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm password'
              focusBorderColor='green.400'
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
        </FormControl>
        <Button w='full' colorScheme='green' boxShadow='xl'>
          Next Step
        </Button>
      </VStack>
    </>
  );
}
