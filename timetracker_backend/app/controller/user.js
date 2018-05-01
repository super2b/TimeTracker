const Controller = require('egg').Controller;

class UserController extends Controller {
  async create() {
    const {ctx, service} = this;
    const name = ctx.request.body.name;
    const password = ctx.request.body.password;
    const result = await service.user.createUser(name, password)
    const token  = await this.app.jwt.sign({_id: result.insertId}, this.config.jwt.secret, {
      expiresIn: this.config.jwttoken.expire_in_min
    })
    console.log("the token is:" + token);
    ctx.body = result
    ctx.status = 200
  }
}

module.exports = UserController;