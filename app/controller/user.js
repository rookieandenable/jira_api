const { Controller } = require('egg');

class UserController extends Controller {
  async login() {
    const { ctx } = this

    ctx.validate({
      username: { type: 'string' },
      password: { type: 'number' }
    })
    const res = await ctx.service.user.loginValidate()
    if (res) {
      ctx.body = {
        code: 200,
        msg: '登录成功',
        token: res
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '用户名或密码错误'
      }
    }
  }

  async registry() {
    const { ctx } = this

    const res = await ctx.service.user.registryValidate()
    if (res) {
      ctx.body = {
        code: 200,
        msg: '创建成功',
        token: res
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '该用户已经注册，请登录'
      }
    }
  }
}

module.exports = UserController;
