import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
  Box,
  Image,
  Textarea,
} from '@chakra-ui/react';
import { BsClipboardCheck } from 'react-icons/bs';
import { FiUploadCloud } from 'react-icons/fi';

export default function CreateRecipeForm(props) {
  const { onCreateRecipe, getRootProps, getInputProps, file } = props;

  const initialValues = {
    name: '',
    instruction: '',
    description: '',

    ingredients: [
      {
        name: '',
      },
    ],
    prepTime: '',
    cookTime: '',
  };

  const recipeSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    instruction: yup.string().required('Instruction is required'),
    description: yup.string().required('Description is required'),
    ingredients: yup.array().required('Ingredients is required'),
    prepTime: yup.string().required('Prep time is required'),
    cookTime: yup.string().required('Cook time is required'),
  });

  const handleCreateRecipe = (values) => {
    onCreateRecipe(values);
  };
  return (
    <>
      <Heading>Create Recipe</Heading>

      <Formik
        initialValues={initialValues}
        validationSchema={recipeSchema}
        onSubmit={(values) => {
          handleCreateRecipe(values);
          return new Promise((resolve) => {
            setTimeout(resolve, 2000);
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
            <VStack spacing='10'>
              <FormControl
                isRequired
                isInvalid={errors.name && touched.name}
                pt='5'>
                <FormLabel htmlFor='name' fontWeight='bold'>
                  Recipe Name
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<BsClipboardCheck color='gray' />}
                  />
                  <Input
                    id='name'
                    w='40%'
                    type='text'
                    placeholder='Recipe Name'
                    onChange={handleChange}
                    value={values.name}
                    focusBorderColor='green.400'
                    sx={{
                      borderRadius: '9px',
                    }}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={errors.description && touched.description}>
                <FormLabel htmlFor='description' fontWeight='bold'>
                  Recipe Description
                </FormLabel>

                <Textarea
                  id='description'
                  w='40%'
                  type='text'
                  placeholder='Recipe Description'
                  onChange={handleChange}
                  value={values.description}
                  focusBorderColor='green.400'
                  sx={{
                    borderRadius: '9px',
                  }}
                />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={errors.ingredients && touched.ingredients}>
                <FieldArray
                  name='ingredients'
                  render={(arrayHelpers) => (
                    <div>
                      {values.ingredients &&
                        values.ingredients.length > 0 &&
                        values.ingredients.map((ingredient, index) => (
                          <Stack
                            key={index}
                            direction='column'
                            spacing={2}
                            sx={{ mt: 2 }}>
                            <FormLabel htmlFor='ingredient' fontWeight='bold'>
                              Ingredient
                            </FormLabel>
                            <HStack>
                              <Input
                                w='40%'
                                id='ingredients'
                                name={`ingredients[${index}].name`}
                                value={ingredient.name}
                                label='Ingredient Name'
                                placeholder='Ingredient'
                                focusBorderColor='green.400'
                                onChange={handleChange}
                                sx={{
                                  borderRadius: '9px',
                                }}
                              />
                              <Stack direction='row' spacing={2}>
                                {values.ingredients.length > 1 && (
                                  <Button
                                    onClick={() => arrayHelpers.remove(index)}>
                                    -
                                  </Button>
                                )}
                                <Button
                                  onClick={() =>
                                    arrayHelpers.push({
                                      name: '',
                                    })
                                  }>
                                  +
                                </Button>
                              </Stack>
                            </HStack>
                          </Stack>
                        ))}
                    </div>
                  )}
                />
                <FormErrorMessage>{errors.ingredients}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <Stack direction='row' spacing={-600}>
                  <FormControl
                    isRequired
                    isInvalid={errors.prepTime && touched.prepTime}>
                    <FormLabel htmlFor='prepTime' fontWeight='bold'>
                      Prep Time (mins)
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<BsClipboardCheck color='gray' />}
                      />
                      <Input
                        id='prepTime'
                        w='30%'
                        type='number'
                        min={1}
                        placeholder='Prep Time'
                        onChange={handleChange}
                        value={values.prepTime}
                        focusBorderColor='green.400'
                        sx={{
                          borderRadius: '9px',
                        }}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.prepTime}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={errors.cookTime && touched.cookTime}>
                    <FormLabel htmlFor='cookTime' fontWeight='bold'>
                      Cook Time (mins)
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<BsClipboardCheck color='gray' />}
                      />
                      <Input
                        id='cookTime'
                        w='30%'
                        type='number'
                        placeholder='Cook Time'
                        onChange={handleChange}
                        value={values.cookTime}
                        focusBorderColor='green.400'
                        sx={{
                          borderRadius: '9px',
                        }}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.cookTime}</FormErrorMessage>
                  </FormControl>
                </Stack>
              </FormControl>

              {/* <FormControl
                isRequired
                isInvalid={errors.difficulty && touched.difficulty}>
                <FormLabel htmlFor='difficulty' fontWeight='bold'>
                  Difficulty
                </FormLabel>
                <Select placeholder='Select difficulty' w='40%'>
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={values.difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </Select>
              </FormControl> */}

              <FormControl
                isRequired
                isInvalid={errors.instruction && touched.instruction}>
                <FormLabel htmlFor='instruction' fontWeight='bold'>
                  Recipe Instructions
                </FormLabel>

                <Textarea
                  id='instruction'
                  w='40%'
                  type='text'
                  placeholder='Recipe Instruction'
                  onChange={handleChange}
                  value={values.instruction}
                  focusBorderColor='green.400'
                  sx={{
                    borderRadius: '9px',
                  }}
                />

                <FormErrorMessage>{errors.instruction}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='avatar' fontWeight='bold'>
                  Image Cover
                </FormLabel>
                <InputGroup>
                  <Stack direction='row' spacing={10}>
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
                            <FiUploadCloud size={30} color='#004b23' />
                          </Center>
                        </Center>

                        <>
                          <Text>
                            Drag 'n' drop some image here, or click to select
                            image
                          </Text>
                          <Text as='em'>
                            (Only *.jpeg, *.jpg and *.png image will be
                            accepted)
                          </Text>
                        </>
                      </Stack>
                    </Flex>
                  </Stack>
                </InputGroup>
              </FormControl>

              <FormControl>
                <Box
                  maxW='md'
                  p='2'
                  borderWidth='1px'
                  borderRadius='lg'
                  overflow='hidden'>
                  {file.map((file, index) => (
                    <Image
                      key={index}
                      src={file.preview}
                      alt='recipe'
                      w={'full'}
                      objectFit={'cover'}
                      height={{ base: '150px', sm: '300px' }}
                    />
                  ))}
                </Box>
              </FormControl>

              <Button
                w='50%'
                colorScheme='green'
                sx={{
                  borderRadius: '9px',
                }}
                isLoading={isSubmitting}
                loadingText={isSubmitting && 'Creating...'}
                boxShadow='xl'
                type='submit'
                onClick={handleSubmit}>
                Create Recipe
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </>
  );
}
