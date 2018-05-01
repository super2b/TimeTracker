'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const auth = app.middlewares.auth()

  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/user', controller.user.create)

  router.post('/task', controller.task.create);
  router.get('/task/:tid', auth, controller.task.find)

};
