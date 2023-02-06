const Server = require('egg').Service

class UserServer extends Server {
  async loginValidate() {
    const { ctx, app } = this

    const crypto = require('crypto')
    const { username, password } = ctx.request.body
    const pwd = crypto.createHash('md5').update(String(password)).digest('hex')
    const user = await ctx.model.User.findOne({ username, password: pwd })
    if (!user) {
      return false
    }
    const token = app.jwt.sign({ username }, app.config.jwt.secret)
    return {
      token,
      username
    }
  }
  async registryValidate() {
    const { ctx, app } = this
    const { username, password, cpassword } = ctx.request.body
    const token = app.jwt.sign({ username }, app.config.jwt.secret)
    const crypto = require('crypto')
    // 验证是否已经存在该用户
    const UserModel = ctx.model.User
    const existUser = await UserModel.findOne({ username })
    if (existUser) {
      return false
    }

    if (password !== cpassword) {
      return false
    }

    const pwd = crypto.createHash('md5').update(password).digest('hex')
    const newUser = new UserModel({
      username,
      password: pwd,
      userId: 10000
    })
    await newUser.save()
    return {
      token,
      username
    }
  }
}

module.exports = UserServer