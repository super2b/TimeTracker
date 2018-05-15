'use strict';

const Controller = require('../core/base_controller');

class TaskController extends Controller {
  async create() {
    const {ctx, service} = this
    const name = ctx.request.body.name
    const desc = ctx.request.body.desc
    console.log('u_id:' + ctx.current_user.u_id)
    var insertResult = await service.task.insert(ctx.current_user.u_id, name, desc)
    ctx.body = insertResult
    ctx.status = 200
  }

  async find() {
    const {ctx, service} = this
    const tid = ctx.params.tid
    var task = await service.task.find(tid)
    console.log('task:' + task)
    ctx.body = task
    ctx.status =200
  }

  /**
   * 分页获取task列表
   */
  async list() {
    const {ctx, service} = this
    // page no
    const pageNo = ctx.query.pageno | 1
    // page size
    const pageSize =  ctx.query.pagesize | 2

    var result = await service.task.list(ctx.current_user.u_id, pageNo, pageSize)
    ctx.body = result
    ctx.status = 200
  }
}

module.exports = TaskController;
