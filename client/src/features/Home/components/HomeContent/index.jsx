import React from 'react';
import Banner from '../../../../components/Banner';
import {
  Heading,
  Container,
  SimpleGrid,
  Box,
  Stack,
  Text,
  Divider,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import RecipeCard from '../../../Recipe/components/RecipeCard';

export default function HomeContent(props) {
  const { allRecipes } = props;
  return (
    <>
      <Container maxW='container.xl'>
        <Banner />
        <Heading py='5' fontSize='50' fontWeight='600'>
          Categories
        </Heading>
        <SimpleGrid
          pt='1'
          pb='3'
          columns={{ base: 2, sm: 1, md: 2, lg: 3, xl: 4 }}
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
              mb={{ base: '2', sm: '6' }}>
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
                Breakfast
              </Text>
              <Box minheight='56px'>
                <Heading
                  display='block'
                  color={useColorModeValue('gray.700', 'white')}
                  fontSize={{ base: 'xs', sm: 'md', md: 'md' }}
                  fontFamily={'body'}>
                  asdssasihf
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

        <Heading py='5' fontSize='50' fontWeight='600'>
          Latest Recipe
        </Heading>
        <SimpleGrid
          pt='5'
          pb='5'
          columns={{ base: 2, sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={{ base: 2, sm: 7 }}>
          {allRecipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
