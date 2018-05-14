const Controller = require('../core/base_controller');

class UserController extends Controller {
  /**
   * Sign up.
   */ 
  async signup() {
    const {ctx, service} = this
    const name = ctx.request.body.name
    const password = ctx.request.body.password
    const result = await service.user.createUser(name, password)
    
    ctx.body = result
    ctx.status = 200
  }

  async signin() {
    const {ctx, service} = this
    const name = ctx.request.body.name
    const password = ctx.request.body.password
    const firstName = ctx.request.body.first_name
    const lastName = ctx.request.body.last_name
    const result = await service.user.findUser(name, password, firstName, lastName)
    
    ctx.body = result
    ctx.status = 200;
    
  }
}

module.exports = UserController;