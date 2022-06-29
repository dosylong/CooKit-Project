import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import recipeApi from '../../../../api/recipeApi';
import RecipeDetail from '../../components/RecipeDetail';

export default function RecipeDetailPage() {
  const { recipeSlug } = useParams();
  const [recipeDetail, setRecipeDetail] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await recipeApi.getRecipeDetail({
          recipeSlug: recipeSlug,
        });
        setRecipeDetail(response);
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();
  }, [recipeSlug]);

  return (
    <div>
      <RecipeDetail recipeDetail={recipeDetail} />
    </div>
  );
}
