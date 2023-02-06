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
}

module.exports = HomeController;
