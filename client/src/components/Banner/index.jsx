import React, { useEffect, useRef, useState } from 'react';
import {
  Stack,
  Flex,
  VStack,
  useBreakpointValue,
  Heading,
  Avatar,
  Text,
  useColorModeValue,
  Box,
  HStack,
  Image,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteGroup,
} from '@choc-ui/chakra-autocomplete';
import { Link } from 'react-router-dom';
import userApi from '../../api/userApi';
import recipeApi from '../../api/recipeApi';

export default function Banner() {
  const [allUsers, setAllUsers] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const user = useRef(JSON.parse(localStorage.getItem('account')));

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const response = await userApi.getAllUser();
        setAllUsers(response);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUser();
  }, []);

  useEffect(() => {
    const getAllRecipe = async () => {
      try {
        const response = await recipeApi.getAllRecipe();
        setAllRecipes(response);
      } catch (error) {
        console.log(error);
      }
    };
    getAllRecipe();
  }, []);
  return (
    <Flex
      w={'full'}
      h={'50vh'}
      backgroundImage={
        'url(https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-western-food-minimalist-banner-image_172655.jpg)'
      }
      backgroundSize={'cover'}
      sx={{
        borderRadius: '15',
      }}
      backgroundPosition={'55% 50%'}>
      <VStack
        sx={{
          borderRadius: '15',
        }}
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.400, transparent)'}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Heading
            color={useColorModeValue('gray.800', 'gray.900')}
            fontWeight={600}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '60px', md: '65px' })}>
            Find a Recipe
          </Heading>
          <Box
            boxSize='full'
            bg={useColorModeValue('white', 'gray.700')}
            justifyContent='center'
            sx={{
              borderRadius: '15',
            }}>
            <AutoComplete
              rollNavigation
              sx={{
                borderRadius: '15',
              }}>
              <AutoCompleteInput
                variant='filled'
                placeholder='Search recipe or user...'
                autoFocus
                sx={{
                  borderRadius: '15',
                }}
              />
              <AutoCompleteList px='2'>
                <Link to={`profile/${allUsers?.username}`}>
                  <AutoCompleteGroup title='Users'>
                    {allUsers?.map((allUser) => (
                      <AutoCompleteItem
                        key={allUser.username}
                        value={allUser.fullName}
                        textTransform='capitalize'
                        my='2'
                        align='center'>
                        <HStack>
                          <Avatar
                            size='sm'
                            src={
                              allUser.photoURL ||
                              'https://avatars.dicebear.com/api/big-smile/60.svg'
                            }
                          />
                          <Text ml='4'>{allUser.fullName}</Text>
                        </HStack>
                      </AutoCompleteItem>
                    ))}
                  </AutoCompleteGroup>
                </Link>

                <Link to={`recipe/${allRecipes.recipeSlug}`}>
                  <AutoCompleteGroup title='Recipes' showDivider>
                    {allRecipes?.map((allRecipe) => (
                      <AutoCompleteItem
                        key={allRecipe.id}
                        value={allRecipe.name}
                        textTransform='capitalize'
                        my='2'
                        align='center'>
                        <HStack>
                          <Image size='sm' src={allRecipe.imageCover} />
                          <Text ml='4'>{allRecipe.name}</Text>
                        </HStack>
                      </AutoCompleteItem>
                    ))}
                  </AutoCompleteGroup>
                </Link>
              </AutoCompleteList>
            </AutoComplete>
          </Box>
        </Stack>
      </VStack>
    </Flex>
  );
}
