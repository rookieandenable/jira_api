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
  // 创建任务组
  router.post('/list/createTask', controller.home.createTask)
  // 查询任务组
  router.get('/list/getTask', controller.home.queryTask)
  // 删除 epic
  router.post('/list/deleteTask', controller.home.deleteTask)
  // kanbanGroup
  router.post('/list/createKanbanColumn', controller.home.createKanbanColumn)
  router.post('/list/deleteKanbanColumn', controller.home.deleteKanbanColumn)
  // kanbanItem
  router.post('/list/createKanbanItem', controller.home.createKanbanItem)
  router.post('/list/updateKanbanItem', controller.home.updateKanbanItem)
  router.post('/list/deleteKanbanItem', controller.home.deleteKanbanItem)
  // 获取 kanban 列表
  router.get('/list/getKanbanList', controller.home.getKanbanList)

  router.post('/list/moveColumn', controller.home.toMoveColumn)
  router.post('/list/moveRow', controller.home.toMoveRow)
};
