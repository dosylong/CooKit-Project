const prisma = require('../models/prisma');
const slugify = require('slugify');
const { customRandom, urlAlphabet, random } = require('nanoid');
const nanoid = customRandom(urlAlphabet, 10, random);

class RecipeController {
  createRecipe = async (req, res, next) => {
    try {
      const response = await prisma.recipe.create({
        data: {
          authorId: req.body.authorId,
          name: req.body.name,
          instruction: req.body.instruction,
          description: req.body.description,
          prepTime: parseInt(req.body.prepTime),
          cookTime: parseInt(req.body.cookTime),
          difficultId: req.body.difficultId,
          imageCover: req.body.imageCover,
          recipeSlug: `${slugify(req.body.name)}-${nanoid()}`,

          ingredients: {
            create: req.body.ingredients,
          },
        },
        include: {
          ingredients: true,
          difficult: true,
        },
      });
      return res.status(200).json({ ...response, message: 'Created!' });
    } catch (error) {
      return next(error);
    }
  };

  createRecipeImage = async (req, res, next) => {
    try {
      const response = await prisma.recipe.update({
        where: {
          authorId: req.body.authorId,
        },
        data: {
          imageCover: req.body.imageCover,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };

  getAllRecipe = async (req, res, next) => {
    try {
      const response = await prisma.recipe.findMany({
        include: {
          user: true,
          difficult: true,
          ingredients: true,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };

  getRecipeDetail = async (req, res, next) => {
    try {
      const response = await prisma.recipe.findUnique({
        where: {
          recipeSlug: String(req.query.recipeSlug),
        },
        include: {
          user: true,
          difficult: true,
          ingredients: true,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };

  getMyRecipe = async (req, res, next) => {
    try {
      const response = await prisma.recipe.findMany({
        where: {
          authorId: req.query.authorId,
        },
        include: {
          user: true,
          difficult: true,
          ingredients: true,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };

  deleteRecipe = async (req, res, next) => {
    try {
      const response = await prisma.recipe.delete({
        where: {
          id: req.body.recipeId,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new RecipeController();
