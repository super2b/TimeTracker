'use strict';

const Controller = require('../core/base_controller');

class TaskController extends Controller {
  /**
   * 新建一个任务
   */
  async create() {
    const {ctx, service} = this
    const name = ctx.request.body.name
    const desc = ctx.request.body.desc
    console.log('u_id:' + ctx.current_user.u_id)
    var insertResult = await service.task.insert(ctx.current_user.u_id, name, desc)
    ctx.body = insertResult
    ctx.status = 200
  }

  /**
   * 查看指定任务详情
   */
  async find() {
    const {ctx, service} = this
    const tid = ctx.params.tid
    var task = await service.task.find(ctx.current_user.u_id, tid)
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

  /**
   * 开始一个任务
   */
  async startTask() {
    const {ctx, service} = this
    const tid = ctx.params.tid
    
    var result = await service.task.startTask(ctx.currrent_user.u_id, tid)
    ctx.body = result
    ctx.status = 200
  }

  /**
   * 停止一个任务执行
   */
  async stopTask() {
    const {ctx, service} = this
    const tid = ctx.params.tid
    // 更新task表里面task的状态 为 0

    // 从redis获取该task的time_record id 为rid

    // 将time_record里面rid={第二步取到的rid}更新end_time

    // 返回客户端
  }

  /**
   * 结束一个任务
   */
  async finishTask() {
    // 更新task表里面task的状态 为 2

    // 从redis获取该task的time_record id 为rid

    // 将time_record里面rid={第二步取到的rid}更新end_time

    // 返回客户端
  }
}

module.exports = TaskController;
