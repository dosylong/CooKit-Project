import React from 'react';
import {
  chakra,
  Box,
  Image,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';

import { MdEmail } from 'react-icons/md';

export default function ProfileInfoCard(props) {
  const { userProfile } = props;
  const user = JSON.parse(localStorage.getItem('account'));
  return (
    <Flex
      p={30}
      w='full'
      mx='auto'
      px='auto'
      alignItems='center'
      justifyContent='center'>
      <Box
        w='sm'
        mx='auto'
        bg={useColorModeValue('white', 'gray.700')}
        shadow='xl'
        rounded='xl'
        overflow='hidden'>
        <Image
          w='full'
          h='full'
          fit='cover'
          objectPosition='center'
          src={
            !user?.photoURL
              ? 'https://avatars.dicebear.com/api/micah/69.svg'
              : user?.photoURL
          }
          alt='avatar'
        />

        <Box py={4} px={6}>
          <chakra.h1
            fontSize='xl'
            fontWeight='bold'
            color={useColorModeValue('gray.800', 'white')}>
            {user?.displayName}
          </chakra.h1>

          <chakra.p py={2} color={useColorModeValue('gray.700', 'gray.400')}>
            {userProfile?.bio}
          </chakra.p>

          <Flex
            alignItems='center'
            mt={4}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Icon as={MdEmail} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize='sm'>
              {user?.email}
            </chakra.h1>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
