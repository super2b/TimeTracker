const { Controller } = require('egg');
const Result = require('../model/result')

class BaseController extends Controller {
  success(result) {
    this.ctx.status = 200
    this.ctx.body = result
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
