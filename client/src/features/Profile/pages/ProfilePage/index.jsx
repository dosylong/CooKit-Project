import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userApi from '../../../../api/userApi';
import ProfileInfoCard from '../../components/ProfileInfoCard';
import ProfileTabs from '../../components/ProfileTabs';
import {
  Stack,
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Divider,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { auth, storage } from '../../../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import firebase from 'firebase/app';

export default function ProfilePage() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imgProgress, setImgProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const user = JSON.parse(localStorage.getItem('account'));

  const updateAvatarToDb = async (url) => {
    const response = await userApi.editUserAvatar({
      photoURL: url,
      userFirebaseId: userId,
    });
    console.log(response);
  };

  const updateAvatarToFirebase = (url) => {
    const currentUser = auth.currentUser;
    currentUser
      .updateProfile({
        photoURL: url,
      })
      .then(() => {
        toast.success('Changed avatar successfully!', {
          autoClose: 1200,
        });
        console.log('Changed avatar successfully!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUploadAvatar = (file) => {
    if (!file[0]) return;
    const uploadTask = storage
      .ref(`avatars/${user?.email}/avatar/${file[0].name}`)
      .put(file[0]);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setIsLoading(true);
        setImgProgress(progress);
        console.log('Upload is ' + progress + '% done');
        if (progress === 100) {
          setIsLoading(false);
        }
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      },
      () => {
        storage
          .ref(`avatars/${user?.email}/avatar/`)
          .child(file[0].name)
          .getDownloadURL()
          .then((url) => {
            updateAvatarToDb(url);
            updateAvatarToFirebase(url);
          })
          .then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 1400);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg',
    maxFiles: 1,
    multiple: false,
    onDropAccepted: handleUploadAvatar,
    onDropRejected: () => {
      toast.error('File is not an image!', {
        autoClose: 1200,
      });
    },
  });

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await userApi.getUserProfile({
          userFirebaseId: userId,
        });
        setUserProfile(response);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, [userId]);

  const onClickEditInfo = async (values) => {
    try {
      await userApi
        .editUserProfile({
          userFirebaseId: userId,
          fullName: values.fullName,
          bio: values.bio,
        })
        .then(() => {
          toast.success('Changed profile successfully!', {
            autoClose: 1200,
          });
        });

      await auth.currentUser
        .updateProfile({
          displayName: values.fullName,
        })
        .then(() => {
          console.log('New displayName:', auth.currentUser.displayName);
          console.log('New bio:', values.bio);
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickChangePassword = async (values) => {
    try {
      const credentials = firebase.auth.EmailAuthProvider.credential(
        auth.currentUser.email,
        values.password
      );
      await auth.currentUser.reauthenticateWithCredential(credentials);

      await auth.currentUser.updatePassword(values.newPassword).then(() => {
        toast.success('Changed password successfully!', {
          autoClose: 1200,
        });
      });
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        toast.error('Current password is wrong!', {
          autoClose: 1200,
        });
      }
    }
  };

  return (
    <>
      <Container maxW='container.xl'>
        <Stack spacing='0' direction={['column', 'row']}>
          <Box flex='0'>
            <ProfileInfoCard userProfile={userProfile} />
          </Box>

          {userId === user?.uid && (
            <Box flex='1'>
              <ProfileTabs
                userProfile={userProfile}
                onClickEditInfo={onClickEditInfo}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
                isLoading={isLoading}
                onClickChangePassword={onClickChangePassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                imgProgress={imgProgress}
              />
            </Box>
          )}
        </Stack>
        <Heading py='5' fontSize='33'>
          Latest Recipe
        </Heading>
        <SimpleGrid
          pt='5'
          pb='5'
          columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={{ base: 2, sm: 7 }}>
          <Box
            maxW={{ base: '100%', sm: 'sm' }}
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            _hover={{
              boxShadow: '2xl',
            }}>
            <Box
              h={{ base: '150px', sm: '300px' }}
              bg={'gray.100'}
              mt={-6}
              mx={-6}
              mb={{ base: '2', sm: '6' }}
              pos={'relative'}>
              <Image
                height={{ base: '150px', sm: '300px' }}
                loading='eager'
                w={'full'}
                src='https://images.immediate.co.uk/production/volatile/sites/30/2012/09/Beef-wellington-d4f3320.jpg'
                objectFit={'cover'}
                cursor='pointer'
              />
            </Box>
            <Box px='4'>
              <Text
                color={'green.400'}
                textTransform={'uppercase'}
                fontWeight={{ base: 600, sm: 800 }}
                fontSize={{ base: 'xs', sm: 'sm' }}
                letterSpacing={1}
                mb={{ base: 'xs', sm: '1.5' }}
                cursor='pointer'>
                asd
              </Text>
              <Box minH='56px'>
                <Heading
                  display='block'
                  color={useColorModeValue('gray.700', 'white')}
                  fontSize={{ base: 'xs', sm: 'md', md: 'md' }}
                  fontFamily={'body'}>
                  ad
                </Heading>
              </Box>
              <Divider orientation='horizontal' mt='2' mb='3' />
              <Stack direction={'row'} justify={'center'} mb='2'>
                <Stack flex={1} spacing={1} align={'center'}>
                  <Text fontSize={{ base: 'xs', sm: 'sm' }} fontWeight={600}>
                    asd
                  </Text>
                  <Text fontSize={{ base: 'xs', sm: 'sm' }} color={'red.300'}>
                    Calories
                  </Text>
                </Stack>
                <Stack flex={1} spacing={1} align={'center'}>
                  <Text fontSize={{ base: 'xs', sm: 'sm' }} fontWeight={600}>
                    asd
                  </Text>
                  <Text fontSize={{ base: 'xs', sm: 'sm' }} color={'red.300'}>
                    Ingredients
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
      <ToastContainer />
    </>
  );
}
