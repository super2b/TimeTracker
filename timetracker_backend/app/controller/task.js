'use strict';

const Controller = require('egg').Controller;

class TaskController extends Controller {
  async create() {
    const {ctx, service} = this;
    var insertResult = await service.task.insert('研究Heroku', "Task from api")
    ctx.body = insertResult;
    ctx.status = 201;
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
