import React, { useEffect, useState } from 'react';
import HomeContent from '../../components/HomeContent';
import recipeApi from '../../../../api/recipeApi';

export default function HomePage() {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await recipeApi.getAllRecipe();
        setAllRecipes(response);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipe();
  }, []);
  return <HomeContent allRecipes={allRecipes} />;
}
