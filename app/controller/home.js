'use strict';

const { Controller } = require('egg');
const dayjs = require('dayjs')

class HomeController extends Controller {
  async getProjectList() {
    const { ctx } = this;
    const res = await ctx.service.home.projectsList()
    for (const item of res) {
      item.created = dayjs(item.created).format('YYYY-MM-DD')
    }
    ctx.body = {
      code: 200,
      data: res
    }
  }

  // 创建项目
  async createPro() {
    const { ctx } = this
    await ctx.service.home.createListItem()

    ctx.body = {
      code: 200,
      msg: '创建成功',
      data: {},
    }
  }

  // 修改项目
  async modifyPro() {
    const { ctx } = this
    const res = await ctx.service.home.modifyListItem()

    ctx.body = {
      code: 200,
      msg: `修改 ${res.name} 成功`,
      data: {},
    }
  }

  // 删除项目
  async deleteProject() {
    const { ctx } = this
    const res = await ctx.service.home.deleteListItem()

    ctx.body = {
      code: 200,
      msg: `删除 ${res.name} 成功`,
      data: {}
    }
  }

  async getMembersList() {
    const { ctx } = this

    const res = await ctx.service.home.membersList()
    
    ctx.body = {
      code: 200,
      data: res
    }
  }

  // 修改收藏
  async modifyCollection() {
    const { ctx } = this

    await ctx.service.home.changeShrine()
    ctx.body = {
      code: 200,
      msg: '修改成功',
      data: {}
    }
  }

  // 创建任务组
  async createTask() {
    const { ctx } = this

    await ctx.service.home.createEpic()
    ctx.body = {
      code: 200,
      msg: '新建成功',
      data: {}
    }
  }

  // 获取任务组
  async queryTask() {
    const { ctx } = this

    const list = await ctx.service.home.getEpicByProjectId()
    for (const item of list) {
      item.created = dayjs(item.created).format('YYYY-MM-DD')
      item.end = dayjs(item.end).format('YYYY-MM-DD')
    }

    ctx.body = {
      code: 200,
      msg: '',
      data: list
    }
  }

  // 删除一项 epic
  async deleteTask() {
    const { ctx } = this

    const res = await ctx.service.home.deleteEpicItem()
    ctx.body = {
      code: 200,
      msg: `删除 ${res?.name} 成功`,
      data: {}
    }
  }

  // 创建 看板column
  async createKanbanColumn() {
    const { ctx } = this

    await ctx.service.home.createKanbansGroup()

    ctx.body = {
      code: 200,
      msg: '创建成功',
      data: {}
    }
  }

  // 删除 看板column
  async deleteKanbanColumn() {
    const { ctx } = this

    await ctx.service.home.deleteKanbansGroup()

    ctx.body = {
      code: 200,
      msg: '删除成功',
      data: {}
    }
  }

  // 创建 看板
  async createKanbanItem() {
    const { ctx } = this

    await ctx.service.home.createKanban()

    ctx.body = {
      code: 200,
      msg: '创建看板成功',
      data: {}
    }
  }

  // 修改 看板
  async updateKanbanItem() {
    const { ctx } = this

    await ctx.service.home.updateKanban()

    ctx.body = {
      code: 200,
      msg: '修改看板成功',
      data: {}
    }
  }

  // 删除 看板
  async deleteKanbanItem() {
    const { ctx } = this

    await ctx.service.home.deleteKanban()

    ctx.body = {
      code: 200,
      msg: '删除看板成功',
      data: {}
    }
  }

  // 获取看板列表
  async getKanbanList() {
    const { ctx } = this

    const res = await ctx.service.home.getKanbansList()

    for (const item of res) {
      item.children.sort((a, b) => a.sort - b.sort)
    }
    res.sort((a, b) => a.sort - b.sort)

    ctx.body = {
      code: 200,
      msg: '',
      data: res || []
    }
  }

  // move COLUMN
  async toMoveColumn() {
    const { ctx } = this

    await ctx.service.home.moveColumn()

    ctx.body = {
      code: 200,
      msg: '',
      data: []
    }
  }

  // move ROW
  async toMoveRow() {
    const { ctx } = this

    await ctx.service.home.moveRow()

    ctx.body = {
      code: 200,
      msg: '',
      data: []
    }
  }
}

module.exports = HomeController;
