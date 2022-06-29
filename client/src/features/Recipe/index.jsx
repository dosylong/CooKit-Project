import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CreateRecipePage from './pages/CreateRecipePage';

export default function Recipe() {
  return (
    <>
      <Routes>
        <Route path=':recipeSlug' element={<RecipeDetailPage />} />
        <Route path='/create' element={<CreateRecipePage />} />
      </Routes>
    </>
  );
}
