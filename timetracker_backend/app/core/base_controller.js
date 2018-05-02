const { Controller } = require('egg');

class BaseController extends Controller {
  success(data) {
    this.ctx.status = 200
    this.ctx.body = {
      success: true,
      msg: data.msg,
      data: data.value
    }
  }

  notFoundMsg(msg) {
    msg = msg || 'not found'
    this.ctx.throw(404, msg)
  }

  unAuth() {
    msg = 'unauthor',
    this.ctx.throw(403, msg)
  }
}

module.exports = BaseController