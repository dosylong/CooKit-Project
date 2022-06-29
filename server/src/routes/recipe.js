const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/RecipeController');

//route recipe/get/my
router.get('/get/my', RecipeController.getMyRecipe);

//route recipe/get/detail
router.get('/get/detail', RecipeController.getRecipeDetail);

//route recipe/get/all
router.get('/get/all', RecipeController.getAllRecipe);

//route recipe/delete
router.delete('/delete', RecipeController.deleteRecipe);

//route recipe/create/image
router.post('/create/image', RecipeController.createRecipeImage);

//Router POST recipe/create
router.post('/create', RecipeController.createRecipe);

module.exports = router;
