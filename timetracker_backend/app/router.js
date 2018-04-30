'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/task', controller.task.create);
  router.get('/task/:tid', controller.task.find)

};
