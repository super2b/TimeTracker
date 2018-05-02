const Controller = require('egg').Controller;

class UserController extends Controller {
  async signup() {
    const {ctx, service} = this;
    const name = ctx.request.body.name;
    const password = ctx.request.body.password;
    const result = await service.user.createUser(name, password)
    
    ctx.body = result
    ctx.status = 200
  }

  async singin() {
    const {ctx, service} = this;
    
  }
}

module.exports = UserController;