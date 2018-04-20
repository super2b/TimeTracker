'use strict';

const Controller = require('egg').Controller;

class TaskController extends Controller {
  async create() {
    const {ctx, service} = this;

    ctx.body = {
      status : 'success',
      msg: "get the result list."
    }
    ctx.status = 201;
  }
}

module.exports = TaskController;
