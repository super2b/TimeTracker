'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const auth = app.middlewares.auth()

  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 注册
  router.post('/user', controller.user.signup) 
  // 登录
  router.post('/user', controller.user.signin)

  //获取任务列表
  // router.get('/task', auth, controller.task.list)
  //创建任务
  router.post('/task', auth, controller.task.create);
  //获取任务详情
  router.get('/task/:tid', auth, controller.task.find)

};
