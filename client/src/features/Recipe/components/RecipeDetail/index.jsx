import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Stack, Text } from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdAccessTime, MdLocalDining, MdWatchLater } from 'react-icons/md';

export default function RecipeDetail(props) {
  const { recipeDetail } = props;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('account'));

  const onClickAuthorProfile = () => {
    navigate(`/profile/${recipeDetail.authorId}`);
  };

  const isOwner = recipeDetail.authorId === user?.uid;

  const recipeImg =
    'https://images.immediate.co.uk/production/volatile/sites/30/2012/09/Beef-wellington-d4f3320.jpg';
  return (
    <main className='page'>
      <div className='recipe-page'>
        <section className='recipe-hero'>
          <img src={recipeImg} className='img recipe-hero-img' alt='img' />
          <article className='recipe-info'>
            <Text as='h1' fontSize='50' fontWeight='bold' mb='58'>
              {recipeDetail.name}
            </Text>
            <p>{recipeDetail.description}</p>
            <Stack direction='row' spacing={1} sx={{ pl: 400 }}>
              <Text
                onClick={onClickAuthorProfile}
                sx={{ pt: 1, fontWeight: 'bold', cursor: 'pointer' }}>
                {recipeDetail.user?.fullName}
              </Text>

              <Avatar
                sx={{ cursor: 'pointer' }}
                onClick={onClickAuthorProfile}
                src={recipeDetail.user?.photoURL}
                alt='avatar'
              />
            </Stack>
            {isOwner && (
              <div>
                <IconButton aria-label='home'>
                  <FiMoreHorizontal />
                </IconButton>
              </div>
            )}

            <div className='recipe-icons'>
              <article>
                <i>
                  <MdWatchLater fontSize='large' />
                </i>
                <h5>preparing time</h5>
                {recipeDetail.recipes?.map((recipe) => {
                  return <p key={recipe.id}>{recipe.prepTime} mins</p>;
                })}
              </article>
              <article>
                <i>
                  <MdAccessTime fontSize='large' />
                </i>
                <h5>cooking time</h5>
                {recipeDetail.recipes?.map((recipe) => {
                  return <p key={recipe.id}>{recipe.cookTime} mins</p>;
                })}
              </article>
              <article>
                <i>
                  <MdLocalDining fontSize='large' />
                </i>
                <h5>Difficulty</h5>
                {recipeDetail.recipes?.map((recipe) => {
                  return <p key={recipe.id}>{recipe.difficulty}</p>;
                })}
              </article>
            </div>
            <p className='recipe-tags'>
              Categories: <a href='tag-template.html'>beef</a>
              <a href='tag-template.html'>breakfast</a>
              <a href='tag-template.html'>pancakes</a>
              <a href='tag-template.html'>food</a>
            </p>
          </article>
        </section>
        <section className='recipe-content'>
          <article>
            <Text as='h4' fontSize='29'>
              Instructions
            </Text>
            {recipeDetail.recipes?.map((recipe) => {
              return (
                <div className='single-instruction'>
                  <p>{recipe.instruction}</p>
                </div>
              );
            })}
          </article>
          <article className='second-column'>
            <div>
              <Text as='h4' fontSize='29'>
                Ingredients
              </Text>
              {recipeDetail.ingredients?.map((ingredient) => {
                return (
                  <p className='single-ingredient' key={ingredient.id}>
                    {ingredient.name}
                  </p>
                );
              })}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
