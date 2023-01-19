'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller, router } = app;
  router.prefix('/api/v1')

  router.get('/', controller.home.index);

  // 用户登录/注册
  router.post('/user/login', controller.user.login);
  router.post('/user/registry', controller.user.registry);
};
