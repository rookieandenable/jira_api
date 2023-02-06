const Server = require('egg').Service

class HomeServer extends Server {
  // 项目列表
  async projectsList() {
    const { ctx, app } = this

    const list = await ctx.model.Projects.find(
      {}, 
      '-_id name id organization personId created enshrine',
      { lean: true }
    )
    if (!list) {
      return false
    }
    for (const item of list) {
      item.key = item.id
    }
    return list
  }

  // 创建列表成员
  async createListItem() {
    const { ctx } = this
    const { name, personId, organization } = ctx.request.body

    const res = await ctx.model.Counter.findOneAndUpdate({}, { $inc: { projectsId: 1 } }, { new: true })

    const new_project = new ctx.model.Projects({
      name,
      personId,
      organization,
      id: res.projectsId,
    })
    await new_project.save()
  }

  // 修改列表成员
  async modifyListItem() {
    const { ctx } = this
    const { name, personId, organization, id } = ctx.request.body

    const res = await ctx.model.Projects.findOneAndUpdate({ id }, { name, organization, personId }, { new: true })

    return res
  }

  // 删除列表成员
  async deleteListItem() {
    const { ctx } = this
    const { id } = ctx.request.body

    const res = await ctx.model.Projects.findOneAndDelete({ id })
    return res
  }

  // 组员列表
  async membersList() {
    const { ctx } = this

    const members = await ctx.model.Members.find(
      {},
      '-_id organization name id',
      { lean: true }
    )
    return members || []
  }

  // 修改收藏
  async changeShrine() {
    const { ctx } = this

    const body = ctx.request.body
    await ctx.model.Projects.updateOne({ id: body.id }, { enshrine: body.shrine })
  }
}

module.exports = HomeServer