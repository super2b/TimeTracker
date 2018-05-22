'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  /**
   * success callback
   * @param {object} result the reuslt object.
   */
  success(result) {
    this.ctx.status = 200;
    this.ctx.body = result;
  }

  /**
   * not found msg
   * @param {string} msg the error msg.
   */
  notFoundMsg(msg) {
    const finalMsg = msg || 'not found';
    this.ctx.throw(404, finalMsg);
  }

  /**
   * UnAuth error.
   */
  unAuth() {
    const msg = 'unauthor';
    this.ctx.throw(403, msg);
  }
}

module.exports = BaseController;
