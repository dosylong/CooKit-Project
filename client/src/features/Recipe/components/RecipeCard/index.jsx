import {
  Box,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function RecipeCard(props) {
  const { recipe } = props;

  return (
    <Link to={`/recipe/${recipe.recipeSlug}`}>
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
            {recipe.name}
          </Text>
          <Box minH='56px'>
            <Heading
              display='block'
              color={useColorModeValue('gray.700', 'white')}
              fontSize={{ base: 'xs', sm: 'md', md: 'md' }}
              fontFamily={'body'}>
              {recipe.description}
            </Heading>
          </Box>
          <Divider orientation='horizontal' mt='2' mb='3' />
          <Stack direction={'row'} justify={'center'} mb='2'>
            <Stack flex={1} spacing={1} align={'center'}>
              <Text fontSize={{ base: 'xs', sm: 'sm' }} fontWeight={600}>
                {recipe.user.fullName}
              </Text>
            </Stack>
            <Stack flex={1} spacing={1} align={'center'}>
              <Text fontSize={{ base: 'xs', sm: 'sm' }} fontWeight={600}>
                {moment(recipe.createdAt).calendar()}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
}
