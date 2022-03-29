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
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import userApi from '../../api/userApi';
import { auth } from '../../firebase';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  //const { isOpen, onOpen, onClose } = useDisclosure();

  const onPressSignOut = async () => {
    await auth.signOut().then(() => {
      localStorage.clear();
      window.location.href = '/';
    });
  };

  const [profile, setProfile] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userProfile = await userApi.getUserProfile({
          userFirebaseId: user.uid,
        });
        setProfile(userProfile);
      }
    });
    return () => userAuth();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsLoggedIn(localStorage.getItem('account'));
    }
  }, [isLoggedIn]);
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Container maxW='container.xl'>
          <Flex h='16' alignItems='center' justifyContent='space-between'>
            <Box>Logo</Box>

            {isLoggedIn ? (
              <Flex alignItems='center'>
                <Stack direction='row' spacing={7}>
                  <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  </Button>

                  <Menu autoSelect={false}>
                    <MenuButton
                      rounded='full'
                      variant='link'
                      cursor='pointer'
                      minW={0}>
                      <Avatar
                        size='sm'
                        src='https://avatars.dicebear.com/api/micah/45.svg'
                      />
                    </MenuButton>
                    <MenuList alignItems='center' spacing={7}>
                      <Center>
                        <Avatar
                          size='2xl'
                          src='https://avatars.dicebear.com/api/micah/45.svg'
                        />
                      </Center>

                      <Center h='50px'>
                        {profile ? (
                          <Stack direction='row' spacing={1}>
                            <Text>{profile?.firstName}</Text>
                            <Text>{profile?.lastName}</Text>
                          </Stack>
                        ) : (
                          <Stack direction='row' spacing={1}>
                            <Text>{profile?.fullName}</Text>
                          </Stack>
                        )}
                      </Center>

                      <MenuDivider />
                      <MenuItem>
                        <Link to='/account/login'>Login</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to='/account/register'>Register</Link>
                      </MenuItem>
                      <MenuItem onClick={onPressSignOut}>Logout</MenuItem>
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

                  <Button>
                    <Link to='/account/login'>Login</Link>
                  </Button>

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
