'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller, router } = app;
  router.prefix('/api/v1');
  
  // 用户登录/注册
  router.post('/user/login', controller.user.login);
  router.post('/user/registry', controller.user.registry);

  // 首页-项目列表
  router.get('/list/projects', controller.home.getProjectList);
  // 组员列表
  router.get('/list/members', controller.home.getMembersList);
  // 创建项目
  router.post('/list/create', controller.home.createPro)
  // 修改项目
  router.post('/list/modify', controller.home.modifyPro)
  // 删除项目
  router.post('/list/delete', controller.home.deleteProject)
  // 修改收藏
  router.post('/list/collection', controller.home.modifyCollection)
};
