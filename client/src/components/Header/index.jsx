import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Container,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  //useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  Divider,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { FiLogOut } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { GiForkKnifeSpoon } from 'react-icons/gi';
//import userApi from '../../api/userApi';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  //const [userProfile, setUserProfile] = useState({});
  const user = JSON.parse(localStorage.getItem('account'));

  const isAdmin = process.env.REACT_APP_ADMIN_UID === user?.uid;

  const onPressLogOut = async () => {
    await auth.signOut().then(() => {
      localStorage.clear();
      window.location.href = '/';
    });
  };

  const onPressProfile = () => {
    return navigate(`/profile/${user?.uid}`);
  };

  const onPressAdminDashboard = () => {
    return navigate(`/admin/dashboard`);
  };

  const onPressCreateRecipe = () => {
    return navigate('/recipe/create');
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsLoggedIn(localStorage.getItem('account'));
    }
  }, [isLoggedIn]);

  // useEffect(() => {
  //   const getUserProfile = async () => {
  //     if (!user) return;
  //     try {
  //       const response = await userApi.getUserProfile({
  //         userFirebaseId: user?.uid,
  //       });
  //       setUserProfile(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUserProfile();
  // }, [user]);

  return (
    <>
      <Box
        px={4}
        w='full'
        backgroundColor={useColorModeValue(
          'rgba(255,255, 255, 0.8)',
          'rgba(255,255, 255, 0.1)'
        )}
        backdropFilter='saturate(180%) blur(5px)'
        sx={{
          position: 'fixed',
        }}>
        <Container maxW='container.xl'>
          <Flex h='16' alignItems='center' justifyContent='space-between'>
            <Link to='/'>
              <Box
                fontSize='xl'
                fontWeight='bold'
                _hover={{
                  color: 'green.800',
                  cursor: 'pointer',
                }}>
                Cookit 👩‍🍳
              </Box>
            </Link>

            {isLoggedIn ? (
              <Flex alignItems='center'>
                <Stack direction='row' spacing={7}>
                  <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  </Button>
                  {isAdmin ? (
                    <Button onClick={onPressAdminDashboard}>
                      Admin dashboard
                    </Button>
                  ) : null}

                  <Menu autoSelect={false}>
                    <MenuButton
                      rounded='full'
                      variant='link'
                      cursor='pointer'
                      minW={0}>
                      <Stack direction='row' spacing={1}>
                        <Avatar
                          size='sm'
                          src={
                            !user?.photoURL
                              ? 'https://avatars.dicebear.com/api/big-smile/60.svg'
                              : user?.photoURL
                          }
                        />

                        <Box py='3' fontSize={12} px='2'>
                          <IoIosArrowDown />
                        </Box>
                      </Stack>
                    </MenuButton>

                    <MenuList alignItems='center' spacing={7}>
                      <Center>
                        <Avatar
                          size='2xl'
                          src={
                            !user?.photoURL
                              ? 'https://avatars.dicebear.com/api/big-smile/60.svg'
                              : user?.photoURL
                          }
                        />
                      </Center>

                      <Center h='50px'>
                        {user ? (
                          <Stack direction='row' spacing={1}>
                            <Text fontWeight='bold'>{user?.displayName}</Text>
                          </Stack>
                        ) : null}
                      </Center>

                      <MenuDivider />

                      {!isAdmin && (
                        <>
                          <MenuItem onClick={onPressProfile}>
                            <Stack direction='row' spacing={1}>
                              <Box py='1'>
                                <FiUser />
                              </Box>
                              <Box>Profile</Box>
                            </Stack>
                          </MenuItem>

                          <MenuItem onClick={onPressCreateRecipe}>
                            <Stack direction='row' spacing={1}>
                              <Box py='1'>
                                <GiForkKnifeSpoon />
                              </Box>
                              <Box>Create new Recipe</Box>
                            </Stack>
                          </MenuItem>

                          <Divider />
                        </>
                      )}

                      <MenuItem onClick={onPressLogOut}>
                        <Stack direction='row' spacing={1}>
                          <Box py='1'>
                            <FiLogOut />
                          </Box>
                          <Box>Log Out</Box>
                        </Stack>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Stack>
              </Flex>
            ) : (
              <Flex alignItems='center'>
                <Stack direction='row' spacing={7}>
                  <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  </Button>

                  <Box
                    as='button'
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'green.500',
                        textDecoration: 'underline',
                      },
                    }}>
                    <Link to='/account/login'>Log in</Link>
                  </Box>

                  <Button colorScheme='green'>
                    <Link to='/account/register'>Register</Link>
                  </Button>
                </Stack>
              </Flex>
            )}
          </Flex>
        </Container>
      </Box>
    </>
  );
}
