import React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Button,
  FormErrorMessage,
  Avatar,
  Stack,
  Text,
  Center,
  InputRightElement,
} from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsClipboardCheck } from 'react-icons/bs';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { FiUploadCloud } from 'react-icons/fi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { CircularProgress } from '@chakra-ui/react';
import { CircularProgressLabel } from '@chakra-ui/react';

export default function ProfileTabs(props) {
  const {
    userProfile,
    onClickEditInfo,
    isLoading,
    getRootProps,
    getInputProps,
    isDragActive,
    onClickChangePassword,
    showPassword,
    setShowPassword,
    imgProgress,
  } = props;
  const initialProfileValues = {
    bio: userProfile.bio,
    fullName: userProfile.fullName,
  };

  const initialPasswordValues = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const handleEditInfo = (values) => {
    onClickEditInfo(values);
  };

  const handleChangePassword = (values) => {
    onClickChangePassword(values);
  };

  const profileSchema = yup.object().shape({
    bio: yup.string().required('Bio is required!'),
    fullName: yup
      .string()
      .min(2, 'Full Name is too short!')
      .max(500, 'Full Name is too long!')
      .required('Full Name is required!'),
  });

  const passwordSchema = yup.object().shape({
    password: yup.string().required('Current Password is required!'),
    newPassword: yup
      .string()
      .min(6, 'Password must contain 6-8 characters!')
      .required('New Password is required!'),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords do not match!'),
  });
  return (
    <Flex p={10} w='100%' py={8} alignItems='center' justifyContent='center'>
      <Box
        w='full'
        mx='auto'
        shadow='xl'
        rounded='xl'
        overflow='hidden'
        p={3}
        bg={useColorModeValue('white', 'gray.700')}>
        <Tabs variant='soft-rounded' colorScheme='green' isFitted>
          <TabList>
            <Tab>Manage Information</Tab>
            <Tab>Manage Password</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {Object.keys(userProfile).length > 0 && (
                <Formik
                  initialValues={initialProfileValues}
                  validationSchema={profileSchema}
                  onSubmit={(values) => {
                    handleEditInfo(values);
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
                      <VStack spacing='5'>
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
                              value={values.fullName || ''}
                              onChange={handleChange}
                              focusBorderColor='green.400'
                              sx={{
                                borderRadius: '9px',
                              }}
                            />
                          </InputGroup>
                          <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                        </FormControl>

                        <FormControl
                          isRequired
                          isInvalid={errors.bio && touched.bio}>
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
                              value={values.bio || ''}
                              onChange={handleChange}
                              focusBorderColor='green.400'
                              sx={{
                                borderRadius: '9px',
                              }}
                            />
                          </InputGroup>
                          <FormErrorMessage>{errors.bio}</FormErrorMessage>
                        </FormControl>

                        <FormControl>
                          <FormLabel htmlFor='avatar' fontWeight='bold'>
                            Avatar
                          </FormLabel>
                          <InputGroup>
                            <Stack direction='row' spacing={10}>
                              <Avatar
                                size='lg'
                                sx={{
                                  objectFit: 'cover',
                                }}
                                src={
                                  !userProfile?.photoURL
                                    ? 'https://avatars.dicebear.com/api/big-smile/60.svg'
                                    : userProfile?.photoURL
                                }
                              />

                              <Flex
                                w={620}
                                h={100}
                                justify='center'
                                align='center'
                                p={20}
                                m={2}
                                borderRadius={10}
                                sx={{
                                  border: '1px dashed',
                                }}
                                textAlign='center'
                                {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Stack direction='column'>
                                  <Center>
                                    <Center
                                      sx={{
                                        borderRadius: '50',
                                        boxSize: '50',
                                        bg: '#92e6a7',
                                      }}>
                                      <FiUploadCloud
                                        size={30}
                                        color='#004b23'
                                      />
                                    </Center>
                                  </Center>

                                  {isLoading ? (
                                    <Center>
                                      <CircularProgress
                                        value={imgProgress}
                                        color='green.400'>
                                        <CircularProgressLabel>
                                          {imgProgress}%
                                        </CircularProgressLabel>
                                      </CircularProgress>
                                    </Center>
                                  ) : isDragActive ? (
                                    <Text>Drop the image here...</Text>
                                  ) : (
                                    <>
                                      <Text>
                                        Drag 'n' drop some image here, or click
                                        to select image
                                      </Text>
                                      <Text as='em'>
                                        (Only *.jpeg, *.jpg and *.png image will
                                        be accepted)
                                      </Text>
                                    </>
                                  )}
                                </Stack>
                              </Flex>
                            </Stack>
                          </InputGroup>
                        </FormControl>

                        <Button
                          w='full'
                          colorScheme='green'
                          sx={{
                            borderRadius: '9px',
                          }}
                          isLoading={isSubmitting}
                          loadingText={isSubmitting && 'Editing...'}
                          boxShadow='xl'
                          type='submit'
                          onClick={handleSubmit}>
                          Edit Your Profile
                        </Button>
                      </VStack>
                    </Form>
                  )}
                </Formik>
              )}
            </TabPanel>

            <TabPanel>
              <Formik
                initialValues={initialPasswordValues}
                validationSchema={passwordSchema}
                onSubmit={(values) => {
                  handleChangePassword(values);

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
                  resetForm,
                }) => (
                  <Form>
                    <VStack spacing='5'>
                      <FormControl
                        isRequired
                        isInvalid={errors.password && touched.password}>
                        <FormLabel htmlFor='password' fontWeight='bold'>
                          Current Password
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents='none'
                            children={<RiLockPasswordFill color='gray' />}
                          />
                          <Input
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Current Password'
                            value={values.password}
                            onChange={handleChange}
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
                                {showPassword ? (
                                  <FaRegEye />
                                ) : (
                                  <FaRegEyeSlash />
                                )}
                              </Text>
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        isInvalid={errors.newPassword && touched.newPassword}>
                        <FormLabel htmlFor='newPassword' fontWeight='bold'>
                          New Password
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents='none'
                            children={<RiLockPasswordFill color='gray' />}
                          />
                          <Input
                            id='newPassword'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='New Password'
                            value={values.newPassword}
                            onChange={handleChange}
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
                                {showPassword ? (
                                  <FaRegEye />
                                ) : (
                                  <FaRegEyeSlash />
                                )}
                              </Text>
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.newPassword}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        isInvalid={
                          errors.confirmNewPassword &&
                          touched.confirmNewPassword
                        }>
                        <FormLabel
                          htmlFor='confirmNewPassword'
                          fontWeight='bold'>
                          Confirm New Password
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents='none'
                            children={<RiLockPasswordFill color='gray' />}
                          />
                          <Input
                            id='confirmNewPassword'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Confirm New Password'
                            value={values.confirmNewPassword}
                            onChange={handleChange}
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
                                {showPassword ? (
                                  <FaRegEye />
                                ) : (
                                  <FaRegEyeSlash />
                                )}
                              </Text>
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.confirmNewPassword}
                        </FormErrorMessage>
                      </FormControl>

                      <Button
                        w='full'
                        colorScheme='green'
                        sx={{
                          borderRadius: '9px',
                        }}
                        isLoading={isSubmitting}
                        loadingText={isSubmitting && 'Changing...'}
                        boxShadow='xl'
                        type='submit'
                        onClick={() => handleSubmit()}>
                        Change Your Password
                      </Button>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
