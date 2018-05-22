'use strict';

const Controller = require('../core/base_controller');
const moment = require('moment');
const Logger = require('egg-logger').Logger;
const logger = new Logger();
logger.reload();

class TaskController extends Controller {
  /**
   * 新建一个任务
   */
  async create() {
    const { ctx, logger, service } = this;
    const name = ctx.request.body.name;
    const desc = ctx.request.body.desc;
    logger.info('the task name: %s, desc: %s', name, desc);
    const insertResult = await service.task.insert(ctx.current_user.u_id, name, desc);
    ctx.body = insertResult;
    ctx.status = 200;
  }

  /**
   * 查看指定任务详情
   */
  async find() {
    const { ctx, logger, service } = this;
    const tid = ctx.params.tid;
    logger.info('find the task with id: %s and uid:', tid, ctx.current_user.u_id);
    const task = await service.task.find(ctx.current_user.u_id, tid);
    ctx.body = task;
    ctx.status = 200;
  }

  /**
   * 分页获取task列表
   */
  async list() {
    const { ctx, logger, service } = this;
    // page no
    const pageNo = ctx.query.pageno || 1;
    // page size
    const pageSize = ctx.query.pagesize || 2;
    logger.info('view tasks uid: %s, pageNo: %s, pageSize:', ctx.current_user.u_id, pageNo, pageSize);
    const result = await service.task.list(ctx.current_user.u_id, pageNo, pageSize);
    ctx.body = result;
    ctx.status = 200;
  }

  /**
   * 开始一个任务
   */
  async startTask() {
    const { ctx, service } = this;
    const tid = ctx.request.body.tid;
    const result = await service.task.startTask(ctx.current_user.u_id, tid);
    ctx.body = result;
    ctx.status = 200;
  }

  /**
   * 停止一个任务执行
   */
  async stopTask() {
    const { ctx, service } = this;
    const tid = ctx.request.body.tid;
    const result = await service.task.stopTask(ctx.current_user.u_id, tid);
    ctx.body = result;
    ctx.status = 200;
  }

  /**
   * 结束一个任务
   */
  async finishTask() {
    const { ctx, service } = this;
    const tid = ctx.request.body.tid;
    const result = await service.task.finishTask(ctx.current_user.u_id, tid);
    ctx.body = result;
    ctx.status = 200;
  }

  /**
   * 测试方法，用来求时间差
   */
  async elapse() {
    const { ctx } = this;
    const d3 = moment().format('YYYY-MM-DD HH:mm:ss');
    const timeFormat = 'YYYY-MM-DD HH:mm:ss';
    const d1 = moment('2018-05-15 00:25:00', timeFormat);
    const d2 = moment('2018-05-16 00:25:01', 'YYYY-MM-DD HH:mm:ss');
    const elapse = d1 - d2;
    const totalSeconds = elapse / 1000;
    const hour = totalSeconds / 3600;
    const min = totalSeconds % 3600 / 60;
    const second = totalSeconds % 3600 % 60;
    const elapseResult = {
      h: parseInt(hour),
      min: parseInt(min),
      s: parseInt(second),
    };
    ctx.body = {
      d1,
      d2,
      d3,
      elapse: elapseResult,
    };
    ctx.status = 200;
  }
}

module.exports = TaskController;
