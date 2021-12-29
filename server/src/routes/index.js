const userRouter = require('./user');

const route = (app) => {
  //route /user
  app.use('/user', userRouter);
};

module.exports = route;
