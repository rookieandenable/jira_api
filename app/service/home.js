const Server = require('egg').Service

class HomeServer extends Server {
  // 项目列表
  async projectsList() {
    const { ctx } = this

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

  // 创建任务组
  async createEpic() {
    const { ctx } = this
    const { name, projectId } = ctx.request.body
    const res = await ctx.model.Counter.findOneAndUpdate({}, { $inc: { epicsId: 1 } }, { new: true })

    const new_epic = new ctx.model.Epics({
      name,
      projectId,
      id: res.epicsId
    })
    await new_epic.save()
  }

  // 根据projectId查询任务组
  async getEpicByProjectId() {
    const { ctx } = this

    const { projectId } = ctx.request.query
    const res = await ctx.model.Epics.find({ projectId }, '-_id created end name projectId id', { lean: true })

    return res
  }

  // 删除某一项 epic
  async deleteEpicItem() {
    const { ctx } = this

    const { id } = ctx.request.body
    const res = await ctx.model.Epics.findOneAndDelete({ id })
    return res
  }

  // 创建 kanbanGroup
  async createKanbansGroup() {
    const { ctx } = this
    const { name, projectId } = ctx.request.body

    const { kanbanGroupId: id } = await ctx.model.Counter.findOneAndUpdate({}, { $inc: { kanbanGroupId: 1 } }, { new: true })
    const new_kanbanGroup = new ctx.model.Kanbans({
      name,
      projectId,
      id
    })
    await new_kanbanGroup.save()
  }

  // 删除 kanbanGroup
  async deleteKanbansGroup() {
    const { ctx } = this
    const { id } = ctx.request.body

    await ctx.model.Kanbans.remove({ id })

  }

  // 创建 kanban
  async createKanban() {
    const { ctx } = this
    const { name, typeId, id } = ctx.request.body

    const { kanbanId } = await ctx.model.Counter.findOneAndUpdate({}, { $inc: { kanbanId: 1 } }, { new: true })
    await ctx.model.Kanbans.updateOne({ id }, {
      $push: {
        children: {
          name,
          typeId,
          id: kanbanId
        }
      }
    })
  }

  // 更新 kanban
  async updateKanban() {
    const { ctx } = this
    const { name, typeId, kanbanGroupId, kanbanId } = ctx.request.body

    await ctx.model.Kanbans.updateOne(
      { 
        id: kanbanGroupId,
        'children.id': kanbanId
      }, 
      {
        $set: {
          'children.$.name': name,
          'children.$.typeId': typeId,
        }
      }
    )
  }

  // 删除 kanban
  async deleteKanban() {
    const { ctx } = this
    const { kanbanGroupId, kanbanId } = ctx.request.body

    await ctx.model.Kanbans.updateOne({ id: kanbanGroupId }, {
      $pull: {
        children: {
          id: kanbanId
        }
      }
    })
  }

  // 获取看板列表
  async getKanbansList() {
    const { ctx } = this
    const { projectId } = ctx.request.query
    
    const list = await ctx.model.Kanbans.find({ projectId }, '-_id -__v -children._id -children.created')

    return list
  }
}

module.exports = HomeServer