const userRouter = require('./user');
const recipeRouter = require('./recipe');

const route = (app) => {
  //route /user
  app.use('/user', userRouter);

  //route /recipe
  app.use('/recipe', recipeRouter);
};

module.exports = route;
