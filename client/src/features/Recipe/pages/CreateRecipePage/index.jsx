import { Container } from '@chakra-ui/react';
import React, { useState } from 'react';
import CreateRecipeForm from '../../components/CreateRecipeForm';
import { useDropzone } from 'react-dropzone';
import recipeApi from '../../../../api/recipeApi';
import { storage } from '../../../../firebase';
import { useNavigate } from 'react-router-dom';

export default function CreateRecipePage() {
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imgProgress, setImgProgress] = useState(0);
  const user = JSON.parse(localStorage.getItem('account'));
  const navigate = useNavigate();

  const onCreateRecipeImage = async (url) => {
    const response = await recipeApi.createRecipeImage({
      authorId: user?.uid,
      imageCover: url,
    });
    console.log(response);
  };

  const onCreateRecipe = async (values) => {
    try {
      const response = await recipeApi.createRecipe({
        authorId: user?.uid,
        ...values,
      });

      console.log(response);
      const uploadTask = storage
        .ref(`recipes/${user?.email}/recipe/${file[0].name}`)
        .put(file[0]);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setImgProgress(progress);
          console.log(progress);
          setIsLoading(true);
        },
        (error) => {
          console.log(error);
          setIsLoading(false);
        },
        () => {
          storage
            .ref(`recipes/${user?.email}/recipe/`)
            .child(file[0].name)
            .getDownloadURL()
            .then((url) => {
              onCreateRecipeImage(url);
            })
            .then(() => {
              setTimeout(() => {
                navigate('/');
              }, 1400);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg',
    maxFiles: 1,
    multiple: false,
    onDrop: (files) => {
      setFile(
        files.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <>
      <Container maxW='container.xl'>
        <CreateRecipeForm
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          file={file}
          onCreateRecipe={onCreateRecipe}
          isLoading={isLoading}
          imgProgress={imgProgress}
        />
      </Container>
    </>
  );
}
