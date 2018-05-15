'use strict';

const Controller = require('../core/base_controller');

class TaskController extends Controller {
  async create() {
    const {ctx, service} = this;
    const name = ctx.request.body.name
    const desc = ctx.request.body.desc
    var insertResult = await service.task.insert(ctx.current_user.u_id, name, desc)
    ctx.body = insertResult
    ctx.status = 200
  }

  async find() {
    const {ctx, service} = this;
    const tid = ctx.params.tid;
    var task = await service.task.find(tid);
    console.log('task:' + task);
    ctx.body = task;
    ctx.status =201 
  }
}

module.exports = TaskController;
